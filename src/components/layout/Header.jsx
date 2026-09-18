import CartButton from "./CartButton.jsx";

const Header = ({ onOpenCart }) => (
  <header className="site-header">
    <a className="brand" href="#catalogue">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-text">
        <strong>Isuzume Pharma</strong>
        <small>Licensed pharmacy &middot; Kigali</small>
      </span>
    </a>

    <nav className="site-nav" aria-label="Main">
      <a href="#catalogue">Medicines</a>
      <a href="#how-it-works">How it works</a>
      <a href="#contact">Contact</a>
    </nav>

    <CartButton onClick={onOpenCart} />
  </header>
);

export default Header;
