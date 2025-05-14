import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // External CSS file for styling

const App = () => {
  // State variables for input, recommendations, errors, and loading state
  const [inputText, setInputText] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission and fetch recommendations
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/recommend", { text: inputText });
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setError("Error fetching recommendations.");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset recommendations when input is empty
  const handleReset = () => {
    setRecommendations([]);
  };

  return (
    <div className="container"> {/* Centered container with dynamic height */}
      <div className="card"> {/* Main content card */}
        <h1 className="title">Tweet Recommendation</h1>
        
        {/* Description with embedded link */}
        <h4 className="description">
          This app uses cosine similarity on MiniBERT embeddings to recommend tweets similar to your input. Tweets are sourced from&nbsp;
          <a href="https://www.kaggle.com/datasets/yasserh/twitter-tweets-sentiment-dataset" target="_blank" rel="noopener noreferrer">
            this Kaggle dataset
          </a>.
        </h4>

        {/* Input form with conditional button */}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Type your tweet here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input"
          />
          {/* Show reset button when input is empty, otherwise show Get/Loader */}
          {inputText.trim() === "" ? (
            <button type="button" className="button reset" onClick={handleReset}>
              Reset
            </button>
          ) : (
            <button type="submit" className="button" disabled={loading}>
              {loading ? <span className="loader" /> : "Get"}
            </button>
          )}
        </form>

        {/* Show error if any */}
        {error && <p className="error">{error}</p>}

        {/* Recommendations section */}
        <h2 className="recommendation-title">Recommendations</h2>
        {recommendations.length > 0 ? (
          <ul className="recommendation-list">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="recommendation-item">
                {recommendation}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-recommendations">No recommendations yet</p>
        )}
      </div>
    </div>
  );
};

export default App;
