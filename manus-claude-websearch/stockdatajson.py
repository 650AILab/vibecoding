import os
import requests
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
import numpy as np
import json

def generate_stock_data(ticker, output_dir=None):
    """
    Generate and save comprehensive stock analysis data for the given ticker symbol.
    
    Args:
        ticker (str): Stock ticker symbol (e.g., 'TSLA', 'AAPL', 'MSFT')
        output_dir (str, optional): Directory to save the data. If None, creates a directory with the ticker name.
    
    Returns:
        str: Path to the generated JSON file
    """
    # Create output directory if it doesn't exist
    if output_dir is None:
        output_dir = f"{ticker.upper()}_report"
    
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Generating data for {ticker}...")
    
    # Fetch stock data
    today = datetime.now()
    two_years_ago = today - timedelta(days=730)
    
    # Fetch historical data using yfinance
    stock_data = yf.download(ticker, start=two_years_ago, end=today)
    
    # Get current price and daily change
    current_price = stock_data['Close'].iloc[-1]
    previous_price = stock_data['Close'].iloc[-2]
    price_change = current_price - previous_price
    price_change_percent = (price_change / previous_price) * 100
    
    # Calculate key metrics
    ytd_start = datetime(today.year, 1, 1)
    ytd_data = stock_data.loc[ytd_start:today]
    ytd_change = ((current_price / ytd_data['Close'].iloc[0]) - 1) * 100
    
    # 52-week high and change
    year_data = stock_data.iloc[-252:]  # Approximately 1 trading year
    high_52_week = year_data['High'].max()
    high_52_week_date = stock_data[stock_data['High'] == high_52_week].index[0].strftime('%b %d, %Y')
    change_from_high = ((current_price / high_52_week) - 1) * 100
    
    # 52-week change
    week_52_change = ((current_price / year_data['Close'].iloc[0]) - 1) * 100
    
    # 5-year change (if available)
    five_years_ago = today - timedelta(days=1825)
    five_year_data = yf.download(ticker, start=five_years_ago, end=today)
    if len(five_year_data) > 1000:  # Check if we have enough data
        five_year_change = ((current_price / five_year_data['Close'].iloc[0]) - 1) * 100
    else:
        five_year_change = None
    
    # Prepare data for charts
    monthly_data = stock_data.resample('ME').last()
    chart_dates = [date.strftime('%b %y') for date in monthly_data.index]
    print(chart_dates)
    print(monthly_data)
    print(monthly_data['Close'])
    chart_prices = monthly_data['Close'].values.tolist()  # Fixed line
    print(chart_prices)
    # Sample market share data (this would typically come from an API or database)
    # In a real app, you'd fetch actual data for the company
    market_share_data = {
        'company': [15, 14, 13, 12, 11, 10, 9, 8],  # Example data
        'competitor1': [10, 11, 12, 13, 14, 15, 16, 17],
        'competitor2': [8, 8, 8, 7, 7, 7, 6, 6]
    }
    
    market_share_dates = ['Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24', 'Q3 24', 'Q1 25']
    
    # Sample regional market share data
    regional_share = [3.2, 2.5, 2.0, 1.3]
    regional_labels = ['North America', 'Europe', 'Asia', 'Rest of World']
    
    # Sample forecast scenarios
    forecast_dates = ['Apr 25', 'Jul 25', 'Oct 25', 'Jan 26', 'Apr 26', 'Jul 26', 'Oct 26', 'Dec 26']
    print("------- ---- bull_case data -----------")
    bull_case = [f"{current_price[ticker]*1.2:.2f}", 
                    f"{current_price[ticker]*1.4:.2f}", 
                    f"{current_price[ticker]*1.6:.2f}", 
                    f"{current_price[ticker]*1.7:.2f}", 
                    f"{current_price[ticker]*1.8:.2f}", 
                    f"{current_price[ticker]*1.9:.2f}", 
                    f"{current_price[ticker]*2.0:.2f}", 
                    f"{current_price[ticker]*2.1:.2f}"]
    print(bull_case)
    print("------- ---- bull_case data -----------")
    base_case = [f"{current_price[ticker]*1.1:.2f}", 
                    f"{current_price[ticker]*1.2:.2f}", 
                    f"{current_price[ticker]*1.3:.2f}", 
                    f"{current_price[ticker]*1.35:.2f}", 
                    f"{current_price[ticker]*1.4:.2f}", 
                    f"{current_price[ticker]*1.45:.2f}", 
                    f"{current_price[ticker]*1.5:.2f}", 
                    f"{current_price[ticker]*1.55:.2f}"]
    bear_case = [f"{current_price[ticker]*0.9:.2f}", 
                    f"{current_price[ticker]*0.85:.2f}", 
                    f"{current_price[ticker]*0.82:.2f}", 
                    f"{current_price[ticker]*0.8:.2f}", 
                    f"{current_price[ticker]*0.78:.2f}", 
                    f"{current_price[ticker]*0.76:.2f}", 
                    f"{current_price[ticker]*0.77:.2f}", 
                    f"{current_price[ticker]*0.8:.2f}"]
    
    # Sample analyst recommendations
    analyst_labels = ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell']
    analyst_counts = [10, 15, 18, 7, 3]
    
    print(analyst_labels)
    # Get company info
    try:
        company_info = yf.Ticker(ticker).info
        company_name = company_info.get('longName', ticker)
        company_sector = company_info.get('sector', 'N/A')
        company_industry = company_info.get('industry', 'N/A')
    except:
        company_name = ticker
        company_sector = "N/A"
        company_industry = "N/A"
    
    # Generate SWOT analysis (in a real app, this would be more sophisticated)
    swot = {
        'strengths': [
            f"Strong presence in {company_sector} sector",
            "Innovative product pipeline",
            "Brand recognition",
            "Experienced management team",
            "Strong financial position",
            "Competitive advantage in technology"
        ],
        'weaknesses': [
            "Dependency on key markets",
            "Supply chain complexities",
            "Production scalability challenges",
            "High R&D costs",
            "Potential quality control issues",
            "Regulatory compliance costs"
        ],
        'opportunities': [
            "New market expansion",
            "Strategic acquisitions",
            "Technology innovation",
            "Growing market demand",
            "Diversification opportunities",
            "Industry partnerships"
        ],
        'threats': [
            "Increasing competition",
            "Regulatory challenges",
            "Economic uncertainty",
            "Disruption in supply chain",
            "Rising costs of raw materials",
            "Rapid technology changes"
        ]
    }
    
    print(swot)
    # Key events (in a real app, these would be fetched from a news API)
    key_events = [
        {"date": "March 2025", "title": "Quarterly Earnings Report", "description": "Reported quarterly financial results"},
        {"date": "January 2025", "title": "Product Launch", "description": "Announced new product lineup"},
        {"date": "November 2024", "title": "Strategic Partnership", "description": "Formed partnership with major industry player"},
        {"date": "October 2024", "title": "Expansion Announcement", "description": "Announced plans to expand manufacturing capacity"}
    ]
    
    print(key_events)
    # Bull, base, and bear case scenarios
    scenarios = {
        'bull': {
            'price_target': f"${bull_case}",
            'assumptions': [
                "Strong market growth and demand",
                "Successful product innovations",
                "Expansion into new markets",
                "Operational efficiency improvements",
                "Favorable regulatory environment",
                "Successful strategic partnerships"
            ]
        },
        'base': {
            'price_target': f"${base_case}",
            'assumptions': [
                "Moderate market growth",
                "Steady product development",
                "Maintaining current market position",
                "Stable operational metrics",
                "Managing competitive pressures",
                "Continued investment in core business"
            ]
        },
        'bear': {
            'price_target': f"${bear_case}",
            'assumptions': [
                "Market slowdown or contraction",
                "Product delays or issues",
                "Increasing competitive pressure",
                "Margin compression",
                "Regulatory headwinds",
                "Supply chain disruptions"
            ]
        }
    }
    print(scenarios)
    print("------- ---- data 2 -----------")
    print(bull_case)
    print(base_case)
    print(bear_case)
    print("------- ---- data 3-----------")
    print(current_price)
    # Format data for saving to JSON
    data = {
        'ticker': ticker,
        'company_name': company_name,
        'current_date': today.strftime('%B %d, %Y'),
        'current_price': f"{current_price[ticker]:.2f}",
        'price_change': f"{price_change[ticker]:.2f}",
        'price_change_percent': f"{price_change_percent[ticker]:.2f}",
        'ytd_change': f"{ytd_change[ticker]:.1f}",
        'high_52_week': f"{high_52_week[ticker]:.2f}",
        'high_52_week_date': high_52_week_date,
        'change_from_high': f"{change_from_high[ticker]:.1f}",
        'week_52_change': f"{week_52_change[ticker]:.1f}",
        'five_year_change': f"{five_year_change[ticker]:.1f}" if five_year_change is not None else "N/A",
        'sector': company_sector,
        'industry': company_industry,
        
        # Chart data
        'chart_dates': chart_dates,
        'chart_prices': chart_prices,
        'market_share_dates': market_share_dates,
        'market_share_company': market_share_data['company'],
        'market_share_competitor1': market_share_data['competitor1'],
        'market_share_competitor2': market_share_data['competitor2'],
        'regional_share': regional_share,
        'regional_labels': regional_labels,
        'forecast_dates': forecast_dates,
        'bull_case': bull_case,
        'base_case': base_case,
        'bear_case': bear_case,
        'analyst_labels': analyst_labels,
        'analyst_counts': analyst_counts,
        
        # SWOT and scenarios
        'swot': swot,
        'key_events': key_events,
        'scenarios': scenarios
    }
    print(data)
    # Save data to JSON file
    output_file = os.path.join(output_dir, f"{ticker}_data.json")
    print(output_file)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
    
    print(f"Data generated successfully: {output_file}")
    return output_file

def main():
    """
    Main function to run the stock data generator.
    """
    import argparse
    
    parser = argparse.ArgumentParser(description='Generate stock analysis data')
    parser.add_argument('ticker', type=str, help='Stock ticker symbol (e.g., TSLA, AAPL)')
    parser.add_argument('--output', '-o', type=str, help='Output directory', default=None)
    
    args = parser.parse_args()
    
    try:
        data_path = generate_stock_data(args.ticker, args.output)
        print(f"Data available at: {data_path}")
    except Exception as e:
        print(f"Error generating data: {e}")

if __name__ == "__main__":
    main()