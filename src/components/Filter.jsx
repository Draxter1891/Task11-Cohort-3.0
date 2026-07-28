import React, { useContext } from "react";
import { Search, ChevronDown, X as XIcon } from "lucide-react";
import { MyProducts } from "../context/ProductContext";

const Filter = () => {
  const { products, filters, updateFilters, clearFilters } = useContext(MyProducts);

  const categories = ["All", ...new Set(products.map((product) => product.category))];
  
  const activeFilters = [
    filters.query.trim()
      ? { key: "query", label: `Name: ${filters.query.trim()}` }
      : null,
    filters.category !== "All"
      ? { key: "category", label: `Category: ${filters.category}` }
      : null,
    filters.sort !== "Featured"
      ? { key: "sort", label: `Sort: ${filters.sort}` }
      : null,
  ].filter(Boolean);

  return (
    <div className=" w-full mb-5 rounded-2xl border border-zinc-600 p-4 bg-[#0d0d0d]">
      <div className="flex flex-col gap-2">
        <div className="w-full flex flex-col items-center gap-2 md:flex-row">
          {/* Search input */}
          <div className="w-full flex items-center gap-3 flex-1 rounded-full bg-[#111111] px-4 py-3">
            <Search size={18} className="text-zinc-500" />
            <input
              value={filters.query}
              onChange={(e) => updateFilters({ query: e.target.value })}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-zinc-200 placeholder-zinc-600"
            />
          </div>

          <div className="flex w-full sm:w-1/3 items-center gap-2 justify-between">
            {/* Category select */}
            <div className="relative flex-1 min-w-0">
              <select
                value={filters.category}
                onChange={(e) => updateFilters({ category: e.target.value })}
                className="w-full appearance-none rounded-full bg-[#111111] border border-zinc-700 px-4 py-2 text-zinc-200 text-base"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-zinc-400"
                size={16}
              />
            </div>

            {/* Sort select */}
            <div className="relative flex-1 min-w-0">
              <select
                value={filters.sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="w-full appearance-none rounded-full bg-[#111111] border border-lime-400/40 px-4 py-2 text-zinc-200"
              >
                <option>Featured</option>
                <option>Price: Low → High</option>
                <option>Price: High → Low</option>
                <option>Top Rated</option>
                <option>Lowest Rated</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-zinc-400"
                size={16}
              />
            </div>

            {/* Clear button */}
            {(filters.query || filters.category !== "All" || filters.sort !== "Featured") && (
              <button
                onClick={clearFilters}
                className="flex-0 rounded-full border border-red-600 px-4 py-2 text-red-400"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active filters */}
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <div
              key={filter.key}
              className="flex items-center gap-2 rounded-full bg-lime-600/10 px-3 py-1 text-sm text-lime-400"
            >
              <span className="capitalize">{filter.label}</span>
              <button
                onClick={() => {
                  if (filter.key === "query") updateFilters({ query: "" });
                  if (filter.key === "category") updateFilters({ category: "All" });
                  if (filter.key === "sort") updateFilters({ sort: "Featured" });
                }}
                className="inline-flex items-center"
              >
                <XIcon size={14} className="text-lime-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
