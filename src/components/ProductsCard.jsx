import React, { useContext } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  BadgeCheck,
  Minus,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router";
import { MyCart } from "../context/CartContext";
import { MyProducts } from "../context/ProductContext";

const ProductsCard = ({ product }) => {
  const {
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    thumbnail,
    reviews,
    minimumOrderQuantity,
  } = product;

  const {
    handleAddToCart,
    cartProducts,
    handleIncreaseItem,
    handleDecreaseItem,
  } = useContext(MyCart);

  const { handleAddToFavourites, favourites, products } =
    useContext(MyProducts);
  // console.log("product rerendering....");
  const existFavo = () => {
    return favourites.some((elem) => elem.id === id);
  };

  const currentProd = cartProducts.find((elem) => elem.id === id);

  let isFavourite = existFavo();
  const originalPrice = (price / (1 - discountPercentage / 100)).toFixed(2);
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400 hover:shadow-2xl hover:shadow-lime-500/10">
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-950">
        <button
          onClick={() => handleAddToFavourites(Number(id))}
          className="absolute right-4 top-4 z-8 rounded-full bg-zinc-900/90 p-2 transition hover:bg-zinc-400 hover:text-black cursor-pointer"
        >
          {isFavourite ? (
            <Heart size={18} fill="red" stroke="red" />
          ) : (
            <Heart size={18} />
          )}
        </button>

        <img
          onClick={() => navigate(`/shop/details/${id}`)}
          src={thumbnail}
          alt={title}
          className="h-52 md:h-62 w-full object-contain p-2 transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black">
          -{Math.round(discountPercentage)}%
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <span className="mb-1 w-fit rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium capitalize text-lime-400">
          {category}
        </span>

        {/* Title */}
        <h2 className="line-clamp-2 text-xl font-semibold text-white">
          {title}
        </h2>

        {/* Brand & Rating */}
        <div className="flex mt-1 sm:mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            <Star size={12} fill="currentColor" />
            <span>{rating}</span>
            <span className="text-zinc-500">({reviews.length})</span>
          </div>

          {/* Stock */}

          {stock > 20 ? (
            <span className="rounded-full bg-lime-500/10 px-2 py-1 text-sm font-medium text-lime-400">
              ● In Stock ({stock})
            </span>
          ) : stock > 0 ? (
            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400">
              ● Only {stock} left
            </span>
          ) : (
            <span className="rounded-full bg-red-500/10 px-1 py-1 text-sm font-medium text-red-400">
              ● Out of Stock
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-1 sm:line-clamp-2 text-sm text-zinc-400">
          {description}
        </p>

        {/* Price */}
        <div className="mt-1 md:mt-2 flex w-full items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-zinc-500 line-through">
              ${originalPrice}
            </p>

            <p className="text-base font-bold text-lime-400">${price}</p>
          </div>

          <div className="flex flex-1 justify-end">
            {currentProd &&
            currentProd.quantity >= product.minimumOrderQuantity ? (
              <div className="">
                <p className="mb-1 text-sm text-zinc-500">Quantity</p>

                <div className="flex w-fit items-center overflow-hidden rounded-xl border border-zinc-700">
                  <button
                    onClick={() => {
                      handleDecreaseItem(Number(id));
                    }}
                    className="border-r border-zinc-700 p-2 transition hover:bg-zinc-800"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="w-10 text-center text-base font-semibold">
                    {currentProd.quantity}
                  </span>

                  <button
                    onClick={() => {
                      handleIncreaseItem(Number(id));
                    }}
                    className="border-l border-zinc-700 p-2 transition hover:bg-zinc-800"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <p className="mt-1 text-[12px] md:text-sm text-zinc-500">
                  Minimum Order :
                  <span className="ml-2 text-lime-400">
                    {product.minimumOrderQuantity}
                  </span>
                </p>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(id)}
                className="flex items-center gap-1 rounded-xl bg-lime-400 px-5 py-2 font-semibold text-black transition hover:scale-105 cursor-pointer"
              >
                <ShoppingCart size={18} />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
