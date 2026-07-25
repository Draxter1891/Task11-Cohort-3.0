import {
  Armchair,
  ArrowUpRight,
  Broccoli,
  Flower2,
  SoapDispenserDroplet,
} from "lucide-react";

const CategoryCard = ({ icon: Icon, name, totalProducts, hover }) => {
  return (
    <button
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-[#111111]
        px-6
        py-4
        text-left
        
        transition-all
        duration-300
        
        ${hover ? "cursor-pointer hover:-translate-y-2 hover:border-lime-400/40 hover:shadow-[0_0_35px_rgba(196,255,0,.08)]" : ""}
      `}
    >
      {/* Glow */}
      <div
        className={`
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-lime-400/10
          blur-3xl
          opacity-0
          transition-opacity
          duration-300
          ${hover ? "group-hover:opacity-100" : ""}
          
        `}
      />

      {/* Icon */}
      <div
        className={`
          relative
          mb-4
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-lime-400/10
          text-[#D7FF00]
          transition-all
          duration-300
          ${hover ? "group-hover:bg-lime-400/20" : ""}
        `}
      >
        <Icon size={22} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white font-[clash]">{name}</h3>

      {/* Footer */}
      {hover && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500">{totalProducts} Products</p>

          <ArrowUpRight
            size={20}
            className="
            text-zinc-500
            transition-all
            duration-300
            group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D7FF00]"
          />
        </div>
      )}
    </button>
  );
};

export default CategoryCard;
