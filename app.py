from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.tree import DecisionTreeRegressor
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pickle

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Load the pre-trained model and preprocessing pipeline
model = None
preprocessor = None

def load_model():
    global model, preprocessor
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('preprocessor.pkl', 'rb') as f:
        preprocessor = pickle.load(f)

# Load the model when the app starts
load_model()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Prepare data
    features = [
        data['area'],
        data['bedrooms'],
        data['bathrooms'],
        1 if data['mainroad'] == 'yes' else 0
    ]

    # Convert features to a DataFrame
    input_data = pd.DataFrame([features], columns=['area', 'bedrooms', 'bathrooms', 'mainroad'])

    # Preprocess the input data and make predictions
    processed_data = preprocessor.transform(input_data)
    prediction = model.predict(processed_data)

    # Return the predicted price
    return jsonify({'predicted_price': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
