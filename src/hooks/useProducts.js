import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../services/catalogService.js";

/**
 * Loads the catalogue and exposes the three states every data screen needs:
 * loading, error and data. `reload` lets the user retry after a failure.
 */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setIsLoading(true);
    setError("");

    fetchProducts()
      .then((data) => setProducts(data))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, isLoading, error, reload: load };
}
