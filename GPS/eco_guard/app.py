from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/simulate', methods=['POST'])
def simulate():
    data = request.json
    try:
        location = data.get('location', '')
        lat = data.get('latitude', '')
        lng = data.get('longitude', '')

        if not location and (not lat or not lng):
            return jsonify({"error": "Please provide a geographical location or coordinates."})

        # Simulate Satellite Data Retrieval based on location scan
        total_trees = random.randint(50000, 500000)
        avg_area = random.uniform(10.0, 25.0)
        
        # Simulate realistic tree loss scenarios
        loss_severity = random.random()
        if loss_severity < 0.4:
            trees_lost = random.randint(0, int(total_trees * 0.02))
        elif loss_severity < 0.8:
            trees_lost = random.randint(int(total_trees * 0.02), int(total_trees * 0.1))
        else:
            trees_lost = random.randint(int(total_trees * 0.1), int(total_trees * 0.25))
            
        permitted_limit = int(total_trees * 0.05)
        trees_replanted = random.randint(0, int(trees_lost * 0.8))

        trees_remaining = total_trees - trees_lost
        tree_loss_percentage = (trees_lost / total_trees) * 100
        forest_area_lost = trees_lost * avg_area
        replanting_needed = max(0, trees_lost - trees_replanted)
        
        limit_status = "Limit Exceeded" if trees_lost > permitted_limit else "Within Limits"
        alert = True if trees_lost > permitted_limit else False

        if tree_loss_percentage < 5:
            env_impact = "Low"
            air_quality = "Good"
            fire_risk = "Low"
            wildlife_impact = int(trees_lost * 0.5)
            temp_change = round(tree_loss_percentage * 0.02, 2)
        elif tree_loss_percentage < 15:
            env_impact = "Moderate"
            air_quality = "Moderate"
            fire_risk = "Moderate"
            wildlife_impact = int(trees_lost * 2)
            temp_change = round(tree_loss_percentage * 0.05, 2)
        else:
            env_impact = "Severe"
            air_quality = "Poor"
            fire_risk = "High"
            wildlife_impact = int(trees_lost * 5)
            temp_change = round(tree_loss_percentage * 0.1, 2)

        return jsonify({
            "total_trees": int(total_trees),
            "trees_lost": int(trees_lost),
            "permitted_limit": int(permitted_limit),
            "trees_remaining": int(trees_remaining),
            "tree_loss_percentage": round(tree_loss_percentage, 2),
            "forest_area_lost": round(forest_area_lost, 2),
            "replanting_needed": int(replanting_needed),
            "limit_status": limit_status,
            "env_impact": env_impact,
            "air_quality": air_quality,
            "fire_risk": fire_risk,
            "wildlife_impact": wildlife_impact,
            "temp_change": f"+{temp_change}°C",
            "alert": alert
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
