from fastapi import FastAPI, Query
from typing import Optional
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=XhPcphODYArbBpoPptiWR2a9vZtzPqFM"

financial_data = []

@app.get("/")
def root():
    return {"message": "Welcome to the Financial Data API. Use /filtered-data for financial data."}


@app.on_event("startup")
async def fetch_financial_data():
    global financial_data
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        financial_data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")


@app.get("/filtered-data")
def get_filtered_data(
    start_date: Optional[str] = Query(None, description="Start date in YYYY-MM-DD format"),
    end_date: Optional[str] = Query(None, description="End date in YYYY-MM-DD format"),
    min_revenue: Optional[float] = Query(None, description="Minimum revenue"),
    max_revenue: Optional[float] = Query(None, description="Maximum revenue"),
    min_net_income: Optional[float] = Query(None, description="Minimum net income"),
    max_net_income: Optional[float] = Query(None, description="Maximum net income"),
    sort_by: Optional[str] = Query(None, description="Sort by column (date, revenue, netIncome)"),
    sort_order: Optional[str] = Query("asc", description="Sort order (asc or desc)"),
):
    global financial_data
    filtered_data = financial_data

    if start_date:
        filtered_data = [item for item in filtered_data if item["date"] >= start_date]
    if end_date:
        filtered_data = [item for item in filtered_data if item["date"] <= end_date]
    if min_revenue:
        filtered_data = [item for item in filtered_data if item["revenue"] >= min_revenue]
    if max_revenue:
        filtered_data = [item for item in filtered_data if item["revenue"] <= max_revenue]
    if min_net_income:
        filtered_data = [item for item in filtered_data if item["netIncome"] >= min_net_income]
    if max_net_income:
        filtered_data = [item for item in filtered_data if item["netIncome"] <= max_net_income]

    if sort_by:
        reverse = sort_order == "desc"
        if sort_by == "date":
            filtered_data.sort(key=lambda x: x["date"], reverse=reverse)
        elif sort_by == "revenue":
            filtered_data.sort(key=lambda x: x["revenue"], reverse=reverse)
        elif sort_by == "netIncome":
            filtered_data.sort(key=lambda x: x["netIncome"], reverse=reverse)

    return {"data": filtered_data}
