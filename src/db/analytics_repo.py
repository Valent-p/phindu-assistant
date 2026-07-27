import statistics
from collections import defaultdict
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.expense_record import ExpenseRecord
from ..models.product import Product
from ..models.sale_record import SaleRecord
from ..schemas.analytics import (
    BreakEvenAnalysis,
    ExpenseCategoryBreakdown,
    ForecastDataPoint,
    ForecastResponse,
    KPISummary,
    SalesOverTimeResponse,
    TimeSeriesDataPoint,
    TopProduct,
)
from .business_repo import get_business


async def get_kpi_summary(
    business_id: int, db: AsyncSession, start_date: date | None = None, end_date: date | None = None
) -> KPISummary:
    # Sales totals
    sales_stmt = select(
        func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount).label("revenue"),
        func.sum(SaleRecord.quantity * SaleRecord.unit_cost).label("cogs"),
    ).where(SaleRecord.business_id == business_id)
    
    if start_date:
        sales_stmt = sales_stmt.where(SaleRecord.sale_date >= start_date)
    if end_date:
        sales_stmt = sales_stmt.where(SaleRecord.sale_date <= end_date)
        
    sales_result = await db.execute(sales_stmt)
    sales_row = sales_result.one()
    
    total_revenue = sales_row.revenue or 0.0
    total_cogs = sales_row.cogs or 0.0
    gross_profit = total_revenue - total_cogs
    
    # Expenses total
    exp_stmt = select(func.sum(ExpenseRecord.amount)).where(ExpenseRecord.business_id == business_id)
    if start_date:
        exp_stmt = exp_stmt.where(ExpenseRecord.expense_date >= start_date)
    if end_date:
        exp_stmt = exp_stmt.where(ExpenseRecord.expense_date <= end_date)
        
    exp_result = await db.execute(exp_stmt)
    total_expenses = exp_result.scalar() or 0.0
    
    net_profit = gross_profit - total_expenses
    avg_margin = (gross_profit / total_revenue * 100) if total_revenue > 0 else 0.0
    
    return KPISummary(
        total_revenue=round(total_revenue, 2),
        total_cogs=round(total_cogs, 2),
        gross_profit=round(gross_profit, 2),
        total_expenses=round(total_expenses, 2),
        net_profit=round(net_profit, 2),
        average_margin_percent=round(avg_margin, 2),
    )


async def get_sales_over_time(
    business_id: int, db: AsyncSession, period: str = "monthly", start_date: date | None = None, end_date: date | None = None
) -> SalesOverTimeResponse:
    # Use strftime in SQLite to group by period
    if period == "weekly":
        date_format = "%Y-W%W"
    elif period == "yearly":
        date_format = "%Y"
    else:  # monthly
        date_format = "%Y-%m"

    stmt = select(
        func.strftime(date_format, SaleRecord.sale_date).label("period_label"),
        func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount).label("revenue"),
        func.sum(SaleRecord.quantity * SaleRecord.unit_cost).label("cogs"),
    ).where(SaleRecord.business_id == business_id)
    
    if start_date:
        stmt = stmt.where(SaleRecord.sale_date >= start_date)
    if end_date:
        stmt = stmt.where(SaleRecord.sale_date <= end_date)
        
    stmt = stmt.group_by("period_label").order_by("period_label")
    
    result = await db.execute(stmt)
    rows = result.all()
    
    labels = []
    revenues = []
    profits = []
    
    for row in rows:
        labels.append(row.period_label)
        rev = row.revenue or 0.0
        cogs = row.cogs or 0.0
        revenues.append(round(rev, 2))
        profits.append(round(rev - cogs, 2))
        
    datasets = [
        {"label": "Revenue", "data": revenues, "backgroundColor": "#4CAF50"},
        {"label": "Gross Profit", "data": profits, "backgroundColor": "#2196F3"},
    ]
    
    return SalesOverTimeResponse(labels=labels, datasets=datasets)


async def get_top_products(
    business_id: int, db: AsyncSession, start_date: date | None = None, end_date: date | None = None, limit: int = 5
) -> list[TopProduct]:
    stmt = select(
        Product.id,
        Product.name,
        func.sum(SaleRecord.quantity).label("total_quantity"),
        func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount).label("total_revenue"),
        func.sum((SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount) - (SaleRecord.quantity * SaleRecord.unit_cost)).label("total_profit"),
    ).join(SaleRecord, Product.id == SaleRecord.product_id).where(Product.business_id == business_id)
    
    if start_date:
        stmt = stmt.where(SaleRecord.sale_date >= start_date)
    if end_date:
        stmt = stmt.where(SaleRecord.sale_date <= end_date)
        
    stmt = stmt.group_by(Product.id).order_by(func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount).desc()).limit(limit)
    
    result = await db.execute(stmt)
    rows = result.all()
    
    return [
        TopProduct(
            product_id=row.id,
            name=row.name,
            total_quantity=row.total_quantity or 0,
            total_revenue=round(row.total_revenue or 0.0, 2),
            total_profit=round(row.total_profit or 0.0, 2),
        )
        for row in rows
    ]


async def get_expenses_breakdown(
    business_id: int, db: AsyncSession, start_date: date | None = None, end_date: date | None = None
) -> list[ExpenseCategoryBreakdown]:
    stmt = select(
        ExpenseRecord.category,
        func.sum(ExpenseRecord.amount).label("total_amount")
    ).where(ExpenseRecord.business_id == business_id)
    
    if start_date:
        stmt = stmt.where(ExpenseRecord.expense_date >= start_date)
    if end_date:
        stmt = stmt.where(ExpenseRecord.expense_date <= end_date)
        
    stmt = stmt.group_by(ExpenseRecord.category).order_by(func.sum(ExpenseRecord.amount).desc())
    
    result = await db.execute(stmt)
    rows = result.all()
    
    return [
        ExpenseCategoryBreakdown(category=row.category, amount=round(row.total_amount or 0.0, 2))
        for row in rows
    ]


async def get_break_even(business_id: int, db: AsyncSession) -> BreakEvenAnalysis:
    # 1. Total Fixed Costs (recurring expenses)
    fc_stmt = select(func.sum(ExpenseRecord.amount)).where(
        ExpenseRecord.business_id == business_id,
        ExpenseRecord.is_recurring == True
    )
    fc_result = await db.execute(fc_stmt)
    fixed_costs = fc_result.scalar() or 0.0

    # 2. Variable costs ratio = Total COGS / Total Revenue
    sales_stmt = select(
        func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount).label("revenue"),
        func.sum(SaleRecord.quantity * SaleRecord.unit_cost).label("cogs"),
    ).where(SaleRecord.business_id == business_id)
    
    sales_result = await db.execute(sales_stmt)
    sales_row = sales_result.one()
    
    total_revenue = sales_row.revenue or 0.0
    total_cogs = sales_row.cogs or 0.0
    
    if total_revenue > 0:
        variable_cost_ratio = total_cogs / total_revenue
    else:
        variable_cost_ratio = 1.0  # no margin if no sales
        
    margin_ratio = 1 - variable_cost_ratio
    
    break_even_revenue = (fixed_costs / margin_ratio) if margin_ratio > 0 else None
    
    if break_even_revenue is None or total_revenue == 0:
        status = "Unknown"
    elif total_revenue > break_even_revenue:
        status = "Profitable"
    elif total_revenue < break_even_revenue:
        status = "Loss"
    else:
        status = "Break-even"
        
    return BreakEvenAnalysis(
        fixed_costs=round(fixed_costs, 2),
        variable_cost_ratio=round(variable_cost_ratio, 4),
        break_even_revenue=round(break_even_revenue, 2) if break_even_revenue else None,
        current_revenue=round(total_revenue, 2),
        status=status
    )


async def get_forecast(business_id: int, db: AsyncSession, periods: int = 3) -> ForecastResponse:
    # Simple linear regression on monthly sales
    # Get last 12 months of sales
    stmt = select(
        func.strftime("%Y-%m", SaleRecord.sale_date).label("period_label"),
        func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount).label("revenue")
    ).where(SaleRecord.business_id == business_id).group_by("period_label").order_by("period_label")
    
    result = await db.execute(stmt)
    rows = result.all()
    
    historical = []
    x_data = []
    y_data = []
    
    for i, row in enumerate(rows):
        historical.append(TimeSeriesDataPoint(label=row.period_label, revenue=round(row.revenue or 0.0, 2), cogs=0, profit=0))
        x_data.append(i)
        y_data.append(row.revenue or 0.0)
        
    forecast = []
    if len(x_data) > 1:
        # Calculate slope (m) and intercept (c)
        try:
            slope, intercept = statistics.linear_regression(x_data, y_data)
        except AttributeError:
            # Fallback if statistics.linear_regression is not available (added in 3.10)
            x_mean = statistics.mean(x_data)
            y_mean = statistics.mean(y_data)
            numerator = sum((x - x_mean) * (y - y_mean) for x, y in zip(x_data, y_data))
            denominator = sum((x - x_mean) ** 2 for x in x_data)
            slope = numerator / denominator if denominator != 0 else 0
            intercept = y_mean - slope * x_mean

        last_date_str = historical[-1].label if historical else datetime.today().strftime("%Y-%m")
        last_date = datetime.strptime(last_date_str, "%Y-%m").date()
        
        for i in range(1, periods + 1):
            next_x = len(x_data) - 1 + i
            pred_y = max(0, slope * next_x + intercept) # Revenue can't be negative
            next_date = last_date + relativedelta(months=i)
            
            forecast.append(ForecastDataPoint(
                label=next_date.strftime("%Y-%m"),
                forecasted_revenue=round(pred_y, 2)
            ))
            
    return ForecastResponse(historical=historical, forecast=forecast)
