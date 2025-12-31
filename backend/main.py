from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(title="Heart Disease Prediction API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
try:
    lr_model = joblib.load(os.path.join(MODEL_DIR, "logistic_model.pkl"))
    dt_model = joblib.load(os.path.join(MODEL_DIR, "decision_tree_model.pkl"))
    scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
    print("Models loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")
    lr_model = None
    dt_model = None
    scaler = None

class HeartData(BaseModel):
    features: List[float] = Field(..., min_items=13, max_items=13, description="List of 13 features in order: age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal")
    
@app.post("/predict")
def predict(data: HeartData):
    if not lr_model or not dt_model or not scaler:
        raise HTTPException(status_code=500, detail="Models not loaded")
    
    try:
        features = np.array(data.features).reshape(1, -1)
        
        features_scaled = scaler.transform(features)
        lr_prediction = lr_model.predict(features_scaled)[0]
        
        dt_prediction = dt_model.predict(features)[0]
        
        return {
            "logistic_regression": int(lr_prediction),
            "decision_tree": int(dt_prediction)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
