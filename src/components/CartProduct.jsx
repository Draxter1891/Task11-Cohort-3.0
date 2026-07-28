import { Minus, Plus } from "lucide-react";
import { useContext } from "react";
import { MyCart } from "../context/CartContext";

const CartProduct = ({ item }) => {
  const { handleIncreaseItem, handleDecreaseItem } = useContext(MyCart);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-16 w-16 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-zinc-100">
          {item.title}
        </h4>
        <p className="mt-1 text-sm text-lime-400">
          ${item.price.toFixed(2)} each
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDecreaseItem(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-200 transition hover:bg-zinc-700"
            >
              <Minus size={14} />
            </button>

            <span className="min-w-6 text-center text-sm font-semibold text-white">
              {item.quantity}
            </span>

            <button
              onClick={() => handleIncreaseItem(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-black transition hover:bg-lime-300"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="text-sm font-semibold text-white">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
