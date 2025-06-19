# 🔍 Tech Job Finder

**Tech Job Finder** is a Flask-based web application that helps identify companies actively using a specified technology stack by analyzing job listings. Users input a tech keyword (like `Python`, `Kafka`, or `Kubernetes`), and the app fetches job postings from LinkedIn (via the ScrapingDog API) and displays key job and company details in a clean, interactive interface.

---

## 🚀 Features

- 🔎 Search for jobs by tech stack (e.g., Python, Java, Docker)
- 📄 Fetch jobs using the ScrapingDog LinkedIn Jobs API
- 🧠 Displays job title, company name, logo, domain, location, and job posting date
- 📄 Paginated results with smooth client-side navigation
- 🚀 Caching enabled to reduce redundant API requests
- 🌐 Responsive UI built with HTML, CSS, and JavaScript

---

## 🛠 Tech Stack

- **Backend:** Flask, Flask-Caching, Requests
- **Frontend:** HTML, CSS, JavaScript
- **API Used:** [ScrapingDog LinkedIn Jobs API](https://www.scrapingdog.com/)

---

## Install dependencies

pip install -r requirements.txt

---

## Run the app

python .\\app.py

---


## Open your browser and go to

(http://127.0.0.1:5000/)

---

## ⚙️ Configuration

"api_key": "681625283cfa3b66a1de3352"

---

## 📥 Input

<img src="static/images/Input.png" width="500"/>

---

## 📥 Output

<img src="static/images/Output.png" width="500"/>

---

## 📊 System Architecture

<img src="static/images/architecture.png" width="500"/>

---

## System Explanation

This project is designed to identify companies using a given technology stack based on job postings.

- **Frontend**: A simple user interface (HTML, CSS, JavaScript) allows users to input a technology stack.
- **Backend**: The Flask app handles requests to fetch job listings from the ScrapingDog API and caches them.
- **Caching**: Caching is used to reduce redundant API calls and improve performance.
- **Job Data**: The app extracts job data and displays relevant details such as company name, domain, job title, and job link.

---

## Architecture

The system consists of:
1. **Frontend**: HTML, CSS, and JavaScript for a clean UI.
2. **Backend**: Flask server, which connects to the ScrapingDog API and returns job listings.
3. **Caching**: Using Flask-Caching for improved performance and reduced load.


