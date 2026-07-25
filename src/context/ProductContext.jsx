import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Auth } from "./AuthContext";

export const MyProducts = createContext();

export const ProductContext = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
        favourites
      }}
    >
      {children}
    </MyProducts.Provider>
  );
};
