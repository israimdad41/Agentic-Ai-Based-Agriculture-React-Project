import Recommendation from "./Recommendation";
import { useState } from "react";
import { IconLeaf, IconArrowLeft, IconSparkle, IconArrow } from "./Icons";
import "./FarmerForm.css";

function FarmerForm({ onBack }) {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  
 localStorage.setItem(
    "cropgenFarmData",
    JSON.stringify(formData)
  );
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
            Enter your field conditions and CropGen AI will analyze
            them to find the most suitable crop and variety.
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
                <label>Farm Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Nawabshah, Sindh"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Land Area (acres)</label>

                <input
                  type="number"
                  name="landArea"
                  placeholder="e.g. 5"
                  value={formData.landArea}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Season</label>

                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select season</option>
                  <option value="Kharif">Kharif</option>
                  <option value="Rabi">Rabi</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>

              <div className="input-group">
                <label>Water Availability</label>

                <select
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
                <label>Soil Type</label>

                <select
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
                <label>Soil pH</label>

                <input
                  type="number"
                  step="0.1"
                  name="soilPH"
                  placeholder="e.g. 7.0"
                  value={formData.soilPH}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Nitrogen (N)</label>

                <input
                  type="number"
                  name="nitrogen"
                  placeholder="Enter N value"
                  value={formData.nitrogen}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Phosphorus (P)</label>

                <input
                  type="number"
                  name="phosphorus"
                  placeholder="Enter P value"
                  value={formData.phosphorus}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Potassium (K)</label>

                <input
                  type="number"
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
                <label>Average Temperature (°C)</label>

                <input
                  type="number"
                  name="temperature"
                  placeholder="e.g. 28"
                  value={formData.temperature}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Average Rainfall (mm)</label>

                <input
                  type="number"
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

                <p>
                  CropGen AI will analyze your farm conditions.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="recommend-btn"
            >
              Get AI Recommendation <IconArrow />
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default FarmerForm;