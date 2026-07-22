import { NavLink, useOutletContext } from "react-router";
import { ShoppingCart, LogOut, Zap, Menu, X } from "lucide-react";
import { useContext, useRef, useState } from "react";
import Cart from "./Cart";
import { Auth } from "../context/AuthContext";
import { Products } from "../context/ProductContext";
import useClickOutside from "../hooks/useClickOutside";

const Navbar = () => {
  const { currentUser, logout } = useContext(Auth);
  const { toggle, setToggle, isCartOpen, setIsCartOpen } = useContext(Products);

  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setToggle(false), toggle);

  return (
    <header className="w-full sticky top-0 left-0 z-10 border-b border-zinc-800 bg-zinc-900/40 mb-2">
      <div className="backdrop-blur-md m-auto flex h-18 max-w-7xl items-center justify-between px-2">
        {/* Logo */}
        <NavLink to="/home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-400">
            <Zap size={20} className="fill-black text-black" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white font-[clash]">
            Sky
            <span className="text-lime-400">Mart</span>
          </h1>
        </NavLink>

        {/* Navigation */}
        <nav className="hidden md:flex lg:flex items-center gap-10 text-base">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-lime-400" : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-lime-400" : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-lime-400" : "text-zinc-500 hover:text-white"
              }`
            }
          >
            About
          </NavLink>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* User */}
          <div className="hidden lg:flex md:flex sm:flex items-center gap-2 rounded-xl border border-zinc-800 px-2 py-1 bg-zinc-800/70">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-lime-400 font-semibold text-black">
              {currentUser?.userName?.charAt(0).toUpperCase()}
            </div>

            <span className="font-medium text-sm text-zinc-300">
              {currentUser?.userName}
            </span>
          </div>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/10 text-zinc-300 transition hover:border-lime-400 hover:text-lime-400 cursor-pointer"
          >
            <ShoppingCart size={20} />
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="hidden lg:flex md:flex  h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-[#111111] text-zinc-300 transition hover:border-red-500 hover:text-red-500 cursor-pointer"
          >
            <LogOut size={20} />
          </button>
          {/* Hamberger */}
          <button
            onClick={() => setToggle(!toggle)}
            className="lg:hidden md:hidden flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-800 bg-[#111111] text-zinc-300 transition cursor-pointer"
          >
            {toggle ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {/* Responsive Navigation */}

      <div
        ref={menuRef}
        className={`lg:hidden md:hidden w-full bg-zinc-800/60 px-8  transition-all duration-400 ease-in-out ${
          toggle
            ? "opacity-100 max-h-96 py-2 border-t border-zinc-600"
            : "opacity-0 pointer-events-none max-h-0 py-0"
        }`}
      >
        <nav className=" flex flex-col items-start gap-6 text-base ">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-lime-400" : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-lime-400" : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-lime-400" : "text-zinc-500 hover:text-white"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            onClick={logout}
            className={`flex gap-2 text-red-500 items-center font-medium`}
          >
            <LogOut size={18} /> Logout
          </NavLink>
        </nav>
      </div>
      <Cart />
    </header>
  );
};

export default Navbar;
