import { getBestVariety, getRankedVarieties } from "./varietyData";
import {
  IconLeaf,
  IconArrowLeft,
  IconSparkle,
  IconGrain,
  IconCheck,
  IconCalendar,
  IconDrop,
  IconPin,
  IconClock,
  IconChart,
  IconArrow,
} from "./Icons";
import "./Recommendation.css";

function Recommendation({ farmData, onBack }) {

  const recommendedVariety = getBestVariety(farmData);

  const rankedVarieties = getRankedVarieties(farmData);

  const otherVarieties = rankedVarieties
    .filter((item) => item.id !== recommendedVariety.id)
    .slice(0, 3);


  return (
    <div className="recommendation-page">

      {/* Header */}
      <header className="result-header">

        <div className="result-logo">
          <span className="header-logo-icon">
            <IconLeaf />
          </span>
          CropGen <b>AI</b>
        </div>

        <button
          className="back-result-btn"
          onClick={onBack}
        >
          <IconArrowLeft /> Edit Farm Data
        </button>

      </header>


      <main className="result-container">

        {/* Intro */}
        <div className="result-intro">

          <span><IconSparkle /> AI analysis complete</span>

          <h1>
            Your <em>Crop Recommendation</em>
          </h1>

          <p>
            Based on your farm conditions, CropGen AI has identified
            the most suitable crop and variety for your field.
          </p>

        </div>


        {/* Main Recommendation */}
        <div className="main-result-card">

          <div className="recommendation-label">
            Top recommendation
          </div>

          <div className="crop-main">

            <div className="big-crop-icon">
              <IconGrain />
            </div>

            <div className="crop-main-info">

              <span>Recommended Crop</span>

              <h2>
                {recommendedVariety.crop}
              </h2>

              <p>
                Best matched variety for your conditions
              </p>

            </div>


            <div className="match-score">

              <div>
                {recommendedVariety.score}%
              </div>

              <span>Suitability</span>

            </div>

          </div>


          {/* Recommended Variety */}
          <div className="recommended-variety">

            <div>

              <span>Recommended variety</span>

              <h3>
                {recommendedVariety.variety}
              </h3>

            </div>

            <div className="verified">
              <IconCheck /> Verified Data
            </div>

          </div>

        </div>


        {/* Why We Recommend */}
        <section className="why-section">

          <div className="section-heading-result">

            <span>AI explanation</span>

            <h2>
              Why we recommend this
            </h2>

          </div>


          <div className="reason-grid">


            {/* Season */}
            <div className="reason-card">

              <div className="reason-icon"><IconCalendar /></div>

              <h3>Season Match</h3>

              <p>
                Your selected <strong>{farmData.season}</strong> season
                matches the growing season of this variety.
              </p>

            </div>


            {/* Water */}
            <div className="reason-card">

              <div className="reason-icon"><IconDrop /></div>

              <h3>Water Suitable</h3>

              <p>
                Your water availability is{" "}
                <strong>{farmData.water}</strong>.
                This variety requires {recommendedVariety.water}.
              </p>

            </div>


            {/* Location */}
            <div className="reason-card">

              <div className="reason-icon"><IconPin /></div>

              <h3>Location Match</h3>

              <p>
                {recommendedVariety.variety} is adapted to{" "}
                <strong>{recommendedVariety.region}</strong>.
              </p>

            </div>


            {/* Maturity */}
            <div className="reason-card">

              <div className="reason-icon"><IconClock /></div>

              <h3>Growing Duration</h3>

              <p>
                Expected maturity is approximately{" "}
                <strong>
                  {recommendedVariety.growingDays} days
                </strong>.
              </p>

            </div>

          </div>

        </section>


        {/* Other Suitable Varieties */}
        <section className="insights-section">

          <div className="section-heading-result">

            <span>Alternative options</span>

            <h2>
              Other Suitable Varieties []
            </h2>

          </div>


          <div className="insights-grid">

            {otherVarieties.map((item) => (

              <div
                className="insight-box"
                key={item.id}
              >

                <span><IconGrain /> {item.variety}</span>

                <strong>
                  {item.score}% Match
                </strong>

              </div>

            ))}

          </div>

        </section>


        {/* Farm Insights */}
        <section className="insights-section">

          <div className="section-heading-result">

            <span>Farm insights</span>

            <h2>
              Recommended variety profile
            </h2>

          </div>


          <div className="insights-grid">

            <div className="insight-box">

              <span><IconDrop /> Water Requirement</span>

              <strong>
                {recommendedVariety.water}
              </strong>

            </div>


            <div className="insight-box">

              <span><IconClock /> Growing Duration</span>

              <strong>
                {recommendedVariety.growingDays} Days
              </strong>

            </div>


            <div className="insight-box">

              <span><IconPin /> Region</span>

              <strong>
                {recommendedVariety.region}
              </strong>

            </div>


            <div className="insight-box">

              <span><IconGrain /> Yield Potential</span>

              <strong>
                {recommendedVariety.yieldPotential} kg/ha
              </strong>

            </div>

          </div>

        </section>


        {/* Smart Farm Plan */}
        <section className="plan-section">

          <div className="section-heading-result">

            <span>Smart farm plan</span>

            <h2>
              Your farming journey
            </h2>

          </div>


          <div className="timeline">


            <div className="timeline-item">

              <div className="timeline-number">
                01
              </div>

              <div>

                <h3>
                  Land Preparation
                </h3>

                <p>
                  Prepare the field according to recommended
                  farming practices.
                </p>

              </div>

            </div>


            <div className="timeline-item">

              <div className="timeline-number">
                02
              </div>

              <div>

                <h3>
                  Sowing
                </h3>

                <p>
                  Follow the recommended sowing period for
                  {` ${recommendedVariety.variety}`}.
                </p>

              </div>

            </div>


            <div className="timeline-item">

              <div className="timeline-number">
                03
              </div>

              <div>

                <h3>
                  Crop Growth
                </h3>

                <p>
                  Monitor soil moisture, nutrition and
                  environmental conditions.
                </p>

              </div>

            </div>


            <div className="timeline-item">

              <div className="timeline-number">
                04
              </div>

              <div>

                <h3>
                  Harvest
                </h3>

                <p>
                  Expected maturity is around{" "}
                  <strong>
                    {recommendedVariety.growingDays} days
                  </strong>.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* Profit */}
        <section className="profit-card">

          <div>

            <span><IconChart /> Estimated farm insight</span>

            <h2>
              Yield Potential
            </h2>

            <p>
              Based on the verified variety data available in
              CropGen AI.
            </p>

          </div>


          <div className="profit-value">

            <small>
              Potential Yield
            </small>

            <strong>
              {recommendedVariety.yieldPotential} kg/ha
            </strong>

          </div>

        </section>


        {/* Bottom CTA */}
        <div className="result-actions">

          <button
            className="secondary-result-btn"
            onClick={onBack}
          >
            <IconArrowLeft /> Try Another Farm
          </button>

          <button className="primary-result-btn">
            Save My Recommendation <IconArrow />
          </button>

        </div>

      </main>

    </div>
  );
}

export default Recommendation;