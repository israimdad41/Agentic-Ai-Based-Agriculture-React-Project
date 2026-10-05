import { useState } from "react";
import Recommendation from "./Recommendation";
import { IconLeaf, IconArrowLeft, IconSparkle, IconArrow } from "./Icons";
import "./FarmerForm.css";

const emptyForm = {
  location: "",
  landArea: "",
  soilType: "",
  soilPH: "",
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  water: "",
  season: "",
  temperature: "",
  rainfall: "",
};

function FarmerForm({ onBack }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("cropgenFarmData", JSON.stringify(formData));
    } catch (error) {
      // storage band ho to bhi recommendation dikha do
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Recommendation
        farmData={formData}
        onBack={() => setSubmitted(false)}
      />
    );
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <button className="back-btn" onClick={onBack}>
          <IconArrowLeft /> Back
        </button>

        <div className="form-logo">
          <span className="form-logo-icon">
            <IconLeaf />
          </span>
          CropGen <b>AI</b>
        </div>
      </div>

      <div className="form-container">
        <div className="form-intro">
          <span>Farm analysis</span>

          <h1>
            Tell us about <em>your farm</em>
          </h1>

          <p>
            Enter your field conditions and CropGen AI will analyze them to
            find the most suitable crop and variety.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* FARM INFORMATION */}
          <div className="form-section">
            <div className="section-title">
              <span>01</span>
              <div>
                <h2>Farm Information</h2>
                <p>Basic information about your farm</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="location">Farm Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="e.g. Nawabshah, Sindh"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="landArea">Land Area (acres)</label>
                <input
                  id="landArea"
                  type="number"
                  min="0"
                  step="any"
                  name="landArea"
                  placeholder="e.g. 5"
                  value={formData.landArea}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="season">Season</label>
                <select
                  id="season"
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select season</option>
                  <option value="Rabi">Rabi</option>
                  <option value="Kharif">Kharif</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="water">Water Availability</label>
                <select
                  id="water"
                  name="water"
                  value={formData.water}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select availability</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* SOIL INFORMATION */}
          <div className="form-section">
            <div className="section-title">
              <span>02</span>
              <div>
                <h2>Soil Information</h2>
                <p>Provide your soil conditions</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="soilType">Soil Type</label>
                <select
                  id="soilType"
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select soil type</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Silty">Silty</option>
                  <option value="Sandy Loam">Sandy Loam</option>
                  <option value="Clay Loam">Clay Loam</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="soilPH">Soil pH (0 - 14)</label>
                <input
                  id="soilPH"
                  type="number"
                  min="0"
                  max="14"
                  step="0.1"
                  name="soilPH"
                  placeholder="e.g. 7.0"
                  value={formData.soilPH}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="nitrogen">Nitrogen (N)</label>
                <input
                  id="nitrogen"
                  type="number"
                  min="0"
                  step="any"
                  name="nitrogen"
                  placeholder="Enter N value"
                  value={formData.nitrogen}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="phosphorus">Phosphorus (P)</label>
                <input
                  id="phosphorus"
                  type="number"
                  min="0"
                  step="any"
                  name="phosphorus"
                  placeholder="Enter P value"
                  value={formData.phosphorus}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="potassium">Potassium (K)</label>
                <input
                  id="potassium"
                  type="number"
                  min="0"
                  step="any"
                  name="potassium"
                  placeholder="Enter K value"
                  value={formData.potassium}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* ENVIRONMENT */}
          <div className="form-section">
            <div className="section-title">
              <span>03</span>
              <div>
                <h2>Environmental Conditions</h2>
                <p>Current environmental conditions</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="temperature">Average Temperature (°C)</label>
                <input
                  id="temperature"
                  type="number"
                  step="any"
                  name="temperature"
                  placeholder="e.g. 28"
                  value={formData.temperature}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="rainfall">Average Rainfall (mm)</label>
                <input
                  id="rainfall"
                  type="number"
                  min="0"
                  step="any"
                  name="rainfall"
                  placeholder="e.g. 450"
                  value={formData.rainfall}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="form-submit-area">
            <div className="form-submit-text">
              <span className="submit-icon">
                <IconSparkle />
              </span>

              <div>
                <strong>Ready to analyze?</strong>
                <p>CropGen AI will analyze your farm conditions.</p>
              </div>
            </div>

            <button type="submit" className="recommend-btn">
              Get AI Recommendation <IconArrow />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FarmerForm;