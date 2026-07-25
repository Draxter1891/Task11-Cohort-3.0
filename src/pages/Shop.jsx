import React, { useContext } from "react";
import { MyProducts } from "../context/ProductContext";
import ProductsCard from "../components/ProductsCard";
import { Atom } from "react-loading-indicators";
import { MyCart } from "../context/CartContext";
import { Auth } from "../context/AuthContext";
import Filter from "../components/Filter";

const Shop = () => {
  const { products, isLoading, error } = useContext(MyProducts);
  const { cartProducts, setCartProducts } = useContext(MyCart);
  const { currentUser, users } = useContext(Auth);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Atom color="#32cd32" size="medium" text="Loading" textColor="green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div onClick={() => {}} className="flex flex-col text-white px-10">
      <h1 className="mt-5 font-bold text-4xl font-[clash]">All Products</h1>
      <p className="mb-10 text-base text-zinc-500">
        {products.length} products found
      </p>

      <Filter />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
        {products.map((elem) => (
          <ProductsCard key={elem.id} product={elem} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
