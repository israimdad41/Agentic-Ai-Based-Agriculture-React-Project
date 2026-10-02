import "./VarietyDetails.css";

function VarietyDetails({ variety, onBack }) {

  const details = {
    "IV-2": {
      description:
        "A medium-maturing wheat variety adapted for whole Sindh.",
      maturity: "120–125 days",
      sowing: "7 November – 10 December",
      yield: "6919 kg/ha potential",
      water: "5–6 irrigations",
      region: "Whole Sindh",
      quality: "Good chapati and bread quality",
      resistance:
        "Stem rust, leaf rust, stripe rust, loose smut and Karnal bunt resistant.",
      parentage: "WHEAR/KRONSTAD F2004",
      status: "Released",
      highlights: [
        "Whole Sindh adaptability",
        "Good chapati quality",
        "Good bread quality",
        "Rust resistant",
      ],
    },

    "IV-3": {
      description:
        "A high-yielding wheat variety with good adaptability across Sindh.",
      maturity: "125–127 days",
      sowing: "10 November – 10 December",
      yield: "7413 kg/ha potential",
      water: "5–6 irrigations",
      region: "Whole Sindh including Dubari",
      quality: "Good baking and bread quality",
      resistance: "Leaf rust resistant",
      parentage: "Research Centre documented variety",
      status: "Candidate",
      highlights: [
        "High yield potential",
        "Whole Sindh adaptability",
        "Leaf rust resistance",
        "Good baking quality",
      ],
    },

    "MPT-14": {
      description:
        "A high-yielding wheat candidate with good grain quality and broad adaptability.",
      maturity: "124 days",
      sowing: "10 November – 10 December",
      yield: "6919 kg/ha potential",
      water: "5–6 normal / 4–5 late",
      region: "Whole Sindh and Dubari",
      quality: "Good grain quality",
      resistance:
        "Resistant to major rust diseases; medium drought and salinity tolerance.",
      parentage: "BAJ#1/3/KIRITATI//ATTILA*2/PASTOR",
      status: "Candidate",
      highlights: [
        "Good grain quality",
        "Whole Sindh adaptability",
        "Suitable for Dubari",
        "Drought and salinity tolerance",
      ],
    },

    "E-107": {
      description:
        "An early-maturing wheat line suitable for normal and late sowing across Sindh.",
      maturity: "118 days",
      sowing: "10 November – 10 December",
      yield: "6919 kg/ha potential",
      water: "5 normal / 4 late",
      region: "Whole Sindh and Dubari",
      quality: "Good chapati and bread quality",
      resistance:
        "Stem rust, leaf rust, stripe rust, loose smut and Karnal bunt resistant.",
      parentage: "BORL14//BECARD/QUAIU #1",
      status: "Candidate",
      highlights: [
        "Early maturity",
        "Whole Sindh adaptability",
        "Good chapati quality",
        "Disease resistance",
      ],
    },
  };

  const info = details[variety?.variety] || {};

  return (
    <div className="details-page">

      {/* HEADER */}
      <header className="details-header">

        <button
          className="details-back"
          onClick={onBack}
        >
          ← Back to Varieties
        </button>

        <div className="details-logo">
          🌱 CropGen <b>AI</b>
        </div>

      </header>


      <main className="details-container">

        {/* HERO */}
        <section className="details-hero">

          <div className="details-image">

            {variety?.image ? (
              <img
                src={variety.image}
                alt={`${variety.variety} wheat variety`}
              />
            ) : (
              <span>🌾</span>
            )}

            <div className="image-overlay">
              ✓ Verified
            </div>

          </div>


          <div className="details-title">

            <div className="details-kicker">
              VARIETY PROFILE
            </div>

            <h1>
              {variety?.variety}
            </h1>

            <div className="status-badge">
              {info.status}
            </div>

            <p>
              {info.description}
            </p>


            <div className="detail-tags">

              <span>🌾 Wheat</span>

              <span>📍 {info.region}</span>

              <span>📅 Rabi</span>

            </div>

          </div>

        </section>


        {/* KEY INFORMATION */}
        <section className="detail-section">

          <div className="detail-section-heading">

            <span>
              KEY INFORMATION
            </span>

            <h2>
              Variety Overview
            </h2>

          </div>


          <div className="detail-grid">

            <div className="detail-card">
              <span>⏱️</span>

              <small>
                Maturity
              </small>

              <strong>
                {info.maturity}
              </strong>
            </div>


            <div className="detail-card">
              <span>🌾</span>

              <small>
                Yield Potential
              </small>

              <strong>
                {info.yield}
              </strong>
            </div>


            <div className="detail-card">
              <span>💧</span>

              <small>
                Water Requirement
              </small>

              <strong>
                {info.water}
              </strong>
            </div>


            <div className="detail-card">
              <span>📅</span>

              <small>
                Sowing Period
              </small>

              <strong>
                {info.sowing}
              </strong>
            </div>

          </div>

        </section>


        {/* HIGHLIGHTS */}
        <section className="detail-section">

          <div className="detail-section-heading">

            <span>
              VARIETY HIGHLIGHTS
            </span>

            <h2>
              Why farmers may consider it
            </h2>

          </div>


          <div className="highlights-grid">

            {info.highlights?.map((highlight, index) => (

              <div
                className="highlight-card"
                key={index}
              >

                <span>
                  ✓
                </span>

                <p>
                  {highlight}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* DETAILED INFORMATION */}
        <section className="detail-section">

          <div className="detail-section-heading">

            <span>
              VARIETY INTELLIGENCE
            </span>

            <h2>
              Detailed Information
            </h2>

          </div>


          <div className="detail-information">

            <div>
              <h3>
                🧬 Parentage
              </h3>

              <p>
                {info.parentage}
              </p>
            </div>


            <div>
              <h3>
                🛡️ Resistance
              </h3>

              <p>
                {info.resistance}
              </p>
            </div>


            <div>
              <h3>
                🥖 Grain Quality
              </h3>

              <p>
                {info.quality}
              </p>
            </div>


            <div>
              <h3>
                📍 Adaptability
              </h3>

              <p>
                {info.region}
              </p>
            </div>

          </div>

        </section>


        {/* VERIFIED PANEL */}
        <section className="verified-detail">

          <div>

            <span>
              ✓ RESEARCH VERIFIED
            </span>

            <h2>
              Data-backed variety information
            </h2>

            <p>
              CropGen AI presents agricultural information from
              the research documents available in its variety
              knowledge base.
            </p>

          </div>


          <button
            onClick={onBack}
          >
            ← Back to Varieties
          </button>

        </section>


      </main>

    </div>
  );
}

export default VarietyDetails;