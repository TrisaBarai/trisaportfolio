"""
Fake Review Detection System - Backend Server
Framework: Python Flask + SQLite Database
Author: Trisa Barai
"""

import sqlite3
import re
import math
from datetime import datetime
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
DB_NAME = "reviews.db"

def init_db():
    """Initializes the SQLite database with review logs table."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS review_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            review_text TEXT NOT NULL,
            prediction TEXT NOT NULL,
            confidence REAL NOT NULL,
            sentiment_score REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def extract_features_and_predict(text):
    """
    NLP and Heuristic Machine Learning Classifier Simulation.
    Analyzes spam indicators, excessive punctuation, superlatives, and text length.
    """
    cleaned = text.strip()
    if not cleaned:
        return "Unknown", 0.0, 0.0, ["Empty review text."]

    word_count = len(re.findall(r'\b\w+\b', cleaned))
    upper_chars = sum(1 for c in cleaned if c.isupper())
    total_chars = max(len(cleaned), 1)
    caps_ratio = upper_chars / total_chars
    exclamations = cleaned.count('!') + cleaned.count('?')
    
    # Common spam / fake review patterns
    spam_keywords = [
        "100% recommended", "best ever", "buy now", "click here", 
        "guaranteed", "must buy", "free gift", "discount code",
        "scam", "waste of money", "dont buy", "fake product", "5 stars for sure"
    ]
    
    keyword_hits = sum(1 for kw in spam_keywords if kw in cleaned.lower())
    
    # Heuristic scoring
    fake_score = 0.0
    reasons = []

    if caps_ratio > 0.35 and total_chars > 20:
        fake_score += 0.3
        reasons.append("High capital letter ratio (potential shouting/bot)")

    if exclamations >= 3:
        fake_score += 0.25
        reasons.append("Excessive exclamation/punctuation marks")

    if keyword_hits > 0:
        fake_score += min(0.4, keyword_hits * 0.2)
        reasons.append(f"Contains {keyword_hits} promotional/spam trigger keyword(s)")

    if word_count < 6 and total_chars > 0:
        fake_score += 0.2
        reasons.append("Extremely short or vague review")

    # Natural organic reviews have moderate length and specific details
    if 25 <= word_count <= 250 and keyword_hits == 0 and caps_ratio < 0.15:
        fake_score = max(0.05, fake_score - 0.35)
        reasons.append("Balanced natural sentence structure")

    fake_score = max(0.02, min(0.98, fake_score))
    
    if fake_score >= 0.50:
        prediction = "Suspicious / Fake Review"
        confidence = round(fake_score * 100, 1)
    else:
        prediction = "Genuine Review"
        confidence = round((1.0 - fake_score) * 100, 1)

    sentiment = round((word_count % 5 - 2) * 0.3, 2)
    return prediction, confidence, sentiment, reasons

@app.route("/api/analyze", methods=["POST"])
def analyze_review():
    """Endpoint to analyze a review string."""
    data = request.get_json(silent=True) or {}
    review_text = data.get("text", "")
    
    if not review_text or len(review_text.strip()) < 5:
        return jsonify({"error": "Please provide a review text with at least 5 characters."}), 400

    prediction, confidence, sentiment, reasons = extract_features_and_predict(review_text)

    # Save to SQLite database
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO review_logs (review_text, prediction, confidence, sentiment_score)
            VALUES (?, ?, ?, ?)
        """, (review_text, prediction, confidence, sentiment))
        conn.commit()
        conn.close()
    except Exception as e:
        print("Database error:", e)

    return jsonify({
        "success": True,
        "prediction": prediction,
        "confidence": confidence,
        "sentiment_score": sentiment,
        "reasons": reasons,
        "analyzed_at": datetime.utcnow().isoformat()
    })

@app.route("/api/stats", methods=["GET"])
def get_stats():
    """Fetches total analyzed review statistics from SQL database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM review_logs")
    total = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM review_logs WHERE prediction LIKE '%Fake%'")
    fake_count = cursor.fetchone()[0]
    conn.close()

    return jsonify({
        "total_analyzed": total,
        "fake_detected": fake_count,
        "genuine_detected": total - fake_count
    })

if __name__ == "__main__":
    init_db()
    print("Fake Review Detection System Backend running on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
