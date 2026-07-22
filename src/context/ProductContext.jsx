import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Products = createContext();

export const ProductContext = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  return (
    <Products.Provider
      value={{
        products,
        isLoading,
        error,
        toggle,
        setToggle,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </Products.Provider>
  );
};
