# CardioPredict: Heart Disease Prediction System

A full-stack machine learning application that predicts the risk of heart disease based on patient medical data.

## 🚀 Project Overview

This project consists of three main components:
- **ML Workspace**: Data cleaning, model training (Logistic Regression & Decision Tree), and model evaluation using the UCI Heart Disease dataset.
- **FastAPI Backend**: A robust API that serves the trained models and provides real-time prediction endpoints.
- **React Frontend**: A modern, glassmorphism-style dashboard with descriptive medical tooltips and a comprehensive glossary for user clarity.

## 📂 Project Structure

```text
├── ml/             # Jupyter notebook, dataset, and trained model files (.pkl)
├── backend/        # FastAPI application and prediction logic
└── frontend/       # React (Vite) dashboard and user interface
```

## 🛠️ Tech Stack

- **ML**: Python, Pandas, Scikit-learn, Jupyter
- **Backend**: FastAPI, Uvicorn, Joblib
- **Frontend**: React, Vite, Axios, Vanilla CSS

## 🏁 Getting Started

1. **ML Model**: Run the notebook in `ml/` to generate the `.pkl` model files.
2. **Backend**: Navigate to `backend/`, install dependencies, and run `uvicorn main:app --reload`.
3. **Frontend**: Navigate to `frontend/`, run `npm install` and `npm run dev`.

---
*Created with focus on medical clarity and professional performance.*
