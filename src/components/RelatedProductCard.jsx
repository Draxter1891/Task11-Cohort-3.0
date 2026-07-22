import React from "react";
import { Star } from "lucide-react";
import { NavLink } from "react-router";

const RelatedProductCard = ({ product }) => {
  const { id, title, category, price, rating, thumbnail } = product;

  return (
    <NavLink
      to={`/shop/details/${id}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-lime-400"
    >
      <div className="bg-zinc-950 p-4">
        <img
          src={thumbnail}
          alt={title}
          className="h-44 w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-xs capitalize text-lime-400">{category}</p>
        <h3 className="mt-2 line-clamp-2 min-h-12 font-semibold text-white">
          {title}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-semibold text-lime-400">${price}</span>
          <span className="flex items-center gap-1 text-sm text-yellow-400">
            <Star size={15} fill="currentColor" />
            {rating}
          </span>
        </div>
      </div>
    </NavLink>
  );
};

export default RelatedProductCard;
