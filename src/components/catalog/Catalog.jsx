import { useEffect, useMemo, useState } from "react";
import useProducts from "../../hooks/useProducts.js";
import CatalogToolbar from "./CatalogToolbar.jsx";
import Pagination from "./Pagination.jsx";
import ProductCard from "./ProductCard.jsx";

const PAGE_SIZE = 8;

function sortProducts(list, sort) {
  const sorted = [...list];
  if (sort === "price-asc") return sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return sorted.sort((a, b) => b.price - a.price);
  return sorted.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * The shop itself: it loads the catalogue, applies the filters chosen by the
 * customer and shows one page of results at a time.
 */
const Catalog = ({ filters, onFiltersChange }) => {
  const { products, isLoading, error, reload } = useProducts();
  const [page, setPage] = useState(1);

  const visibleProducts = useMemo(() => {
    const term = filters.search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesTerm =
        term === "" ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      const matchesCategory =
        filters.category === "all" || product.category === filters.category;

      const matchesPrescription = !filters.prescriptionOnly || product.prescription;

      return matchesTerm && matchesCategory && matchesPrescription;
    });

    return sortProducts(filtered, filters.sort);
  }, [products, filters]);

  // Whenever the filters change, start again at the first page.
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = visibleProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="catalogue" id="catalogue">
      <div className="catalogue-head">
        <h2>On the shelf today</h2>
        <p>{products.length} products dispensed from our Kimironko branch.</p>
      </div>

      <CatalogToolbar filters={filters} onChange={onFiltersChange} />

      {isLoading && (
        <div className="state state--loading" role="status">
          <span className="spinner" aria-hidden="true" />
          <p>Loading the catalogue...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="state state--error" role="alert">
          <p>{error}</p>
          <button type="button" className="button" onClick={reload}>
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && visibleProducts.length === 0 && (
        <div className="state state--empty">
          <p>No product matches your search.</p>
          <button
            type="button"
            className="button button--quiet"
            onClick={() =>
              onFiltersChange({ search: "", category: "all", prescriptionOnly: false, sort: "name" })
            }
          >
            Clear the filters
          </button>
        </div>
      )}

      {!isLoading && !error && visibleProducts.length > 0 && (
        <>
          <p className="result-count" aria-live="polite">
            Showing {pageItems.length} of {visibleProducts.length} products
          </p>

          <ul className="product-grid">
            {pageItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>

          <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setPage} />
        </>
      )}
    </section>
  );
};

export default Catalog;
