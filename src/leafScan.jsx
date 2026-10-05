import { useEffect, useState } from "react";
import { IconLeaf, IconArrowLeft } from "./Icons";
import "./LeafScan.css";

const MAX_MB = 5;

/* ============================================
   YAHAN ASLI MODEL / API JODNI HAI
   Abhi ye DEMO result deta hai.
============================================ */
async function analyzeLeaf(file) {
  await new Promise((r) => setTimeout(r, 1500));

  return {
    demo: true,
    disease: "Leaf Rust (sample result)",
    confidence: 0,
    severity: "Unknown",
    symptoms:
      "Pattas par narangi ya bhoore daane. Ye sirf demo text hai, asli analysis nahi.",
    treatment:
      "Asli result ke liye model connect karna hoga. Abhi kisi zarai mahir se mashwara lein.",
  };
}

function Leafscan({ onBack }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // preview ka memory saaf karein
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (e) => {
    const picked = e.target.files?.[0];
    if (!picked) return;

    setError("");
    setResult(null);

    if (!picked.type.startsWith("image/")) {
      setError("Sirf image file select karein (JPG ya PNG).");
      return;
    }
    if (picked.size > MAX_MB * 1024 * 1024) {
      setError(`Image ${MAX_MB}MB se chhoti honi chahiye.`);
      return;
    }

    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const data = await analyzeLeaf(file);
      setResult(data);
    } catch (err) {
      setError("Analysis nahi ho saka. Dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
  };

  return (
    <div className="scan-page">
      <header className="scan-header">
        <button className="scan-back" onClick={onBack}>
          <IconArrowLeft /> Back
        </button>
        <div className="scan-logo">
          <span className="scan-logo-icon"><IconLeaf /></span>
          CropGen <b>AI</b>
        </div>
      </header>

      <main className="scan-container">
        <div className="scan-intro">
          <span>Leaf health check</span>
          <h1>Check your crop's leaf</h1>
          <p>
            Pattay ki saaf photo upload karein. Ek hi patta, achi roshni mein,
            aur bimari wala hissa nazar aaye.
          </p>
        </div>

        <div className="scan-grid">
          {/* UPLOAD */}
          <section className="scan-card">
            <div className="scan-drop">
              {preview ? (
                <img src={preview} alt="Selected leaf" />
              ) : (
                <div className="scan-empty">
                  <span>🍃</span>
                  <p>Abhi koi photo select nahi hui</p>
                </div>
              )}
            </div>

            <label className="scan-btn secondary">
              {preview ? "Photo badlein" : "Photo chunein / camera kholen"}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFile}
                hidden
              />
            </label>

            <button
              className="scan-btn primary"
              onClick={handleAnalyze}
              disabled={!file || loading}
            >
              {loading ? "Analyzing..." : "Check for disease"}
            </button>

            {preview && !loading && (
              <button className="scan-link" onClick={reset}>
                Clear
              </button>
            )}

            {error && <p className="scan-error">{error}</p>}
          </section>

          {/* RESULT */}
          <section className="scan-card">
            {!result && !loading && (
              <div className="scan-placeholder">
                <h3>Result yahan dikhega</h3>
                <p>
                  Photo upload karke "Check for disease" dabayen. Bimari ka
                  naam, nishaniyan aur ilaaj yahan aayega.
                </p>
                <ul>
                  <li>Photo mein sirf patta ho</li>
                  <li>Roshni achi ho, photo dhundli na ho</li>
                  <li>Bimari wala hissa close-up mein ho</li>
                </ul>
              </div>
            )}

            {loading && (
              <div className="scan-placeholder">
                <div className="scan-spinner" />
                <p>Pattay ka analysis ho raha hai...</p>
              </div>
            )}

            {result && (
              <div className="scan-result">
                {result.demo && (
                  <div className="scan-demo">
                    DEMO: ye asli result nahi hai. AI model abhi connect nahi hua.
                  </div>
                )}

                <span className="scan-label">Possible issue</span>
                <h2>{result.disease}</h2>

                <div className="scan-meta">
                  <div>
                    <small>Confidence</small>
                    <strong>
                      {result.demo ? "N/A" : `${result.confidence}%`}
                    </strong>
                  </div>
                  <div>
                    <small>Severity</small>
                    <strong>{result.severity}</strong>
                  </div>
                </div>

                <h4>Nishaniyan</h4>
                <p>{result.symptoms}</p>

                <h4>Ilaaj / ehtiyat</h4>
                <p>{result.treatment}</p>

                <p className="scan-note">
                  Ye sirf rehnumai hai. Spray ya dawai se pehle apne zarai
                  mahir ya agriculture department se confirm karein.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Leafscan;