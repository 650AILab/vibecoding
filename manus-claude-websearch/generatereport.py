import os
import json
from jinja2 import Template

def generate_stock_report(json_file, output_dir=None):
    """
    Generate an HTML report from a JSON data file.
    
    Args:
        json_file (str): Path to the JSON data file
        output_dir (str, optional): Directory to save the report. If None, saves to the same directory as the JSON file.
    
    Returns:
        str: Path to the generated HTML report
    """
    # Load data from JSON file
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    ticker = data['ticker']
    
    # Determine output directory
    if output_dir is None:
        output_dir = os.path.dirname(json_file)
    
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Generating report for {ticker} from {json_file}...")
    
    # Convert JSON data to proper format for Jinja template
    # JSON doesn't preserve JavaScript-compatible representations
    template_data = data.copy()
    template_data.update({
        'chart_dates': json.dumps(data['chart_dates']),
        'chart_prices': json.dumps(data['chart_prices']),
        'market_share_dates': json.dumps(data['market_share_dates']),
        'market_share_company': json.dumps(data['market_share_company']),
        'market_share_competitor1': json.dumps(data['market_share_competitor1']),
        'market_share_competitor2': json.dumps(data['market_share_competitor2']),
        'regional_share': json.dumps(data['regional_share']),
        'regional_labels': json.dumps(data['regional_labels']),
        'forecast_dates': json.dumps(data['forecast_dates']),
        'bull_case': json.dumps(data['bull_case']),
        'base_case': json.dumps(data['base_case']),
        'bear_case': json.dumps(data['bear_case']),
        'analyst_labels': json.dumps(data['analyst_labels']),
        'analyst_counts': json.dumps(data['analyst_counts'])
    })
    
    # HTML template
    html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ company_name }} ({{ ticker }}) Analysis Dashboard</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        
        .header p {
            margin: 5px 0 0;
        }
        
        .stock-info {
            display: flex;
            align-items: center;
            margin-top: 15px;
        }
        
        .stock-price {
            font-size: 32px;
            font-weight: bold;
            margin-right: 15px;
        }
        
        .stock-change {
            font-size: 18px;
            padding: 5px 10px;
            border-radius: 4px;
            background-color: {% if price_change_percent|float < 0 %}#e74c3c{% else %}#27ae60{% endif %};
            color: white;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            background-color: #34495e;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        
        .card {
            background-color: white;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .chart-container {
            width: 100%;
            height: 300px;
            position: relative;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .full-width {
            grid-column: 1 / -1;
        }
        
        .swot-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .swot-card {
            background-color: white;
            border-radius: 5px;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .swot-header {
            font-weight: bold;
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 3px;
            color: white;
        }
        
        .strengths .swot-header {
            background-color: #27ae60;
        }
        
        .weaknesses .swot-header {
            background-color: #e74c3c;
        }
        
        .opportunities .swot-header {
            background-color: #3498db;
        }
        
        .threats .swot-header {
            background-color: #f39c12;
        }
        
        .swot-list {
            list-style-type: disc;
            margin-left: 20px;
            padding-left: 0;
        }
        
        .swot-list li {
            margin-bottom: 5px;
        }
        
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }
        
        .metric-card {
            background-color: #f8f9fa;
            border-radius: 5px;
            padding: 10px;
            text-align: center;
        }
        
        .metric-value {
            font-size: 20px;
            font-weight: bold;
            margin: 5px 0;
        }
        
        .metric-label {
            font-size: 12px;
            color: #7f8c8d;
        }
        
        .scenario-card {
            background-color: white;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .scenario-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            color: white;
            margin-right: 10px;
            font-weight: bold;
        }
        
        .bull {
            background-color: #27ae60;
        }
        
        .base {
            background-color: #3498db;
        }
        
        .bear {
            background-color: #e74c3c;
        }
        
        .price-up {
            color: #27ae60;
        }
        
        .price-down {
            color: #e74c3c;
        }
        
        @media (max-width: 768px) {
            .grid, .swot-grid, .metric-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>{{ company_name }} ({{ ticker }}) Analysis Dashboard</h1>
            <p>Last Updated: {{ current_date }}</p>
            <div class="stock-info">
                <div class="stock-price">${{ current_price }}</div>
                <div class="stock-change">{{ price_change }} ({{ price_change_percent }}%)</div>
            </div>
        </div>
        
        <!-- Stock Performance Section -->
        <div class="section">
            <div class="section-title">
                <h2>Stock Performance</h2>
            </div>
            
            <div class="card">
                <h3>2-Year Stock Performance</h3>
                <div class="chart-container">
                    <canvas id="stockChart"></canvas>
                </div>
            </div>
            
            <div class="grid">
                <div class="card">
                    <h3>Key Performance Metrics</h3>
                    <div class="metric-grid">
                        <div class="metric-card">
                            <div class="metric-label">YTD Change</div>
                            <div class="metric-value {% if ytd_change|float > 0 %}price-up{% else %}price-down{% endif %}">{{ ytd_change }}%</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-label">From 52-Week High</div>
                            <div class="metric-value {% if change_from_high|float > 0 %}price-up{% else %}price-down{% endif %}">{{ change_from_high }}%</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-label">52-Week Change</div>
                            <div class="metric-value {% if week_52_change|float > 0 %}price-up{% else %}price-down{% endif %}">{{ week_52_change }}%</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-label">5-Year Return</div>
                            <div class="metric-value {% if five_year_change != 'N/A' and five_year_change|float > 0 %}price-up{% elif five_year_change != 'N/A' %}price-down{% endif %}">{{ five_year_change }}</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-label">52-Week High</div>
                            <div class="metric-value">${{ high_52_week }}</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-label">High Date</div>
                            <div class="metric-value">{{ high_52_week_date }}</div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Recent Key Events</h3>
                    <ul>
                        {% for event in key_events %}
                        <li><strong>{{ event.date }}:</strong> {{ event.title }} - {{ event.description }}</li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Market Share Section -->
        <div class="section">
            <div class="section-title">
                <h2>Market Position</h2>
            </div>
            
            <div class="card">
                <h3>Market Share Trends (2023-2025)</h3>
                <div class="chart-container">
                    <canvas id="marketShareChart"></canvas>
                </div>
            </div>
            
            <div class="grid">
                <div class="card">
                    <h3>Regional Market Share (2025)</h3>
                    <div class="chart-container">
                        <canvas id="regionalShareChart"></canvas>
                    </div>
                </div>
                
                <div class="card">
                    <h3>{{ company_name }} Position</h3>
                    <p><strong>Sector:</strong> {{ sector }}</p>
                    <p><strong>Industry:</strong> {{ industry }}</p>
                    <p>{{ company_name }} holds a significant position in the {{ industry }} market, with particular strength in key regions. The company continues to focus on innovation and market expansion to maintain its competitive edge.</p>
                </div>
            </div>
        </div>
        
        <!-- SWOT Analysis Section -->
        <div class="section">
            <div class="section-title">
                <h2>SWOT Analysis</h2>
            </div>
            
            <div class="swot-grid">
                <div class="swot-card strengths">
                    <div class="swot-header">Strengths</div>
                    <ul class="swot-list">
                        {% for strength in swot.strengths %}
                        <li>{{ strength }}</li>
                        {% endfor %}
                    </ul>
                </div>
                
                <div class="swot-card weaknesses">
                    <div class="swot-header">Weaknesses</div>
                    <ul class="swot-list">
                        {% for weakness in swot.weaknesses %}
                        <li>{{ weakness }}</li>
                        {% endfor %}
                    </ul>
                </div>
                
                <div class="swot-card opportunities">
                    <div class="swot-header">Opportunities</div>
                    <ul class="swot-list">
                        {% for opportunity in swot.opportunities %}
                        <li>{{ opportunity }}</li>
                        {% endfor %}
                    </ul>
                </div>
                
                <div class="swot-card threats">
                    <div class="swot-header">Threats</div>
                    <ul class="swot-list">
                        {% for threat in swot.threats %}
                        <li>{{ threat }}</li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Future Forecasts Section -->
        <div class="section">
            <div class="section-title">
                <h2>Future Price Forecasts (2025-2026)</h2>
            </div>
            
            <div class="card">
                <h3>Price Forecast Scenarios</h3>
                <div class="chart-container">
                    <canvas id="forecastChart"></canvas>
                </div>
            </div>
            
            <div class="scenario-card">
                <div>
                    <span class="scenario-badge bull">BULL CASE</span>
                    <strong>EOY 2026 Price Target: {{ scenarios.bull.price_target }}</strong>
                </div>
                <p>Assumes:</p>
                <ul>
                    {% for assumption in scenarios.bull.assumptions %}
                    <li>{{ assumption }}</li>
                    {% endfor %}
                </ul>
            </div>
            
            <div class="scenario-card">
                <div>
                    <span class="scenario-badge base">BASE CASE</span>
                    <strong>EOY 2026 Price Target: {{ scenarios.base.price_target }}</strong>
                </div>
                <p>Assumes:</p>
                <ul>
                    {% for assumption in scenarios.base.assumptions %}
                    <li>{{ assumption }}</li>
                    {% endfor %}
                </ul>
            </div>
            
            <div class="scenario-card">
                <div>
                    <span class="scenario-badge bear">BEAR CASE</span>
                    <strong>EOY 2026 Price Target: {{ scenarios.bear.price_target }}</strong>
                </div>
                <p>Assumes:</p>
                <ul>
                    {% for assumption in scenarios.bear.assumptions %}
                    <li>{{ assumption }}</li>
                    {% endfor %}
                </ul>
            </div>
        </div>
        
        <!-- Analyst Consensus -->
        <div class="section">
            <div class="section-title">
                <h2>Analyst Consensus</h2>
            </div>
            
            <div class="card">
                <h3>Analyst Recommendations ({{ current_date }})</h3>
                <div class="chart-container">
                    <canvas id="analystsChart"></canvas>
                </div>
                <div style="margin-top: 15px;">
                    <p>The analyst consensus reflects a mixed outlook for {{ company_name }}, with a slight bias toward positive recommendations. Individual price targets vary widely, indicating uncertainty about the company's near-term prospects.</p>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Stock performance chart
        const stockCtx = document.getElementById('stockChart').getContext('2d');
        const stockChart = new Chart(stockCtx, {
            type: 'line',
            data: {
                labels: {{ chart_dates }},
                datasets: [{
                    label: '{{ ticker }} Stock Price (USD)',
                    data: {{ chart_prices }},
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
        
        // Market share chart
        const marketShareCtx = document.getElementById('marketShareChart').getContext('2d');
        const marketShareChart = new Chart(marketShareCtx, {
            type: 'line',
            data: {
                labels: {{ market_share_dates }},
                datasets: [{
                    label: '{{ company_name }}',
                    data: {{ market_share_company }},
                    borderColor: '#e74c3c',
                    backgroundColor: 'transparent',
                    borderWidth: 3
                }, {
                    label: 'Competitor 1',
                    data: {{ market_share_competitor1 }},
                    borderColor: '#2ecc71',
                    backgroundColor: 'transparent',
                    borderWidth: 3
                }, {
                    label: 'Competitor 2',
                    data: {{ market_share_competitor2 }},
                    borderColor: '#3498db',
                    backgroundColor: 'transparent',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Market Share (%)'
                        }
                    }
                }
            }
        });
        
        // Regional market share chart
        const regionalShareCtx = document.getElementById('regionalShareChart').getContext('2d');
        const regionalShareChart = new Chart(regionalShareCtx, {
            type: 'doughnut',
            data: {
                labels: {{ regional_labels }},
                datasets: [{
                    data: {{ regional_share }},
                    backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '% market share';
                            }
                        }
                    }
                }
            }
        });
        
        // Forecast chart
        const forecastCtx = document.getElementById('forecastChart').getContext('2d');
        const forecastChart = new Chart(forecastCtx, {
            type: 'line',
            data: {
                labels: {{ forecast_dates }},
                datasets: [{
                    label: 'Bull Case',
                    data: {{ bull_case }},
                    borderColor: '#27ae60',
                    backgroundColor: 'transparent',
                    borderWidth: 3
                }, {
                    label: 'Base Case',
                    data: {{ base_case }},
                    borderColor: '#3498db',
                    backgroundColor: 'transparent',
                    borderWidth: 3
                }, {
                    label: 'Bear Case',
                    data: {{ bear_case }},
                    borderColor: '#e74c3c',
                    backgroundColor: 'transparent',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        }
                    }
                }
            }
        });
        
        // Analysts chart
        const analystsCtx = document.getElementById('analystsChart').getContext('2d');
        const analystsChart = new Chart(analystsCtx, {
            type: 'bar',
            data: {
                labels: {{ analyst_labels }},
                datasets: [{
                    data: {{ analyst_counts }},
                    backgroundColor: ['#27ae60', '#2ecc71', '#3498db', '#e74c3c', '#c0392b']
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + ' analysts';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Number of Analysts'
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
"""
    
    # Render the template
    template = Template(html_template)
    rendered_html = template.render(**template_data)
    
    # Write the HTML to a file
    output_file = os.path.join(output_dir, f"{ticker}_report.html")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(rendered_html)
    
    print(f"Report generated successfully: {output_file}")
    return output_file

def main():
    """
    Main function to run the stock report generator.
    """
    import argparse
    
    parser = argparse.ArgumentParser(description='Generate a stock analysis report from JSON data')
    parser.add_argument('json_file', type=str, help='Path to the JSON data file')
    parser.add_argument('--output', '-o', type=str, help='Output directory', default=None)
    
    args = parser.parse_args()
    
    try:
        report_path = generate_stock_report(args.json_file, args.output)
        print(f"Report available at: {report_path}")
    except Exception as e:
        print(f"Error generating report: {e}")

if __name__ == "__main__":
    main()