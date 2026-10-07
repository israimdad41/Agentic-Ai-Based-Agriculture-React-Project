import { useEffect, useMemo, useRef, useState } from "react";
import SindhMap from "./SindhMap";
import AIAssistant from "./AIAssistant";
import Compare from "./Compare";
import VarietyDetails from "./VarietyDetails";
import FarmerForm from "./FarmerForm";
import Login from "./Login";
import { varieties as varietyData, getBestVariety } from "./varietyData";
import { translations } from "./translations";
import {
  IconLeaf,
  IconHome,
  IconScale,
  IconChat,
  IconSparkle,
  IconGrid,
  IconCloud,
  IconChart,
  IconTarget,
  IconBell,
  IconClock,
  IconGrain,
  IconDrop,
  IconPin,
  IconSend,
} from "./Icons";
import "./App.css";

/* ============ IMAGE MAPPING ============
   Images `src/assets/cropgen/` folder mein honi chahiye:
   hero.jpg, iv2.jpg, iv3.jpg, mpt14.jpg, e107.jpg, cta.jpg
======================================== */
const imageMap = {
  hero: new URL("./assets/cropgen/hero.jpg", import.meta.url).href,
  iv2: new URL("./assets/cropgen/iv2.png", import.meta.url).href,
  iv3: new URL("./assets/cropgen/iv3.jpg", import.meta.url).href,
  mpt14: new URL("./assets/cropgen/mpt14.jpg", import.meta.url).href,
  e107: new URL("./assets/cropgen/e107.jpg", import.meta.url).href,
  cta: new URL("./assets/cropgen/cta.jpg", import.meta.url).href,
};

const badgeMap = {
  "IV-2": "Top pick",
  "IV-3": "High yield",
  "MPT-14": "Rust resistant",
  "E-107": "Adaptable",
};

const varieties = varietyData.map((item) => ({
  ...item,
  image:
    item.variety === "IV-2"
      ? imageMap.iv2
      : item.variety === "IV-3"
      ? imageMap.iv3
      : item.variety === "MPT-14"
      ? imageMap.mpt14
      : imageMap.e107,
  badge: badgeMap[item.variety] || "Verified",
}));

const formatNumber = (value) => {
  const n = Number(value);
  return n ? n.toLocaleString() : value || "-";
};

/* ============ CHAT BOT LOGIC ============ */
function getBotReply(text) {
  const q = text.toLowerCase();

  let farmData = null;
  try {
    farmData = JSON.parse(localStorage.getItem("cropgenFarmData"));
  } catch (e) {
    farmData = null;
  }

  const topYield = [...varieties].sort(
    (a, b) => Number(b.yieldPotential) - Number(a.yieldPotential)
  )[0];

  const wantsWater =
    q.includes("water") || q.includes("pani") || q.includes("irrigation");
  const wantsYield =
    q.includes("yield") || q.includes("paidawar") || q.includes("production");
  const wantsMaturity =
    q.includes("maturity") || q.includes("days") || q.includes("din");

  // Greeting
  if (
    q.includes("salam") ||
    q.includes("hello") ||
    q === "hi" ||
    q.includes("assalam")
  ) {
    return "Wa Alaikum Assalam! Aap mujh se variety, yield, pani ki zaroorat ya maturity ke bare mein pooch sakte hain.";
  }

  // Compare
  if (q.includes("compare") || q.includes("comparison") || q.includes("farq")) {
    return (
      "Chaaron varieties ka khulasa:\n" +
      varieties
        .map(
          (v) =>
            `• ${v.variety}: ${formatNumber(v.yieldPotential)} kg/ha, ${v.growingDays} din, pani ${v.water}`
        )
        .join("\n") +
      "\n\nPoori comparison ke liye sidebar mein 'Compare' kholen."
    );
  }

  // Specific variety
  const mentioned = varieties.find((v) =>
    q.includes(v.variety.toLowerCase())
  );
  if (mentioned) {
    if (wantsWater) {
      return `${mentioned.variety} ko ${mentioned.water} irrigations chahiye.`;
    }
    if (wantsYield) {
      return `${mentioned.variety} ki reported yield potential ${formatNumber(mentioned.yieldPotential)} kg/ha hai.`;
    }
    if (wantsMaturity) {
      return `${mentioned.variety} takreeban ${mentioned.growingDays} din mein pakti hai.`;
    }
    return `${mentioned.variety}: ${mentioned.region} ke liye documented hai. Maturity ${mentioned.growingDays} din, pani ${mentioned.water}, yield ${formatNumber(mentioned.yieldPotential)} kg/ha, season ${mentioned.season}.`;
  }

  // Best variety
  if (
    q.includes("best") ||
    q.includes("behtar") ||
    q.includes("kaunsi") ||
    q.includes("recommend") ||
    q.includes("suitable")
  ) {
    if (farmData) {
      const best = getBestVariety(farmData);
      return `Aapke farm data ke mutabiq ${best.variety} sab se behtar match hai (${best.score}% suitability). Yield ${formatNumber(best.yieldPotential)} kg/ha, maturity ${best.growingDays} din.`;
    }
    return `Sab se zyada yield ${topYield.variety} ki hai (${formatNumber(topYield.yieldPotential)} kg/ha). Aapke farm ke liye sahi variety jaanne ke liye pehle Smart Recommendation form bharein.`;
  }

  if (wantsWater) {
    return (
      "Pani ki zaroorat:\n" +
      varieties.map((v) => `• ${v.variety}: ${v.water}`).join("\n")
    );
  }

  if (wantsYield) {
    return (
      "Yield potential (kg/ha):\n" +
      varieties
        .map((v) => `• ${v.variety}: ${formatNumber(v.yieldPotential)}`)
        .join("\n")
    );
  }

  if (wantsMaturity) {
    return (
      "Maturity (din):\n" +
      varieties.map((v) => `• ${v.variety}: ${v.growingDays}`).join("\n")
    );
  }

  if (q.includes("season") || q.includes("rabi") || q.includes("kharif")) {
    return "Is waqt CropGen AI mein maujood saari wheat varieties Rabi season ke liye documented hain.";
  }

  return "Main in cheezon mein madad kar sakti hoon: variety ki details (jaise 'IV-3 ki yield'), best variety, pani ki zaroorat, maturity aur comparison. Apna sawal in mein se kisi par likhein.";
}

/* ============================================
   MAIN APP
============================================ */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [showCompare, setShowCompare] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [language, setLanguage] = useState("en");
  const [search, setSearch] = useState("");

  const [aiOpen, setAiOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text: "Assalam-o-Alaikum! 👋 Main CropGen AI hoon. Farming ke har sawal mein madad karungi.",
    },
    {
      from: "bot",
      text: "Main aapki madad kar sakti hoon:\n• Variety selection\n• Yield estimation\n• Irrigation planning\n• Weather tips",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const t = translations[language];

  // Naya message aane par chat neeche scroll ho
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, aiOpen]);

  /* ============ SEARCH FILTER ============ */
  const filteredVarieties = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return varieties;
    return varieties.filter((item) => item.variety.toLowerCase().includes(q));
  }, [search]);

  /* ============ FULL-PAGE VIEWS ============ */
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (showForm) {
    return <FarmerForm onBack={() => setShowForm(false)} />;
  }

  if (selectedVariety) {
    return (
      <VarietyDetails
        variety={selectedVariety}
        onBack={() => setSelectedVariety(null)}
      />
    );
  }

  if (showCompare) {
    return <Compare onBack={() => setShowCompare(false)} />;
  }

  if (showAssistant) {
    return <AIAssistant onBack={() => setShowAssistant(false)} />;
  }

  /* ============ HELPERS ============ */
  const sendMessage = (text) => {
    const clean = text.trim();
    if (!clean) return;

    setChatMessages((prev) => [...prev, { from: "user", text: clean }]);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { from: "bot", text: getBotReply(clean) },
      ]);
    }, 500);
  };

  const sendChat = () => {
    sendMessage(chatInput);
    setChatInput("");
  };

  const quickReply = (text) => sendMessage(text);

  const goTo = (e, action) => {
    e.preventDefault();
    setSidebarOpen(false);
    action();
  };

  const scrollToId = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const comingSoon = () =>
    alert("Ye feature jald aa raha hai. Abhi Smart Recommendation istemal karein.");

  const topYieldValue = Math.max(
    ...varieties.map((v) => Number(v.yieldPotential) || 0)
  );

  const compareRows = [
    { label: t.maturity, get: (v) => v.growingDays },
    { label: t.yieldPotential, get: (v) => formatNumber(v.yieldPotential) },
    { label: "Water", get: (v) => v.water },
    { label: t.season, get: (v) => v.season },
  ];

  /* ============ DASHBOARD RENDER ============ */
  return (
    <div className="app" dir={language === "en" ? "ltr" : "rtl"}>
      {sidebarOpen && (
        <div className="overlay show" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ============ SIDEBAR ============ */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <IconLeaf />
          </div>
          <div>
            <h2>
              CropGen <span>AI</span>
            </h2>
            <p>{t.tagline}</p>
          </div>
        </div>

        <nav className="nav">
          <a
            href="#home"
            className="active"
            onClick={(e) => goTo(e, () => window.scrollTo({ top: 0, behavior: "smooth" }))}
          >
            <span className="nav-icon"><IconHome /></span>
            <span>{t.home}</span>
          </a>
          <a href="#varieties" onClick={(e) => goTo(e, () => scrollToId("varieties"))}>
            <span className="nav-icon"><IconLeaf /></span>
            <span>{t.varieties}</span>
          </a>
          <a href="#compare" onClick={(e) => goTo(e, () => setShowCompare(true))}>
            <span className="nav-icon"><IconScale /></span>
            <span>{t.compare}</span>
          </a>
          <a href="#assistant" onClick={(e) => goTo(e, () => setAiOpen(true))}>
            <span className="nav-icon"><IconChat /></span>
            <span>{t.assistant}</span>
          </a>
          <a href="#recommend" onClick={(e) => goTo(e, () => setShowForm(true))}>
            <span className="nav-icon"><IconSparkle /></span>
            <span>{t.recommendation}</span>
          </a>
          <a href="#farm-plan" onClick={(e) => goTo(e, () => setShowForm(true))}>
            <span className="nav-icon"><IconGrid /></span>
            <span>{t.farmPlan}</span>
          </a>
          <a href="#weather" onClick={(e) => goTo(e, comingSoon)}>
            <span className="nav-icon"><IconCloud /></span>
            <span>{t.weather}</span>
          </a>
          <a href="#profit" onClick={(e) => goTo(e, comingSoon)}>
            <span className="nav-icon"><IconChart /></span>
            <span>{t.profit}</span>
          </a>
          <a href="#map" onClick={(e) => goTo(e, () => scrollToId("map"))}>
            <span className="nav-icon">🗺️</span>
            <span>Sindh Variety Map</span>
          </a>
          <a href="#my-farm" onClick={(e) => goTo(e, () => setShowForm(true))}>
            <span className="nav-icon"><IconTarget /></span>
            <span>{t.myFarm}</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <strong>Better Farming with AI</strong>
          <p>Get tailored variety recommendations for your region.</p>
        </div>
      </aside>

      {/* ============ MAIN ============ */}
      <div className="main">
        <header className="topbar">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Menu"
          >
            ☰
          </button>

          <div className="page-title">
            Dashboard <span>Welcome, Isra</span>
          </div>

          <div className="topbar-right">
            <select
              className="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="ur">UR</option>
              <option value="sd">SD</option>
            </select>

            <button className="icon-btn" aria-label="Notifications">
              <IconBell />
            </button>

            <div className="avatar">I</div>
          </div>
        </header>

        <div className="content">
          {/* ============ HERO ============ */}
          <section
            className="hero"
            style={{
              backgroundImage: `linear-gradient(100deg, rgba(6,26,18,.96), rgba(6,26,18,.75) 55%, rgba(6,26,18,.25)), url(${imageMap.hero})`,
            }}
          >
            <h1>
              Smarter Choices.
              <br />
              Better Harvests.
            </h1>
            <p>
              Discover the right wheat variety for your farm using AI-powered
              insights, regional data and real yield analysis.
            </p>
            <div className="search">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a variety e.g. IV-3, MPT-14, E-107"
              />
              <button
                onClick={() => (search ? setSearch("") : scrollToId("varieties"))}
              >
                {search ? "Clear" : "Search"}
              </button>
            </div>
          </section>

          {/* ============ STATS ============ */}
          <div className="stats">
            <div className="stat">
              <div className="stat-icon">🌾</div>
              <div>
                <strong>{varieties.length}</strong>
                <span>Wheat Varieties</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon">📈</div>
              <div>
                <strong>{topYieldValue.toLocaleString()}</strong>
                <span>Top Yield (kg/ha)</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon">📍</div>
              <div>
                <strong>Sindh</strong>
                <span>Coverage Region</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon">🌱</div>
              <div>
                <strong>Rabi</strong>
                <span>Active Season</span>
              </div>
            </div>
          </div>

          {/* ============ FEATURED VARIETIES ============ */}
          <div className="section-head" id="varieties">
            <div>
              <span className="label">{t.ourData}</span>
              <h2>{t.featured}</h2>
            </div>
            <button className="view-all" onClick={() => setSearch("")}>
              {t.viewAll} →
            </button>
          </div>

          {filteredVarieties.length === 0 && (
            <p style={{ padding: "12px 4px", color: "#6d7b73" }}>
              "{search}" naam ki koi variety nahi mili. Try karein: IV-2, IV-3,
              MPT-14 ya E-107.
            </p>
          )}

          <div className="variety-grid">
            {filteredVarieties.map((item) => (
              <article className="card" key={item.id}>
                <div
                  className="card-img"
                  style={{ background: "linear-gradient(135deg,#2f6540,#d1ad69)" }}
                >
                  <img
                    src={item.image}
                    alt={item.variety}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="badge">{item.badge}</span>
                  <span className="pill">{item.variety}</span>
                </div>
                <div className="card-body">
                  <div className="info">
                    <div className="info-row">
                      <span className="ic"><IconClock /></span>
                      <span className="k">{t.maturity}</span>
                      <span className="v">{item.growingDays} days</span>
                    </div>
                    <div className="info-row">
                      <span className="ic"><IconGrain /></span>
                      <span className="k">{t.yieldPotential}</span>
                      <span className="v">{formatNumber(item.yieldPotential)} kg/ha</span>
                    </div>
                    <div className="info-row">
                      <span className="ic"><IconDrop /></span>
                      <span className="k">Water</span>
                      <span className="v">{item.water}</span>
                    </div>
                    <div className="info-row">
                      <span className="ic"><IconPin /></span>
                      <span className="k">{t.region}</span>
                      <span className="v">{item.region}</span>
                    </div>
                    <div className="info-row">
                      <span className="ic"><IconLeaf /></span>
                      <span className="k">{t.season}</span>
                      <span className="v">{item.season}</span>
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => setSelectedVariety(item)}
                  >
                    {t.viewDetails} →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* ============ COMPARE ============ */}
          <div className="section-head">
            <div>
              <span className="label">Variety Intelligence</span>
              <h2>{t.compareTitle}</h2>
            </div>
            <button className="view-all" onClick={() => setShowCompare(true)}>
              {t.fullComparison} →
            </button>
          </div>

          <div className="compare-table">
            <div className="row head">
              <span>Feature</span>
              {varieties.map((v) => (
                <span key={v.id}>{v.variety}</span>
              ))}
            </div>
            {compareRows.map((row) => (
              <div className="row" key={row.label}>
                <span>{row.label}</span>
                {varieties.map((v) => (
                  <span key={v.id}>{row.get(v)}</span>
                ))}
              </div>
            ))}
          </div>

          {/* ============ SINDH MAP ============ */}
          <div className="section-head" id="map">
            <div>
              <span className="label">Regional Data</span>
              <h2>Sindh Variety Map</h2>
            </div>
          </div>
          <section className="panel">
            <SindhMap />
          </section>

          {/* ============ CTA ============ */}
          <section
            className="cta"
            style={{
              backgroundImage: `linear-gradient(100deg, rgba(7,32,22,0.98), rgba(11,49,33,0.92)), url(${imageMap.cta})`,
            }}
          >
            <div className="cta-left">
              <div className="cta-icon"><IconSparkle /></div>
              <div>
                <strong>Grow smarter with CropGen AI</strong>
                <p>Right variety + right time + better yield = more profit</p>
              </div>
            </div>
            <button onClick={() => setShowForm(true)}>
              {t.personalizedRecommendation} →
            </button>
          </section>

          <footer>© 2026 CropGen AI · {t.footer}</footer>
        </div>
      </div>

      {/* ============ BOTTOM NAV (Mobile) ============ */}
      <nav className="bottom-nav">
        <a
          href="#home"
          className="active"
          onClick={(e) => goTo(e, () => window.scrollTo({ top: 0, behavior: "smooth" }))}
        >
          <span className="bn-icon">🏠</span>Home
        </a>
        <a href="#varieties" onClick={(e) => goTo(e, () => scrollToId("varieties"))}>
          <span className="bn-icon">🌾</span>Varieties
        </a>
        <a href="#compare" onClick={(e) => goTo(e, () => setShowCompare(true))}>
          <span className="bn-icon">⚖️</span>Compare
        </a>
        <a href="#farm" onClick={(e) => goTo(e, () => setShowForm(true))}>
          <span className="bn-icon">🎯</span>Farm
        </a>
      </nav>

      {/* ============ AI FAB BUTTON ============ */}
      <button
        className="ai-fab"
        onClick={() => setAiOpen(!aiOpen)}
        aria-label="Open AI Assistant"
      >
        <IconChat />
      </button>

      {/* ============ AI POPUP CHAT ============ */}
      <div className={`ai-popup ${aiOpen ? "open" : ""}`}>
        <div className="ai-popup-head">
          <div className="avatar-ai"><IconLeaf /></div>
          <div className="info-head">
            <strong>CropGen AI</strong>
            <small>Online · Ready to help</small>
          </div>
          <button
            className="close-btn"
            onClick={() => setAiOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="ai-popup-body">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`msg ${msg.from}`}>
              <div className="msg-avatar">
                {msg.from === "bot" ? <IconLeaf /> : "I"}
              </div>
              <div className="msg-bubble" style={{ whiteSpace: "pre-line" }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="quick-replies">
          <button onClick={() => quickReply("Best variety for my farm?")}>
            Best variety
          </button>
          <button onClick={() => quickReply("Compare varieties")}>
            Compare
          </button>
          <button onClick={() => quickReply("Water requirement?")}>
            Water needs
          </button>
        </div>

        <div className="ai-popup-input">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendChat()}
            placeholder="Apna sawal likhein..."
          />
          <button className="send-btn" onClick={sendChat}>
            <IconSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;