# Fake Review Detection System

## Project Overview
This project is an AI-based system designed to identify whether an online review is genuine or fake. It analyzes review information and uses machine learning techniques to classify suspicious reviews.

## Tech Stack
* **Language & Framework**: Python, Flask REST API
* **Machine Learning**: Scikit-Learn (TF-IDF Vectorizer + Classifier), Natural Language Toolkit (NLTK)
* **Frontend**: HTML5, CSS3, JavaScript (Fetch API, Live interactive analyzer)
* **Database**: SQL (SQLite / PostgreSQL) for logging classified reviews and metadata

## Core Features
1. **Text Preprocessing**: Tokenization, lowercase normalization, punctuation removal, and stopword filtering.
2. **Feature Extraction**: TF-IDF (Term Frequency - Inverse Document Frequency) and sentiment polarity metrics.
3. **Classification Model**: Trained model classifying inputs into **Genuine** or **Suspicious / Fake**.
4. **Interactive Web Dashboard**: Allows instant pasting of review text with confidence score indicators.
5. **Database Storage**: SQL schema storing review logs, confidence scores, timestamps, and feedback.
