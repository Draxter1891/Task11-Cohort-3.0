import { Package, ShoppingBag, X } from "lucide-react";
import { useNavigate } from "react-router";

const Cart = ({ setIsCartOpen, isCartOpen }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`absolute top-0 left-0 w-full select-none h-screen overflow-hidden transition-all duration-200 ${isCartOpen ? "bg-black/10 backdrop-blur-xs visible" : "backdrop-blur-none invisible"} `}
    >
      <div
        className={`fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-1/3 bg-[#111111] border-l border-zinc-700 z-50 flex flex-col transition-transform duration-200 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-18 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-lime-400" size={20} />
            <h2 className="text-xl font-[clash] font-semibold text-white">
              Cart
            </h2>
          </div>

          <button onClick={() => setIsCartOpen(false)}>
            <X
              size={24}
              className="text-zinc-400 hover:text-white transition"
            />
          </button>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="h-24 w-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Package size={42} className="text-zinc-500" strokeWidth={1.5} />
          </div>

          <h3 className="mt-6 text-xl font-semibold font-[clash] text-zinc-200">
            Cart is empty
          </h3>

          <p className="text-zinc-500 text-base">Explore our wide variety of products!</p>

          <button
            onClick={() => {
              setIsCartOpen(false);
              navigate("/shop");
            }}
            className="mt-10 px-5 py-3 rounded-2xl font-[clash] bg-lime-400 text-black font-semibold hover:bg-lime-300 transition cursor-pointer"
          >
            Browse Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
