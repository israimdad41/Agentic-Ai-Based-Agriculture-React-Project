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

const formatNumber = (value) => {
  const n = Number(value);
  return n ? n.toLocaleString() : value || "-";
};

function Compare({ onBack, onGetRecommendation }) {
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

  const limitReached = selected.length >= 3;

  const rows = [
    { label: "Maturity", get: (v) => `${v.growingDays} days` },
    { label: "Yield Potential", get: (v) => `${formatNumber(v.yieldPotential)} kg/ha` },
    { label: "Water Requirement", get: (v) => v.water || "-" },
    { label: "Region", get: (v) => v.region || "-" },
    { label: "Season", get: (v) => v.season || "-" },
  ];

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
          <span>
            <IconScale /> Variety intelligence
          </span>

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
              <p>Choose 2 or 3 varieties to compare.</p>
            </div>

            <span className="selected-count">{selected.length}/3 selected</span>
          </div>

          <div className="selector-grid">
            {varieties.map((item) => {
              const isSelected = selected.includes(item.id);
              const disabled = limitReached && !isSelected;

              return (
                <button
                  key={item.id}
                  className={`selector-card ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleVariety(item.id)}
                  disabled={disabled}
                  style={disabled ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
                >
                  <span className="selector-icon">
                    <IconGrain />
                  </span>

                  <div>
                    <strong>{item.variety}</strong>
                    <small>{item.region}</small>
                  </div>

                  <span className="check">
                    {isSelected ? <IconCheck /> : "+"}
                  </span>
                </button>
              );
            })}
          </div>

          {limitReached && (
            <p style={{ marginTop: 10, fontSize: 13, color: "#6d7b73" }}>
              Maximum 3 varieties select ho sakti hain. Naya select karne ke
              liye pehle koi ek hata dein.
            </p>
          )}
        </div>

        {/* NOT ENOUGH SELECTED */}
        {selectedVarieties.length < 2 && (
          <div
            style={{
              padding: "18px",
              borderRadius: 14,
              background: "#fff",
              border: "1px solid #dfe9e3",
              color: "#6d7b73",
              fontSize: 14,
            }}
          >
            Comparison dekhne ke liye kam az kam 2 varieties select karein.
          </div>
        )}

        {/* COMPARISON TABLE */}
        {selectedVarieties.length >= 2 && (
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {selectedVarieties.map((item) => (
                    <th key={item.id}>{item.variety}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {selectedVarieties.map((item) => (
                      <td key={item.id}>{row.get(item)}</td>
                    ))}
                  </tr>
                ))}
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

                <h2>Compare before you choose</h2>

                <p>
                  CropGen AI helps you evaluate maturity, yield potential,
                  water needs and regional adaptability before selecting a
                  variety.
                </p>
              </div>
            </div>

            <button onClick={onGetRecommendation || onBack}>
              Get AI Recommendation <IconArrow />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Compare;