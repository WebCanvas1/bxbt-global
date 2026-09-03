import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import Portal from "@/components/Portal";

const pollutionImage =
  "https://images.pexels.com/photos/15060366/pexels-photo-15060366.jpeg?auto=compress&cs=tinysrgb&h=1400&w=2400";
const cleanImage =
  "https://images.pexels.com/photos/4604963/pexels-photo-4604963.jpeg?auto=compress&cs=tinysrgb&h=1400&w=2400";

function App() {
  const [portalOpen, setPortalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = portalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [portalOpen]);

  return (
    <main>
      {/* Split before/after background */}
      <div className="bg-stack" aria-hidden="true">
        <img className="bg-polluted" src={pollutionImage} alt="" />
        <img className="bg-clean" src={cleanImage} alt="" />
        <div className="bg-overlay" />
      </div>

      {/* Minimal header */}
      <header className="site-header">
        <BrandMark />
      </header>

      {/* One composed landing page */}
      <section className="landing" aria-label="BXB Technologies">
        <div className="landing-headlines">
          <div className="problem-block">
            <p className="eyebrow light">
              <span className="eyebrow-line" /> The challenge
            </p>
            <h1>
              Our Communities
              <br />
              <em>have a waste problem.</em>
            </h1>
            <div className="desktop-convert">
              <div className="convert-block">
                <p className="convert-label">We Convert:</p>
                <p className="convert-text">
                  Tyres, Mattresses and Mixed Plastics Into Energy.
                </p>
              </div>
            </div>
          </div>
          <div className="solution-block">
            <p className="eyebrow light">
              <span className="eyebrow-line" /> The response
            </p>
            <h2>
              BXB Technologies
              <br />
              <span>have a solution.</span>
            </h2>
            <p className="wte-label">WTE and Zero-CO₂ Innovations</p>
            <div className="desktop-convert">
              <div className="convert-block">
                <p className="convert-label">We Convert:</p>
                <p className="convert-text">
                  CO<sub>2</sub> Into Biodiesel.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="landing-convert mobile-convert">
          <div className="convert-block">
            <p className="convert-label">We Convert:</p>
            <p className="convert-text">
              Tyres, Mattresses and Mixed Plastics Into Energy.
            </p>
          </div>
          <div className="convert-divider" />
          <div className="convert-block">
            <p className="convert-label">We Convert:</p>
            <p className="convert-text">
              CO<sub>2</sub> Into Biodiesel.
            </p>
          </div>
        </div>

        <div className="landing-cta">
          <button className="primary-button" onClick={() => setPortalOpen(true)}>
            LET'S TALK <ArrowUpRight size={20} />
          </button>
        </div>
      </section>

      {portalOpen && <Portal onClose={() => setPortalOpen(false)} />}
    </main>
  );
}

export default App;
