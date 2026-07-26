from pydantic import BaseModel


class DashboardSummary(BaseModel):
    net_balance: float
    total_revenue: float
    total_expenses: float
    profit_margin: float
    monthly_sales: float
    monthly_expenses: float
    revenue_trend_pct: float
    currency: str


class TopProduct(BaseModel):
    product_id: int
    name: str
    revenue: float
    quantity_sold: int
    category: str | None = None


class CategoryMargin(BaseModel):
    category: str
    margin_pct: float
    revenue: float


class ReportsSummary(BaseModel):
    avg_margin_pct: float
    break_even_target: float
    gross_revenue: float
    total_expenses: float
    top_products: list[TopProduct]
    monthly_revenue: list[float]
    currency: str


class InsightCard(BaseModel):
    title: str
    description: str
    action_label: str
    severity: str  # info | warning | success


class InsightsSummary(BaseModel):
    total_revenue: float
    revenue_trend_pct: float
    top_products: list[TopProduct]
    category_margins: list[CategoryMargin]
    ai_forecasts: list[InsightCard]
    currency: str


class TransactionItem(BaseModel):
    id: str
    type: str  # income | expense
    title: str
    subtitle: str
    amount: float
    date: str
    icon: str
    is_recurring: bool = False
