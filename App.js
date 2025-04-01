import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [mainroad, setMainroad] = useState('yes');
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const data = {
      area,
      bedrooms,
      bathrooms,
      mainroad,
      // Add other features here if needed
    };

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:5000/predict', data);
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      setError('Error predicting the price, please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>House Price Prediction</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Area (sq ft): </label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Bedrooms: </label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Bathrooms: </label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Main Road: </label>
          <select
            value={mainroad}
            onChange={(e) => setMainroad(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Add more form fields for other features if needed */}

        <button type="submit">Predict Price</button>
      </form>

      {predictedPrice && (
        <div>
          <h2>Predicted Price: ${predictedPrice}</h2>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
