import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Auth } from "../context/AuthContext";
import {
  ArrowRight,
  CassetteTape,
  Icon,
  Package,
  Phone,
  Star,
  Tag,
  TrendingUp,
  Armchair,
  ArrowUpRight,
  Broccoli,
  Flower2,
  SoapDispenserDroplet,
} from "lucide-react";
import { useNavigate } from "react-router";
import HeroComponent from "../components/HeroComponent";
import StatCard from "../components/StatCard";
import CategoryCard from "../components/CategoryCard";
import { MyProducts } from "../context/ProductContext";
import { nanoid } from "nanoid";
import { MyCart } from "../context/CartContext";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(Auth);
  const { products, updateFilters } = useContext(MyProducts);
  const { cartProducts, cartTotal } = useContext(MyCart);

  let categories = products?.map((elem) => elem.category) ?? [];
  let totalCartItems = cartProducts?.length ?? 0;
  // console.log(totalCartItems);
  const topProduct = products.find((elem) => elem.rating > 4.9);
  let categoryCount = [];

  let catClassify = {};
  for (let val of categories) {
    catClassify[val] = (catClassify[val] || 0) + 1;
  }

  let catKeys = Object.keys(catClassify);

  for (let val of catKeys) {
    let obj = {
      id: nanoid(),
      name: val,
      totalCount: catClassify[val],
    };
    categoryCount.push(obj);
  }

  const iconNames = {
    beauty: SoapDispenserDroplet,
    fragrances: Flower2,
    furniture: Armchair,
    groceries: Broccoli,
  };

  const handleCategoryClick = (categoryName) => {
    updateFilters({ category: categoryName, query: "", sort: "Featured" });
    navigate("/shop");
  };
  return (
    <div className="px-6 py-8">
      {/* Hero section */}
      <HeroComponent />
      {/* Stats section */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          value={totalCartItems}
          title={"Cart items"}
          subtitle={"In your bag"}
          bgColor={"bg-lime-500/20"}
          iconColor={"text-lime-400"}
        />
        <StatCard
          icon={TrendingUp}
          value={`$${cartTotal.toFixed(2)}`}
          title={"Cart value"}
          subtitle={"Ready to checkout"}
          bgColor={"bg-blue-500/20"}
          iconColor={"text-blue-400"}
        />
        <StatCard
          icon={Star}
          value={topProduct ? topProduct.title : "—"}
          title={"Top products"}
          subtitle={"Highly rated"}
          bgColor={"bg-yellow-800/20"}
          iconColor={"text-yellow-300"}
        />
        <StatCard
          icon={Tag}
          value={categoryCount.length}
          title={"Categories"}
          subtitle={"To explore"}
          bgColor={"bg-purple-500/20"}
          iconColor={"text-purple-300"}
        />
      </div>
      {/* Category filters */}
      <div className="mt-12">
        <div className="flex w-full justify-between text-white">
          <h2 className="text-2xl font-[clash]">Shop by category</h2>
          <h3
            onClick={() => navigate("/shop")}
            className="text-md text-lime-500 flex gap-2 items-center cursor-pointer"
          >
            View all <ArrowRight size={18} />{" "}
          </h3>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {categoryCount.map((elem) => (
            <CategoryCard
              key={elem.id}
              icon={iconNames[elem.name]}
              name={elem.name}
              totalProducts={elem.totalCount}
              hover={true}
              onClick={() => handleCategoryClick(elem.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
