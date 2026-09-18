import { CATEGORIES } from "../../data/products.js";

/** Filter and sort controls above the product grid. */
const CatalogToolbar = ({ filters, onChange }) => {
  const update = (changes) => onChange({ ...filters, ...changes });

  return (
    <div className="toolbar">
      <div className="toolbar-field">
        <label htmlFor="filter-category">Category</label>
        <select
          id="filter-category"
          value={filters.category}
          onChange={(event) => update({ category: event.target.value })}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="toolbar-field">
        <label htmlFor="filter-sort">Sort by</label>
        <select
          id="filter-sort"
          value={filters.sort}
          onChange={(event) => update({ sort: event.target.value })}
        >
          <option value="name">Name, A to Z</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
        </select>
      </div>

      <label className="toolbar-toggle" htmlFor="filter-rx">
        <input
          id="filter-rx"
          type="checkbox"
          checked={filters.prescriptionOnly}
          onChange={(event) => update({ prescriptionOnly: event.target.checked })}
        />
        <span>Prescription medicines only</span>
      </label>

      {filters.search.trim() !== "" && (
        <button type="button" className="tag-clear" onClick={() => update({ search: "" })}>
          Search: {filters.search} <span aria-hidden="true">&times;</span>
          <span className="sr-only">Clear the search</span>
        </button>
      )}
    </div>
  );
};

export default CatalogToolbar;
