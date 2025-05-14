# Tweet Recommendation System

This project is a full-stack application that recommends similar tweets based on user input using cosine similarity and MiniBERT embeddings.

![image](https://github.com/user-attachments/assets/8d265905-417d-420d-bbe1-e767ba704ee6)


## Features

- React-based frontend with a modern, responsive UI
- FastAPI backend with efficient tweet recommendation system
- Uses MiniBERT embeddings for semantic similarity
- Real-time recommendations
- Clean and intuitive user interface

## Technology Stack

### Frontend
- React.js
- Axios for API calls
- CSS for styling

### Backend
- FastAPI
- sentence-transformers (MiniBERT)
- scikit-learn
- NumPy
- Pandas

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Project676
```

2. Install backend dependencies
```bash
pip install -r requirements.txt
```

3. Install frontend dependencies
```bash
cd my-app
npm install
```

### Running the Application

1. Start the backend server
```bash
uvicorn app:app --reload
```

2. In a separate terminal, start the frontend
```bash
cd my-app
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Project Structure
```
├── app.py              # FastAPI backend server
├── requirements.txt    # Python dependencies
├── app.jsx            # Main React component
├── my-app/            # React frontend
└── tweet/             # Data directory
    ├── embeddings.npy # Pre-computed tweet embeddings
    └── tweets.csv     # Tweet dataset
```

## Data Source
The tweets are sourced from [this Kaggle dataset](https://www.kaggle.com/datasets/yasserh/twitter-tweets-sentiment-dataset).

## How it Works
1. User inputs a tweet-like text
2. The backend processes the input using MiniBERT to generate embeddings
3. Cosine similarity is used to find the most similar tweets
4. Top 10 similar tweets are returned and displayed to the user

## Contributing
Feel free to submit issues and enhancement requests!
