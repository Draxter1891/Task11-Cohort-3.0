import React from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  BadgeCheck,
} from "lucide-react";

const Product = ({ product }) => {
  const {
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
  } = product;

  const originalPrice = (
    price /
    (1 - discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400 hover:shadow-2xl hover:shadow-lime-500/10">

      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-950">

        <button className="absolute right-4 top-4 z-8 rounded-full bg-zinc-900/90 p-2 transition hover:bg-lime-400 hover:text-black cursor-pointer">
          <Heart size={18} />
        </button>

        <img
          src={thumbnail}
          alt={title}
          className="h-72 w-full object-contain p-6 transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black">
          -{Math.round(discountPercentage)}%
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">

        {/* Category */}
        <span className="mb-3 w-fit rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium capitalize text-lime-400">
          {category}
        </span>

        {/* Title */}
        <h2 className="line-clamp-2 text-xl font-semibold text-white">
          {title}
        </h2>

        {/* Brand & Rating */}
        <div className="mt-3 flex items-center justify-between text-sm">

          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span>{rating}</span>
            <span className="text-zinc-500">
              ({reviews.length})
            </span>
          </div>

          <div className="flex items-center gap-1 text-zinc-400">
            <BadgeCheck size={16} />
            <span>{brand}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>

        {/* Stock */}
        <div className="mt-4">
          {stock > 20 ? (
            <span className="rounded-full bg-lime-500/10 px-3 py-1 text-sm font-medium text-lime-400">
              ● In Stock ({stock})
            </span>
          ) : stock > 0 ? (
            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400">
              ● Only {stock} left
            </span>
          ) : (
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
              ● Out of Stock
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-6 flex items-end justify-between">

          <div>
            <p className="text-sm text-zinc-500 line-through">
              ${originalPrice}
            </p>

            <p className="text-xl font-bold text-lime-400">
              ${price}
            </p>
          </div>

          <button className="flex items-center gap-1 rounded-2xl bg-lime-400 px-5 py-3 font-semibold text-black transition hover:scale-105 cursor-pointer">
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;