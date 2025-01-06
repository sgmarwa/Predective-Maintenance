from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)

with open('finalized_model2.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return render_template('prediction.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = [
        float(data['Air_temperature']),
        float(data['Process_temperature']),
        float(data['rotational_speed']),
        float(data['torque']),
        float(data['tool_wear']),
        float(data['power']),
        float(data['Temperature_difference'])
    ]
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)[0]
    
    return jsonify({
        'prediction': float(prediction)
    })

if __name__ == '__main__':
    app.run(debug=True)


