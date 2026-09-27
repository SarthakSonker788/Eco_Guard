# Eco Guard: Satellite-based Deforestation & Impact Tracker

Eco Guard is a modern, minimalist web application built to simulate satellite data tracking for deforestation and its environmental impact. It allows users to scan any geographical location (or specific GPS coordinates) to automatically generate telemetry data like the number of trees lost, permitted cutting limits, and overall environmental impact, all visualized through a sleek, interactive dashboard.

## Features
- **Real-time Satellite Scan Simulation**: Input a region name or latitude/longitude to generate mock satellite telemetry data.
- **Environmental Impact Analysis**: Automatically calculates wildlife impact, temperature change estimates, fire risks, and air quality degradation based on the forest area lost.
- **Dynamic Alerting System**: Notifies immediately if the tree loss exceeds the permitted threshold.
- **Modern Glassmorphism UI**: Beautiful, interactive dashboard crafted with HTML, CSS (Glassmorphism), and Vanilla JavaScript without any heavy UI frameworks.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Python 3.8+**

## Installation Steps

1. **Open your Terminal (or Command Prompt)** and navigate to the project directory:
   ```bash
   cd path/to/eco_guard
   ```

2. **Create a Virtual Environment**
   It is highly recommended to use a virtual environment to manage dependencies. Run the following command to create one:
   
   *On macOS and Linux:*
   ```bash
   python3 -m venv venv
   ```
   *On Windows:*
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**
   
   *On macOS and Linux:*
   ```bash
   source venv/bin/activate
   ```
   *On Windows:*
   ```bash
   venv\Scripts\activate
   ```

4. **Install the Required Dependencies**
   Once the virtual environment is activated, install the required packages using `pip`:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask Server**
   Ensure your virtual environment is still activated and run the application:
   ```bash
   python3 app.py
   ```
   *(Use `python app.py` on Windows)*

2. **Access the Dashboard**
   Once the server starts, it will output a local URL (usually `http://127.0.0.1:5000/`). Open this link in any modern web browser to access the Eco Guard Dashboard.

## Project Structure
- `app.py`: The main Flask backend script.
- `requirements.txt`: Python package dependencies.
- `templates/index.html`: The HTML structure for the dashboard UI.
- `static/css/style.css`: Custom CSS for styling the application.
- `static/js/main.js`: Frontend JavaScript logic for interaction and animations.
