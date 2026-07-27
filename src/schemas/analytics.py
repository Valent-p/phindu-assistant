from datetime import date
from typing import Any

from pydantic import BaseModel


class KPISummary(BaseModel):
    total_revenue: float
    total_cogs: float
    gross_profit: float
    total_expenses: float
    net_profit: float
    average_margin_percent: float


class TimeSeriesDataPoint(BaseModel):
    label: str  # e.g., '2023-01', 'Week 42'
    revenue: float
    cogs: float
    profit: float


class SalesOverTimeResponse(BaseModel):
    labels: list[str]
    datasets: list[dict[str, Any]]


class TopProduct(BaseModel):
    product_id: int
    name: str
    total_quantity: int
    total_revenue: float
    total_profit: float


class ExpenseCategoryBreakdown(BaseModel):
    category: str
    amount: float


class BreakEvenAnalysis(BaseModel):
    fixed_costs: float
    variable_cost_ratio: float
    break_even_revenue: float | None
    current_revenue: float
    status: str  # 'Profitable', 'Loss', 'Break-even'


class ForecastDataPoint(BaseModel):
    label: str
    forecasted_revenue: float


class ForecastResponse(BaseModel):
    historical: list[TimeSeriesDataPoint]
    forecast: list[ForecastDataPoint]
