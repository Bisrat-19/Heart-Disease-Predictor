import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '1',
    cp: '0',
    trestbps: '',
    chol: '',
    fbs: '0',
    restecg: '0',
    thalach: '',
    exang: '0',
    oldpeak: '',
    slope: '0',
    ca: '0',
    thal: '1'
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const features = [
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      description: 'Age of the patient in years.'
    },
    {
      name: 'sex',
      label: 'Sex',
      type: 'select',
      options: [
        { value: '1', label: 'Male' },
        { value: '0', label: 'Female' }
      ],
      description: 'Biological sex of the patient.'
    },
    {
      name: 'cp',
      label: 'Chest Pain Type',
      type: 'select',
      options: [
        { value: '0', label: 'Typical Angina' },
        { value: '1', label: 'Atypical Angina' },
        { value: '2', label: 'Non-anginal Pain' },
        { value: '3', label: 'Asymptomatic' }
      ],
      description: 'The type of chest pain reported by the patient.'
    },
    {
      name: 'trestbps',
      label: 'Resting Blood Pressure',
      type: 'number',
      description: 'Resting blood pressure in mm Hg on admission to the hospital.'
    },
    {
      name: 'chol',
      label: 'Cholesterol',
      type: 'number',
      description: 'Serum cholesterol level in mg/dl.'
    },
    {
      name: 'fbs',
      label: 'Fasting Blood Sugar',
      type: 'select',
      options: [
        { value: '0', label: '< 120 mg/dl' },
        { value: '1', label: '> 120 mg/dl' }
      ],
      description: 'Whether fasting blood sugar is greater than 120 mg/dl.'
    },
    {
      name: 'restecg',
      label: 'Resting ECG Results',
      type: 'select',
      options: [
        { value: '0', label: 'Normal' },
        { value: '1', label: 'ST-T Wave Abnormality' },
        { value: '2', label: 'Left Ventricular Hypertrophy' }
      ],
      description: 'Resting electrocardiographic results.'
    },
    {
      name: 'thalach',
      label: 'Max Heart Rate',
      type: 'number',
      description: 'Maximum heart rate achieved during exercise.'
    },
    {
      name: 'exang',
      label: 'Exercise Induced Angina',
      type: 'select',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Yes' }
      ],
      description: 'Chest pain induced by exercise.'
    },
    {
      name: 'oldpeak',
      label: 'ST Depression',
      type: 'number',
      step: '0.1',
      description: 'ST depression induced by exercise relative to rest.'
    },
    {
      name: 'slope',
      label: 'Peak Exercise ST Slope',
      type: 'select',
      options: [
        { value: '0', label: 'Upsloping' },
        { value: '1', label: 'Flat' },
        { value: '2', label: 'Downsloping' }
      ],
      description: 'The slope of the peak exercise ST segment.'
    },
    {
      name: 'ca',
      label: 'Major Vessels (0-3)',
      type: 'select',
      options: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ],
      description: 'Number of major vessels (0-3) colored by fluoroscopy.'
    },
    {
      name: 'thal',
      label: 'Thalassemia',
      type: 'select',
      options: [
        { value: '1', label: 'Normal' },
        { value: '2', label: 'Fixed Defect' },
        { value: '3', label: 'Reversable Defect' }
      ],
      description: 'A blood disorder called thalassemia.'
    }
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPrediction(null)

    // Convert to list of floats in correct order
    const featureList = features.map(f => parseFloat(formData[f.name]))

    // Validate
    if (featureList.some(isNaN)) {
      setError("Please fill in all fields correctly.")
      setLoading(false)
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://heart-disease-predictor-uj7r.onrender.com'
      const response = await axios.post(`${apiUrl}/predict`, {
        features: featureList
      })
      setPrediction(response.data)
    } catch (err) {
      setError("Failed to get prediction from backend.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Heart Disease Prediction</h1>
        <p>Enter patient details below to get a prediction.</p>
      </header>

      <div className="main-content">
        <form onSubmit={handleSubmit} className="prediction-form">
          <div className="grid">
            {features.map(f => (
              <div key={f.name} className="form-group">
                <div className="label-wrapper">
                  <label htmlFor={f.name}>{f.label}</label>
                  <div className="info-icon">
                    <span className="tooltip-text">{f.description}</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  </div>
                </div>
                {f.type === 'select' ? (
                  <select name={f.name} value={formData[f.name]} onChange={handleChange} id={f.name}>
                    {f.options.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    step={f.step || "1"}
                    required
                    id={f.name}
                  />
                )}
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Analyzing...' : 'Predict'}
          </button>
        </form>

        {error && <div className="error-msg">{error}</div>}

        {prediction && (
          <div className="result-card">
            <h2>Prediction Results</h2>
            <div className="results-grid">
              <div className={`result-item ${prediction.logistic_regression === 1 ? 'danger' : 'safe'}`}>
                <h3>Logistic Regression</h3>
                <span className="verdict">
                  {prediction.logistic_regression === 1 ? 'High Risk' : 'Low Risk'}
                </span>
              </div>
              <div className={`result-item ${prediction.decision_tree === 1 ? 'danger' : 'safe'}`}>
                <h3>Decision Tree</h3>
                <span className="verdict">
                  {prediction.decision_tree === 1 ? 'High Risk' : 'Low Risk'}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="glossary-section">
          <h2>Medical Terms Explained</h2>
          <div className="glossary-grid">
            {features.map(f => (
              <div key={f.name} className="glossary-item">
                <h3>{f.label}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
