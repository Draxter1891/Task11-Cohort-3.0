import { createContext, useContext, useEffect, useState } from "react";
import { MyProducts } from "./ProductContext";
import { Auth } from "./AuthContext";
import { toast } from "react-toastify";

export const MyCart = createContext();

export const CartContext = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { products } = useContext(MyProducts);
  const [cartProducts, setCartProducts] = useState([]);
  const { currentUser, users, setUsers } = useContext(Auth);
  const [cartTotal, setCartTotal] = useState(0);

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
    const clickedProduct = products.find((elem) => elem.id === id);

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

    updateCartItems(updatedCart)
  };

  const handleIncreaseItem = (id) => {
    let currentProd = products.find((elem) => elem.id === id);
    let existingItem = cartProducts.find((elem) => elem.id === id);

    // Safety checks: if the user clicks rapidly on quantity change and UI has still not updated || if the products hasn't been loaded yet || if the user logged out but the component has still not unmounted yet
    if (!existingItem || !currentProd || !currentUser) return;

    if (existingItem.quantity >= currentProd.stocks) {
      toast.error("We appreciate your interest but, have limited stocks :(");
      return;
    }

    const updatedCart = cartProducts.map((prod) =>
      prod.id === id ? { ...prod, quantity: prod.quantity + 1 } : prod,
    );

    setCartProducts(updatedCart);
    updateCartItems(updatedCart);
  };

  const handleDecreaseItem = (id) => {
    let currentProd = products.find((elem) => elem.id === id);
    const existingItem = cartProducts.find((elem) => elem.id === id);

    if (!existingItem || !currentProd || !currentUser) return;

    const updatedCart =
      existingItem.quantity <= currentProd.minimumOrderQuantity
        ? cartProducts.filter((prod) => prod.id !== id)
        : cartProducts.map((prod) =>
            prod.id === id ? { ...prod, quantity: prod.quantity - 1 } : prod,
          );

    setCartProducts(updatedCart);

    // localStorage me updation ke liye!
    updateCartItems(updatedCart);
  };

  const emptyCart = () => {
    setCartProducts([]);
    updateCartItems();
  };

  const updateCartItems = (updatedValues = []) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === currentUser.id
          ? { ...user, cartItems: updatedValues }
          : user,
      ),
    );
  };

  useEffect(() => {
    let total = cartProducts.reduce((acc, current) => {
      acc += current.price * current.quantity;
      return acc;
    }, 0);
    setCartTotal(total);
  }, [cartProducts]);
  return (
    <MyCart.Provider
      value={{
        cartProducts,
        setCartProducts,
        handleAddToCart,
        handleIncreaseItem,
        handleDecreaseItem,
        emptyCart,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </MyCart.Provider>
  );
};
