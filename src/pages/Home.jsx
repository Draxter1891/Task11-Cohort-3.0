import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Auth } from "../context/AuthContext";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(Auth);
  const now = new Date();
  const currentHour = now.getHours();
  const [greet, setGreet] = useState("Hello");
  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) {
      return setGreet("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      return setGreet("Good Afternoon");
    } else {
      return setGreet("Good Evening");
    }
  };

  useEffect(() => {
    getGreeting();
  }, [currentHour]);
  return (
    <div className="px-15 py-8">
      {/* Hero section */}
        <div
          className="relative overflow-hidden rounded-4xl border border-zinc-700 bg-[#101010]"
          style={{
            backgroundImage: `
          linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
        `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="flex min-h-107.5 flex-col justify-between gap-10 px-12 py-12 lg:flex-row lg:items-center">
            {/* Left */}
            <div className="max-w-2xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-lime-400">
                {greet}
              </p>

              <h1 className="text-2xl font-bold leading-none text-white lg:text-5xl">
                Welcome back,
                <br />
                <span className="text-[#C8FF00] font-[clash]">{currentUser.userName}</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
                Discover today's picks — hand-curated products across
                electronics, fashion, and more.
              </p>

              <div className="mt-12 flex flex-wrap gap-5">
                <button
                onClick={()=>navigate("/shop")}
                  className="flex items-center gap-3 rounded-full
                bg-[#C8FF00] px-8 py-4 font-semibold text-black
                transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(215,255,0,0.35)] cursor-pointer"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </button>

                <button
                onClick={()=>{navigate("/shop")}}
                  className="rounded-full border border-zinc-700
                px-8 py-4 font-medium text-white
                transition-all duration-300
                hover:border-lime-400 hover:bg-lime-400/10 cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-5">
              <div
                className="flex h-40 w-44 flex-col items-center justify-center
              rounded-3xl border border-lime-400/20
              bg-lime-400/10"
              >
                <h2 className="text-5xl font-bold text-[#C8FF00] font-[clash]">20+</h2>

                <p className="mt-2 text-center text-zinc-400">
                  Products Available
                </p>
              </div>

              <div
                className="flex h-32 w-44 flex-col items-center justify-center
              rounded-3xl border border-zinc-300"
              >
                <h2 className="text-4xl font-bold text-white">Free</h2>

                <p className="mt-2 text-center text-zinc-400">
                  Delivery on
                  <span className="font-[clash]"> ₹999+</span>
                </p>
              </div>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-lime-400/10 blur-[120px]" />

          <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-lime-400/10 blur-[140px]" />
        </div>
    </div>
  );
};

export default Home;
