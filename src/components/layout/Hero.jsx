import counterImage from "../../assets/pharmacy-counter.jpg";
import { CATEGORIES } from "../../data/products.js";

const QUICK_CATEGORIES = ["Pain and fever", "Malaria", "Cold and allergy", "Mother and baby"];

/**
 * The opening panel. The search box is the first thing a customer sees,
 * because the main job of the site is to find a medicine quickly.
 */
const Hero = ({ search, category, onSearchChange, onCategoryChange }) => (
  <section className="hero">
    <div className="hero-content">
      <p className="hero-kicker">Open 7am to 10pm, seven days a week</p>
      <h1>
        Your pharmacy counter,
        <br />
        now at your door in Kigali.
      </h1>
      <p className="hero-lead">
        Search for a medicine, add it to your cart and a licensed pharmacist checks the order
        before a rider brings it to you the same day.
      </p>

      <div className="hero-search">
        <label htmlFor="hero-search-input">Search the shelf</label>
        <div className="hero-search-row">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="6" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </g>
          </svg>
          <input
            id="hero-search-input"
            type="search"
            value={search}
            placeholder="Paracetamol, malaria test, bed net..."
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>

      <div className="hero-chips">
        {QUICK_CATEGORIES.filter((item) => CATEGORIES.includes(item)).map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${category === item ? "chip--active" : ""}`}
            onClick={() => onCategoryChange(category === item ? "all" : item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    <figure className="hero-figure">
      <img src={counterImage} alt="Shelves of medicine inside the Isuzume Pharma dispensary" />
      <figcaption>
        <span>Every order is checked by a pharmacist registered with the Rwanda FDA.</span>
      </figcaption>
    </figure>
  </section>
);

export default Hero;
