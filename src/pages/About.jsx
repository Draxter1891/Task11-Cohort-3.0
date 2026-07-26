import React from "react";
import StatCard from "../components/StatCard";
import CategoryCard from "../components/CategoryCard";
import {
  Package,
  Users,
  Star,
  Truck,
  Shield,
  Heart,
  Armchair,
  Flower2,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate()
  const team = [
    { name: "Rishabh Tripathi", role: "Founder & CEO", initial: "R" },
    { name: "Radhika Sharma", role: "CFO & Head of Product", initial: "R" },
    { name: "Kaju", role: "Growth Leader", initial: "K" },
    { name: "Dhan", role: "Finance", initial: "D" },
  ];
  return (
    <div className="px-8 py-12">
      {/* Header */}
      <div className="text-center text-white">
        <div className="flex items-center justify-center">
          <div className="flex h-15 w-15 items-center justify-center rounded-3xl bg-lime-400">
            <Zap size={30} className="fill-black text-black" />
          </div>
        </div>

        <h1 className="mt-5 text-5xl font-bold font-[clash]">
          About <span className="text-lime-400">SkyMart</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
          SkyMart is a next-generation e-commerce platform built to make online
          shopping fast, fair, and enjoyable — for everyone.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          value={"20K+"}
          title={"Products"}
          subtitle={""}
          bgColor={"bg-lime-500/20"}
          iconColor={"text-lime-400"}
        />

        <StatCard
          icon={Users}
          value={"50K+"}
          title={"Happy Customers"}
          subtitle={""}
          bgColor={"bg-yellow-500/10"}
          iconColor={"text-yellow-300"}
        />

        <StatCard
          icon={Star}
          value={"4.9"}
          title={"Avg. Rating"}
          subtitle={""}
          bgColor={"bg-blue-500/10"}
          iconColor={"text-blue-300"}
        />

        <StatCard
          icon={Truck}
          value={"99%"}
          title={"On-time Delivery"}
          subtitle={""}
          bgColor={"bg-purple-500/10"}
          iconColor={"text-purple-300"}
        />
      </div>

      {/* Our Story */}
      <div className="mt-12">
        <div className="rounded-2xl border border-zinc-600 p-8 bg-[#0d0d0d] text-center">
          <h2 className="text-2xl font-[clash] text-white mb-4 ">Our Story</h2>

          <p className="text-zinc-400 leading-relaxed ">
            SkyMart started in 2022 as a small side project - two engineers
            tired of bloated, slow e-commerce experiences. We asked ourselves:
            what if shopping online was actually enjoyable?
          </p>

          <p className="text-zinc-400 leading-relaxed mt-4">
            Three years later, SkyMart serves over 50,000 customers across the
            country. We stock electronics, fashion, jewelry, and everyday
            essentials - all at prices that don't require a second mortgage.
          </p>

          <p className="text-zinc-400 leading-relaxed mt-4">
            We're still the same team at heart: obsessed with speed,
            transparency, and making you feel good about every purchase you make
            here.
          </p>
        </div>
      </div>

      {/* What We Stand For */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-[clash] text-white mb-6">
          What We Stand For
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4  gap-6">
          <CategoryCard
            icon={Shield}
            name={"Trust"}
            totalProducts={""}
            hover={false}
          />
          <CategoryCard
            icon={Truck}
            name={"Speed"}
            totalProducts={""}
            hover={false}
          />
          <CategoryCard
            icon={Heart}
            name={"Community"}
            totalProducts={""}
            hover={false}
          />
          <CategoryCard
            icon={Star}
            name={"Quality"}
            totalProducts={""}
            hover={false}
          />
        </div>
      </div>

      {/* Meet the Team */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-[clash] text-white mb-6">Meet the Team</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-zinc-600 bg-[#111111] p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 font-bold">
                  {t.initial}
                </div>

                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-zinc-500 text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12">
        <div className="rounded-2xl border border-zinc-600 p-12 text-center bg-[#0d0d0d]">
          <h3 className="text-2xl font-[clash] text-white mb-2">
            Ready to shop?
          </h3>
          <p className="text-zinc-400 mb-6">
            Explore thousands of products at unbeatable prices.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="cursor-pointer mx-auto rounded-full bg-lime-400 px-6 py-3 text-black font-semibold transition-all duration-200 ease-in hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(196,255,0,.1)] active:scale-95 "
          >
            Browse Products →
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
