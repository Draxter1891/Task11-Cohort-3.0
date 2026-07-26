import React, { useState } from "react";
import { Search, ChevronDown, X as XIcon } from "lucide-react";

const Filter = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Category");
  const [sort, setSort] = useState("Featured");
  const [tags, setTags] = useState([]);

  const removeTag = (t) => setTags((s) => s.filter((x) => x !== t));
  const clearAll = () => {
    setTags([]);
    setQuery("");
    setCategory("");
    setSort("");
  };

  const onSearchKey = (e) => {
    if (e.key === "Enter" && query.trim()) {
      const q = query.trim();
      if (!tags.includes(q)) setTags((s) => [...s, q]);
      setQuery("");
    }
  };

  return (
    <div className=" w-full mb-5 rounded-2xl border border-zinc-600 p-4 bg-[#0d0d0d]">
      <div className="flex flex-col gap-2">
        <div className="w-full flex flex-col items-center gap-2 md:flex-row">
          {/* Search input */}
          <div className="w-full flex items-center gap-3 flex-1 rounded-full bg-[#111111] px-4 py-3">
            <Search size={18} className="text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onSearchKey}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-zinc-200 placeholder-zinc-600"
            />
          </div>

          <div className="flex w-full sm:w-1/3 items-center gap-2 justify-between">
            {/* Category select */}
            <div className="relative flex-1 min-w-0">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (!tags.includes(e.target.value.toLowerCase()))
                    setTags((s) => [...s, e.target.value.toLowerCase()]);
                }}
                className="w-full appearance-none rounded-full bg-[#111111] border border-zinc-700 px-4 py-2 text-zinc-200 text-base"
              >
                <option>All</option>
                <option>Beauty</option>
                <option>Fregrances</option>
                <option>Furniture</option>
                <option>Groceries</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-zinc-400"
                size={16}
              />
            </div>

            {/* Sort select */}
            <div className="relative flex-1 min-w-0">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  if (!tags.includes(e.target.value))
                    setTags((s) => [...s, e.target.value]);
                }}
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
            {tags.length > 0 && (
              <button
                onClick={clearAll}
                className="flex-0 rounded-full border border-red-600 px-4 py-2 text-red-400"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 rounded-full bg-lime-600/10 px-3 py-1 text-sm text-lime-400"
            >
              <span className="capitalize">{t}</span>
              <button
                onClick={() => removeTag(t)}
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
