import React from "react";
import { House, ShoppingBag, EyeOff } from "lucide-react";
import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B0C0B] text-white">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-lime-400/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-lime-400/10 blur-[150px]" />

      <div className="min-h-[calc(100vh-80px)] items-center justify-center px-6 flex">
        <div className="flex max-w-3xl flex-col items-center text-center">
          {/* Error Code */}
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Error Code: 404
          </p>

          {/* 404 */}
          {/* drop-shadow-[offsetX_offsetY_blurRadius_color] => filter: drop-shadow is a CSS function that applies a shadow effect to the actual visible shape (alpha channel) of an element */}
          <h1
            className="select-none text-[10rem] font-[clash] font-bold leading-none text-[#D7FF00]
  drop-shadow-[0_0_20px_rgba(215,255,0,0.45)]"
          >
            404
          </h1>

          {/* Heading */}
          <h2 className="mt-4 font-[clash] text-[2rem] font-bold tracking-tight">
            Page not found!
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
            Even the fastest delivery can't find this page. Let's get you back
            to the shop and find what you need.
          </p>

          {/* Buttons */}
          <div className="mt-14 flex items-center gap-6">
            {/* Back Home */}
            <NavLink
              to="/"
              className="group flex items-center gap-3 rounded-full
    bg-[#D7FF00] px-8 py-4 font-semibold text-black
    transition-all duration-300 hover:scale-105
    hover:shadow-[0_0_30px_rgba(215,255,0,0.35)]"
            >
              <House
                size={20}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
              Back to Home
            </NavLink>

            <NavLink
              to="/shop"
              className="group flex items-center gap-3 rounded-full
    border border-zinc-600 bg-transparent
    px-8 py-4 font-semibold text-white
    transition-all duration-300
    hover:border-[#D7FF00]
    hover:bg-[#D7FF00]/10"
            >
              <ShoppingBag
                size={20}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              Browse Products
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
