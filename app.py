from flask import Flask, request, jsonify, render_template
from flask_caching import Cache
import requests
from datetime import datetime
import os

app = Flask(__name__)

app.config['CACHE_TYPE'] = 'simple'
app.config['CACHE_DEFAULT_TIMEOUT'] = 600  
cache = Cache(app)

def get_data_from_api(tech_stack, page):
    url = "https://api.scrapingdog.com/linkedinjobs/"
    api_key = os.getenv("SCRAPINGDOG_API_KEY")
    if not api_key:
        raise ValueError("Missing SCRAPINGDOG_API_KEY in environment variables")
    
    params = {
        "api_key": api_key,
        "field": tech_stack,
        "geoid": 92000000,
        "page": page
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        print("Request failed with status code:", response.status_code)
        return []

@cache.memoize()
def get_data(tech_stack, page):
    return get_data_from_api(tech_stack, page)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/jobs', methods=['GET'])
def get_jobs():
    tech_stack = request.args.get('tech_stack', default='', type=str).lower()
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)

    jobs = get_data(tech_stack, page)
    paginated_jobs = jobs[0:10]

    return jsonify({
        "page": page,
        "per_page": per_page,
        "total": 10000,
        "total_pages": (10000 // per_page) + (1 if 10000 % per_page != 0 else 0),
        "jobs": paginated_jobs
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


