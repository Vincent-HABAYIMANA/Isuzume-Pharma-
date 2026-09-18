import { useState } from "react";
import Catalog from "./components/catalog/Catalog.jsx";
import CartPanel from "./components/cart/CartPanel.jsx";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import Hero from "./components/layout/Hero.jsx";
import HowItWorks from "./components/layout/HowItWorks.jsx";
import CartProvider from "./context/CartProvider.jsx";

const DEFAULT_FILTERS = {
  search: "",
  category: "all",
  prescriptionOnly: false,
  sort: "name"
};

const App = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="page">
        <Hero
          search={filters.search}
          category={filters.category}
          onSearchChange={(search) => setFilters((current) => ({ ...current, search }))}
          onCategoryChange={(category) => setFilters((current) => ({ ...current, category }))}
        />
        <Catalog filters={filters} onFiltersChange={setFilters} />
        <HowItWorks />
      </main>

      <Footer />

      {isCartOpen && <CartPanel onClose={() => setIsCartOpen(false)} />}
    </CartProvider>
  );
};

export default App;
