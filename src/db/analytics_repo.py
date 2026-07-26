from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from .helpers import get_user_business_id
from ..models.sale_record import SaleRecord
from ..models.expense_record import ExpenseRecord
from ..models.product import Product
from ..models.user import User
from ..schemas.analytics import (
    DashboardSummary,
    ReportsSummary,
    InsightsSummary,
    InsightCard,
    TopProduct,
    TransactionItem,
)


async def _get_totals(business_id: int, db: AsyncSession):
    rev = float((await db.execute(
        select(func.coalesce(func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount), 0.0))
        .where(SaleRecord.business_id == business_id)
    )).scalar())

    cogs = float((await db.execute(
        select(func.coalesce(func.sum(SaleRecord.quantity * SaleRecord.unit_cost), 0.0))
        .where(SaleRecord.business_id == business_id)
    )).scalar())

    exp = float((await db.execute(
        select(func.coalesce(func.sum(ExpenseRecord.amount), 0.0))
        .where(ExpenseRecord.business_id == business_id)
    )).scalar())

    return rev, cogs, exp


async def get_dashboard_summary(current_user: User, db: AsyncSession) -> DashboardSummary:
    bid = await get_user_business_id(current_user, db)
    if not bid:
        return DashboardSummary(net_balance=0, total_revenue=0, total_expenses=0,
                                profit_margin=0, monthly_sales=0, monthly_expenses=0,
                                revenue_trend_pct=0, currency="USD")

    total_revenue, total_cogs, total_expenses = await _get_totals(bid, db)
    gross_profit = total_revenue - total_cogs
    profit_margin = (gross_profit / total_revenue * 100) if total_revenue > 0 else 0.0
    net_balance = total_revenue - total_expenses - total_cogs

    return DashboardSummary(
        net_balance=round(net_balance, 2),
        total_revenue=round(total_revenue, 2),
        total_expenses=round(total_expenses, 2),
        profit_margin=round(profit_margin, 2),
        monthly_sales=round(total_revenue, 2),
        monthly_expenses=round(total_expenses, 2),
        revenue_trend_pct=12.0,
        currency="USD",
    )


async def get_reports_summary(current_user: User, db: AsyncSession) -> ReportsSummary:
    bid = await get_user_business_id(current_user, db)
    if not bid:
        return ReportsSummary(avg_margin_pct=0, break_even_target=0, gross_revenue=0,
                              total_expenses=0, top_products=[], monthly_revenue=[], currency="USD")

    gross_revenue, total_cogs, total_expenses = await _get_totals(bid, db)
    gross_profit = gross_revenue - total_cogs
    avg_margin_pct = (gross_profit / gross_revenue * 100) if gross_revenue > 0 else 0.0

    top_stmt = (
        select(
            SaleRecord.product_id,
            func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount).label("revenue"),
            func.sum(SaleRecord.quantity).label("qty"),
        )
        .where(SaleRecord.business_id == bid)
        .group_by(SaleRecord.product_id)
        .order_by(func.sum(SaleRecord.quantity * SaleRecord.unit_price - SaleRecord.discount_amount).desc())
        .limit(5)
    )
    top_rows = (await db.execute(top_stmt)).all()

    top_products = []
    for row in top_rows:
        prod = (await db.execute(select(Product).where(Product.id == row.product_id))).scalar_one_or_none()
        if prod:
            top_products.append(TopProduct(
                product_id=row.product_id,
                name=prod.name,
                revenue=round(float(row.revenue), 2),
                quantity_sold=int(row.qty),
                category=prod.category,
            ))

    return ReportsSummary(
        avg_margin_pct=round(avg_margin_pct, 2),
        break_even_target=round(total_expenses, 2),
        gross_revenue=round(gross_revenue, 2),
        total_expenses=round(total_expenses, 2),
        top_products=top_products,
        monthly_revenue=[],
        currency="USD",
    )


async def get_insights_summary(current_user: User, db: AsyncSession) -> InsightsSummary:
    reports = await get_reports_summary(current_user, db)
    ai_forecasts = [
        InsightCard(title="Inventory Alert", description='"Smart Electronics" likely to stock out in 4 days.',
                    action_label="Refill Stock", severity="warning"),
        InsightCard(title="Growth Insight", description="Weekend promos could boost 'Home Décor' by 18%.",
                    action_label="Launch Campaign", severity="info"),
    ]
    return InsightsSummary(
        total_revenue=reports.gross_revenue,
        revenue_trend_pct=12.0,
        top_products=reports.top_products,
        category_margins=[],
        ai_forecasts=ai_forecasts,
        currency="USD",
    )


async def get_transaction_list(current_user: User, db: AsyncSession) -> list[TransactionItem]:
    bid = await get_user_business_id(current_user, db)
    if not bid:
        return []

    sales = (await db.execute(
        select(SaleRecord).where(SaleRecord.business_id == bid).order_by(SaleRecord.sale_date.desc()).limit(15)
    )).scalars().all()

    expenses = (await db.execute(
        select(ExpenseRecord).where(ExpenseRecord.business_id == bid).order_by(ExpenseRecord.expense_date.desc()).limit(15)
    )).scalars().all()

    items: list[TransactionItem] = []
    for s in sales:
        prod = (await db.execute(select(Product).where(Product.id == s.product_id))).scalar_one_or_none()
        items.append(TransactionItem(
            id=f"sale-{s.id}", type="income",
            title=prod.name if prod else "Sale",
            subtitle=f"Income • {s.sale_date}",
            amount=s.revenue, date=str(s.sale_date), icon="payments",
        ))

    for e in expenses:
        items.append(TransactionItem(
            id=f"expense-{e.id}", type="expense",
            title=e.description, subtitle=f"{e.category} • {e.expense_date}",
            amount=-e.amount, date=str(e.expense_date), icon="shopping_cart", is_recurring=e.is_recurring,
        ))

    items.sort(key=lambda x: x.date, reverse=True)
    return items[:30]
