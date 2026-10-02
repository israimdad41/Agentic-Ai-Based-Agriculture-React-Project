import { useState } from "react";
import { varieties } from "./varietyData";
import {
  IconLeaf,
  IconArrowLeft,
  IconChat,
  IconUser,
  IconSend,
} from "./Icons";
import "./AIAssistant.css";

function AIAssistant({ onBack }) {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  // Get latest farm data
  const getFarmData = () => {
    try {
      const savedData = localStorage.getItem("cropgenFarmData");

      if (!savedData) return null;

      return JSON.parse(savedData);
    } catch (error) {
      return null;
    }
  };


  // --------------------------------
  // Find best variety for current farm
  // --------------------------------
  const getFarmRecommendation = (farmData) => {

    if (!farmData) return null;

    const ranked = varieties.map((variety) => {

      let score = 0;


      // Season
      if (
        farmData.season &&
        variety.season &&
        farmData.season.toLowerCase() ===
          variety.season.toLowerCase()
      ) {
        score += 30;
      }


      // Water
      if (farmData.water === "High") {
        score += 20;
      }

      if (farmData.water === "Medium") {
        score += 17;
      }

      if (farmData.water === "Low") {
        if (
          variety.water.includes("4-5") ||
          variety.water.includes("late")
        ) {
          score += 15;
        } else {
          score += 8;
        }
      }


      // Location
      const location =
        farmData.location?.toLowerCase() || "";

      const region =
        variety.region?.toLowerCase() || "";

      if (
        location.includes("sindh") &&
        region.includes("sindh")
      ) {
        score += 20;
      } else if (region.includes("sindh")) {
        score += 15;
      }


      // Yield
      const maxYield = Math.max(
        ...varieties.map(
          (v) => Number(v.yieldPotential) || 0
        )
      );

      const yieldValue =
        Number(variety.yieldPotential) || 0;

      if (maxYield > 0) {
        score +=
          (yieldValue / maxYield) * 15;
      }


      return {
        ...variety,
        score,
      };
    });


    return ranked.sort(
      (a, b) => b.score - a.score
    )[0];
  };


  // --------------------------------
  // AI Answer
  // --------------------------------
  const answerQuestion = (text) => {

    const q = text.toLowerCase();

    const farmData = getFarmData();

    let answer =
      "I can help you with CropGen AI varieties, farming decisions, water requirements, maturity, yield and your farm conditions.";


    // --------------------------------
    // No farm data
    // --------------------------------
    if (!farmData) {

      answer =
        "I don't have your farm data yet. Please complete Smart Recommendation first so I can give you farm-aware advice based on your soil, water, season and location.";

    } else {

      const best = getFarmRecommendation(farmData);


      // --------------------------------
      // FARM SUMMARY
      // --------------------------------
      if (
        q.includes("my farm") ||
        q.includes("farm data") ||
        q.includes("my conditions") ||
        q.includes("my soil")
      ) {

        answer =
          `Based on your saved farm data, your farm is in ${farmData.location || "your selected location"}, with ${farmData.landArea || "unknown"} acres of land. Your soil is ${farmData.soilType || "not specified"} with a pH of ${farmData.soilPH || "not specified"}. You have ${farmData.water || "unknown"} water availability and selected ${farmData.season || "unknown"} season.`;

      }


      // --------------------------------
      // BEST VARIETY
      // --------------------------------
      else if (
        q.includes("best variety") ||
        q.includes("which variety") ||
        q.includes("recommend") ||
        q.includes("suitable")
      ) {

        answer =
          `Based on your current farm conditions — ${farmData.season || "season not specified"} season, ${farmData.water || "water availability not specified"} water availability and ${farmData.location || "location not specified"} — ${best.variety} is currently the strongest documented match in CropGen AI. Its reported yield potential is ${best.yieldPotential} kg/ha and its growing duration is around ${best.growingDays} days.`;

      }


      // --------------------------------
      // WATER
      // --------------------------------
      else if (
        q.includes("water") ||
        q.includes("irrigation") ||
        q.includes("pani")
      ) {

        answer =
          `Your farm currently has ${farmData.water || "unspecified"} water availability. ${best.variety} is documented with a water requirement of ${best.water}. Water management should be planned according to the crop stage and local agricultural recommendations.`;

      }


      // --------------------------------
      // SOIL
      // --------------------------------
      else if (
        q.includes("soil") ||
        q.includes("mitti")
      ) {

        answer =
          `Your selected soil type is ${farmData.soilType || "not specified"} and your recorded soil pH is ${farmData.soilPH || "not specified"}. CropGen AI has this information available for your farm. However, the current variety dataset does not contain complete soil-type and pH ranges for each variety, so I won't make an unsupported scientific claim about soil suitability.`;

      }


      // --------------------------------
      // LOCATION
      // --------------------------------
      else if (
        q.includes("location") ||
        q.includes("area") ||
        q.includes("region") ||
        q.includes("where")
      ) {

        answer =
          `Your farm location is recorded as ${farmData.location || "not specified"}. The current CropGen AI variety dataset documents these wheat varieties for ${best.region}.`;

      }


      // --------------------------------
      // SEASON
      // --------------------------------
      else if (
        q.includes("season") ||
        q.includes("rabi") ||
        q.includes("kharif")
      ) {

        answer =
          `You selected ${farmData.season || "an unspecified"} season. The current documented varieties in CropGen AI are listed for the Rabi season.`;

      }


      // --------------------------------
      // YIELD
      // --------------------------------
      else if (
        q.includes("yield") ||
        q.includes("production") ||
        q.includes("paida")
      ) {

        answer =
          `${best.variety} has a reported yield potential of ${best.yieldPotential} kg/ha in the current CropGen AI dataset. Your farm area is ${farmData.landArea || "not specified"} acres. Yield potential is not a guaranteed actual harvest and depends on management and field conditions.`;

      }


      // --------------------------------
      // MATURITY
      // --------------------------------
      else if (
        q.includes("maturity") ||
        q.includes("mature") ||
        q.includes("days") ||
        q.includes("kitne din")
      ) {

        answer =
          `${best.variety} has a documented growing duration of approximately ${best.growingDays} days.`;

      }


      // --------------------------------
      // TEMPERATURE
      // --------------------------------
      else if (
        q.includes("temperature") ||
        q.includes("temperature")
      ) {

        answer =
          `Your recorded average temperature is ${farmData.temperature || "not specified"}°C. The current variety dataset does not contain complete temperature ranges for these varieties, so I won't invent a temperature suitability claim.`;

      }


      // --------------------------------
      // RAINFALL
      // --------------------------------
      else if (
        q.includes("rain") ||
        q.includes("rainfall") ||
        q.includes("barish")
      ) {

        answer =
          `Your recorded average rainfall is ${farmData.rainfall || "not specified"} mm. The current variety dataset does not contain complete rainfall ranges, so this information is currently treated as farm context rather than a direct variety-scoring factor.`;

      }


      // --------------------------------
      // NPK
      // --------------------------------
      else if (
        q.includes("nitrogen") ||
        q.includes("phosphorus") ||
        q.includes("potassium") ||
        q.includes("npk")
      ) {

        answer =
          `Your recorded soil nutrients are N: ${farmData.nitrogen || "not specified"}, P: ${farmData.phosphorus || "not specified"}, and K: ${farmData.potassium || "not specified"}. CropGen AI can use these values as farm information, but the current variety dataset does not provide variety-specific NPK ranges.`;

      }


      // --------------------------------
      // SPECIFIC VARIETY
      // --------------------------------
      else {

        const variety = varieties.find((item) =>
          q.includes(
            item.variety.toLowerCase()
          )
        );


        if (variety) {

          answer =
            `${variety.variety} is a wheat variety documented for ${variety.region}. Its growing duration is around ${variety.growingDays} days, water requirement is ${variety.water}, and reported yield potential is ${variety.yieldPotential} kg/ha.`;

        } else {

          answer =
            `For your farm in ${farmData.location || "the selected location"}, with ${farmData.water || "unspecified"} water availability and ${farmData.season || "unspecified"} season, CropGen AI currently identifies ${best.variety} as the strongest documented match. You can ask me about its yield, maturity, water requirement or suitability.`;

        }
      }
    }


    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
      },
      {
        type: "ai",
        text: answer,
      },
    ]);

    setQuestion("");
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!question.trim()) return;

    answerQuestion(question);
  };


  const suggestedQuestions = [
    "Which variety is best for my farm?",
    "What does my farm data say?",
    "Is my water availability suitable?",
    "What is the expected yield?",
  ];


  return (
    <div className="assistant-page">

      <header className="assistant-header">

        <button
          className="back-btn"
          onClick={onBack}
        >
          <IconArrowLeft /> Back
        </button>


        <div className="assistant-header-logo">

          <span className="header-logo-icon">
            <IconLeaf />
          </span>

          CropGen <b>AI</b>

        </div>

      </header>


      <main className="assistant-container">

        <div className="assistant-page-intro">

          <span>
            AI agriculture assistant
          </span>

          <h1>
            Ask CropGen AI
          </h1>

          <p>
            Ask questions about your farm,
            crop varieties and farming decisions.
          </p>

        </div>


        <div className="suggested-questions">

          <h3>
            Try asking
          </h3>


          <div className="suggested-grid">

            {suggestedQuestions.map((item) => (

              <button
                key={item}
                onClick={() =>
                  answerQuestion(item)
                }
              >
                {item}
              </button>

            ))}

          </div>

        </div>


        <div className="chat-box">

          {messages.length === 0 && (

            <div className="welcome-message">

              <div className="bot-icon">
                <IconChat />
              </div>

              <div>

                <h3>
                  Hello! I'm CropGen AI
                </h3>

                <p>
                  I can use your saved farm conditions
                  to give more relevant agricultural
                  guidance.
                </p>

              </div>

            </div>

          )}


          {messages.map(
            (message, index) => (

              <div
                key={index}
                className={`chat-message ${message.type}`}
              >

                <span className="message-avatar">

                  {message.type === "ai"
                    ? <IconChat />
                    : <IconUser />
                  }

                </span>


                <p>
                  {message.text}
                </p>

              </div>

            )
          )}

        </div>


        <form
          className="assistant-input"
          onSubmit={handleSubmit}
        >

          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Ask about your farm or a variety..."
          />


          <button type="submit">
            Send <IconSend />
          </button>

        </form>


        <div className="assistant-note">

          CropGen AI answers are based on your
          saved farm data and the agricultural
          variety information available in its
          knowledge base.

        </div>

      </main>

    </div>
  );
}

export default AIAssistant;