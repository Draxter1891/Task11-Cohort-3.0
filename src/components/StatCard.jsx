import { Package } from "lucide-react";

const StatCard = ({ icon: Icon, value, title, subtitle, bgColor, iconColor }) => {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-5
        rounded-[28px]
        border
        border-zinc-600
        bg-[#111111]
        px-6
        py-6"
    >
      {/* Icon */}
      <div
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          ${bgColor} ${iconColor}
          transition-all
          duration-300`}
        
      >
        <Icon size={22} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold leading-none text-white font-[clash]">{value}</h2>

        <h3 className="text-md font-medium text-zinc-400">{title}</h3>

        <p className="text-xs text-zinc-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatCard;
