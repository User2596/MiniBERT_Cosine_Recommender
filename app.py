from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import re
import html

app = FastAPI()

# Allow CORS from React frontend
origins = [
    "http://localhost:3000",  # React frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows CORS from React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load embeddings and tweet texts
embeddings = np.load('tweet/embeddings.npy')
tweets = pd.read_csv('tweet/tweets.csv')

# Pydantic model for request
class TextInput(BaseModel):
    text: str


def clean_tweet(text):
    text = re.sub(r'http\S+|www\S+|https\S+', '', text) # Remove URLs
    text = re.sub(r'@\w+|#\w+', '', text)               # Remove mentions and hashtags
    text = html.unescape(text)                          # Decode HTML entities
    text = re.sub(r'\s+', ' ', text).strip()            # Remove extra whitespaces and strip
    return text

# Function to get most similar tweets based on cosine similarity
def get_similar_tweets(user_input_embedding):
    similarities = cosine_similarity(user_input_embedding.reshape(1, -1), embeddings)
    most_similar_idx = similarities.argsort()[0][-10:][::-1]  # Top 10 most similar
    return tweets.iloc[most_similar_idx]['text'].tolist()

# Endpoint for recommendations
@app.post("/recommend")
async def recommend(input_data: TextInput):
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    user_input_embedding = model.encode(clean_tweet(input_data.text))
    recommendations = get_similar_tweets(user_input_embedding)
    return {"recommendations": recommendations}