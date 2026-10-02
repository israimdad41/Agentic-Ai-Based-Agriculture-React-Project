import { useState } from "react";
import { varieties } from "./varietyData";
import {
  IconLeaf,
  IconArrowLeft,
  IconScale,
  IconGrain,
  IconSparkle,
  IconArrow,
  IconCheck,
} from "./Icons";
import "./Compare.css";

function Compare({ onBack }) {
  const [selected, setSelected] = useState(
    varieties.slice(0, 2).map((item) => item.id)
  );

  const toggleVariety = (id) => {
    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, id];
    });
  };

  const selectedVarieties = varieties.filter((item) =>
    selected.includes(item.id)
  );

  return (
    <div className="compare-page">

      <header className="compare-header">
        <button className="back-btn" onClick={onBack}>
          <IconArrowLeft /> Back
        </button>

        <div className="compare-header-logo">
          <span className="header-logo-icon">
            <IconLeaf />
          </span>
          CropGen <b>AI</b>
        </div>
      </header>

      <main className="compare-container">

        <div className="compare-intro">
          <span><IconScale /> Variety intelligence</span>

          <h1>Compare Wheat Varieties</h1>

          <p>
            Select up to 3 varieties and compare their important
            agricultural characteristics side by side.
          </p>
        </div>

        {/* SELECT VARIETIES */}
        <div className="compare-selector">

          <div className="selector-header">
            <div>
              <h2>Select Varieties</h2>
              <p>
                Choose 2 or 3 varieties to compare.
              </p>
            </div>

            <span className="selected-count">
              {selected.length}/3 selected
            </span>
          </div>

          <div className="selector-grid">

            {varieties.map((item) => {

              const isSelected = selected.includes(item.id);

              return (
                <button
                  key={item.id}
                  className={`selector-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => toggleVariety(item.id)}
                >
                  <span className="selector-icon">
                    <IconGrain />
                  </span>

                  <div>
                    <strong>{item.variety}</strong>

                    <small>
                      {item.region}
                    </small>
                  </div>

                  <span className="check">
                    {isSelected ? <IconCheck /> : "+"}
                  </span>
                </button>
              );
            })}

          </div>

        </div>


        {/* COMPARISON TABLE */}
        {selectedVarieties.length >= 2 && (

          <div className="compare-table-wrapper">

            <table className="compare-table">

              <thead>

                <tr>
                  <th>Feature</th>

                  {selectedVarieties.map((item) => (
                    <th key={item.id}>
                      {item.variety}
                    </th>
                  ))}

                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>Maturity</td>

                  {selectedVarieties.map((item) => (
                    <td key={item.id}>
                      {item.growingDays} days
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Yield Potential</td>

                  {selectedVarieties.map((item) => (
                    <td key={item.id}>
                      {item.yieldPotential} kg/ha
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Water Requirement</td>

                  {selectedVarieties.map((item) => (
                    <td key={item.id}>
                      {item.water}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Region</td>

                  {selectedVarieties.map((item) => (
                    <td key={item.id}>
                      {item.region}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Season</td>

                  {selectedVarieties.map((item) => (
                    <td key={item.id}>
                      {item.season}
                    </td>
                  ))}
                </tr>

              </tbody>

            </table>

          </div>

        )}


        {/* INSIGHT */}
        {selectedVarieties.length >= 2 && (

          <div className="compare-highlight">

            <div className="highlight-text">
              <span className="highlight-icon">
                <IconSparkle />
              </span>

              <div>
                <span className="highlight-label">CropGen AI insight</span>

                <h2>
                  Compare before you choose
                </h2>

                <p>
                  CropGen AI helps you evaluate maturity, yield
                  potential, water needs and regional adaptability
                  before selecting a variety.
                </p>
              </div>
            </div>

            <button>
              Get AI Recommendation <IconArrow />
            </button>

          </div>

        )}

      </main>

    </div>
  );
}

export default Compare;