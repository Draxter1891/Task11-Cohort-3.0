import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Auth } from "./AuthContext";

export const MyProducts = createContext();

export const ProductContext = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    query: "",
    category: "All",
    sort: "Featured",
  });
  const { users, setUsers, currentUser } = useContext(Auth);
  const [favourites, setFavourites] = useState(() => {
    const loggedInUser = users.find((user) => user.id === currentUser?.id);

    return loggedInUser?.favourites ?? [];
  });

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get("https://dummyjson.com/products?limit=40");
      let { products } = res.data;
      setProducts(products);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateFilters = (updates) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const clearFilters = () => {
    setFilters({ query: "", category: "All", sort: "Featured" });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    const query = filters.query.trim().toLowerCase();

    if (query) {
      result = result.filter((product) => {
        const title = product.title?.toLowerCase() ?? "";
        const description = product.description?.toLowerCase() ?? "";
        const category = product.category?.toLowerCase() ?? "";

        return (
          title.includes(query) ||
          description.includes(query) ||
          category.includes(query)
        );
      });
    }

    if (filters.category !== "All") {
      result = result.filter(
        (product) => product.category?.toLowerCase() === filters.category.toLowerCase(),
      );
    }

    if (filters.sort === "Price: Low → High") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "Price: High → Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "Top Rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === "Lowest Rated") {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [products, filters]);

  const handleAddToFavourites = (id) => {
    const clickedItem = products.find((prod) => prod.id === id);
    const itemExits = favourites.some((prod) => prod.id === id);

    const updatedFavos = itemExits
      ? favourites.filter((prod) => prod.id !== id)
      : [...favourites, clickedItem];

    setFavourites(updatedFavos);
    setUsers((prev) =>
      prev.map((user) =>
        user.id === currentUser.id
          ? { ...user, favourites: updatedFavos }
          : user,
      ),
    );
  };
  return (
    <MyProducts.Provider
      value={{
        products,
        isLoading,
        error,
        toggle,
        setToggle,
        handleAddToFavourites,
        favourites,
        filters,
        updateFilters,
        clearFilters,
        filteredProducts,
      }}
    >
      {children}
    </MyProducts.Provider>
  );
};
