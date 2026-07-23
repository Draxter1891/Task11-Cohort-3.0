import { createContext, useContext, useEffect, useState } from "react";
import { Products } from "./ProductContext";
import { Auth } from "./AuthContext";

export const MyCart = createContext();

export const CartContext = ({ children }) => {
  const { products } = useContext(Products);
  const [cartProducts, setCartProducts] = useState([]);
  const { currentUser, users, setUsers } = useContext(Auth);

  useEffect(() => {
    if (!currentUser) {
      setCartProducts([]);
      return;
    }
    const loggedInUser = users.find((elem) => elem.id === currentUser.id);

    // Nullish Coalescing if loggedInUser?.cartItems gives null/undefined retun []
    setCartProducts(loggedInUser?.cartItems ?? []);
  }, [currentUser, users]);

  const handleAddToCart = (id) => {
    console.log(id);
    const clickedProduct = products.find((elem) => elem.id === id);

    console.log(clickedProduct);
    if (!clickedProduct || !currentUser) return;

    const existingItem = cartProducts.find((elem) => elem.id === id);

    // if the item already exist then increase its quantity, if not then keep it unchanged
    const updatedCart = existingItem
      ? cartProducts.map((elem) =>
          elem.id === id ? { ...elem, quantity: elem.quantity + 1 } : elem,
        )
      : [
          ...cartProducts,
          {
            id: clickedProduct.id,
            title: clickedProduct.title,
            price: clickedProduct.price,
            thumbnail: clickedProduct.thumbnail,
            quantity: clickedProduct.minimumOrderQuantity,
          },
        ];
    setCartProducts(updatedCart);

    setUsers((prev) =>
      prev.map((user) =>
        user.id === currentUser.id ? { ...user, cartItems: updatedCart } : user,
      ),
    );
  };

  console.log(cartProducts);

  const handleIncreaseItem = (id) => {
    cartProducts.map((elem) =>
      elem.id === id ? { ...elem, quantity: elem.quantity + 1 } : elem,
    );

    setCartProducts(updatedCart);
    setUsers((prev) =>
      prev.map((user) =>
        user.id === currentUser.id ? { ...user, cartItems: updatedCart } : user,
      ),
    );
  };

  const handleDecreaseItem = (id) => {
    console.log(`decrease clicked for: id - ${id}`);
  };

  const emptyCart = () => {
    console.log("Empty cart clicked!");
    setCartProducts([]);

    setUsers((prev) =>
      prev.map((user) =>
        user.id === currentUser.id ? { ...user, cartItems: [] } : user,
      ),
    );
    console.log(users)
  };
  return (
    <MyCart.Provider
      value={{
        cartProducts,
        setCartProducts,
        handleAddToCart,
        handleIncreaseItem,
        handleDecreaseItem,
        emptyCart,
      }}
    >
      {children}
    </MyCart.Provider>
  );
};
