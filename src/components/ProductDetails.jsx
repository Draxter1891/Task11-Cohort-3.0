import React, { useContext, useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  BadgeCheck,
} from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";
import { Products } from "../context/ProductContext";
import axios from "axios";
import { Atom } from "react-loading-indicators";
import RelatedProductCard from "./RelatedProductCard";
import { MyCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products } = useContext(Products);
  const { handleAddToCart, handleIncreaseItem, handleDecreaseItem } =
    useContext(MyCart);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);

  const getSingleProduct = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`https://dummyjson.com/products/${id}`);

      const data = res.data;
      setProduct(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setQuantity(product.minimumOrderQuantity);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Atom color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  const relatedProducts = products.filter(
    (elem) =>
      elem.category === product.category && elem.title !== product.title,
  );

  //   circular array implementation
  const productIds = products.map((elem) => elem.id);

  const currentProductIndex = productIds.indexOf(product.id);
  const previousProductId =
    currentProductIndex > 0
      ? productIds[currentProductIndex - 1]
      : productIds[productIds.length - 1];
  const nextProductId =
    currentProductIndex >= 0 && currentProductIndex < productIds.length - 1
      ? productIds[currentProductIndex + 1]
      : productIds[0];
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <section className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}

        <NavLink
          to="/shop"
          className="mb-10 inline-flex items-center gap-2 text-zinc-400 transition hover:text-lime-400 hover:underline"
        >
          <ArrowLeft size={18} />
          Shop/{product.category}/{String(product.title).slice(0, 12) + "..."}
        </NavLink>

        {/* Hero */}

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 ">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="mx-auto h-120.5 object-contain transition duration-500 hover:scale-105"
            />
          </div>

          {/* Right */}

          <div className="flex flex-col">
            <span className="mb-4 w-fit rounded-full bg-lime-400/10 px-4 py-1 text-sm font-medium capitalize text-lime-400">
              {product.category}
            </span>

            <h1 className="font-[clash] text-3xl font-bold leading-tight">
              {product.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />

                <span>{product.rating}</span>

                <span className="text-zinc-500">
                  ({product.reviews.length} Reviews)
                </span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <BadgeCheck size={18} />

                {product.brand}
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {product.description}
            </p>
            {/* Price */}

            <div className="mt-2 flex items-end gap-4">
              <h2 className="text-2xl font-[clash] font-bold text-lime-400">
                ${product.price}
              </h2>

              <p className="mb-1 text-base font-[clash] text-zinc-500 line-through">
                ${originalPrice}
              </p>

              <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            </div>

            {/* Stock */}

            <div className="mt-3 flex flex-wrap gap-4">
              <div className="rounded-xl border border-lime-500/30 bg-lime-500/10 px-2 py-2 text-lime-400">
                ● {product.availabilityStatus}
              </div>

              <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-2 py-2 text-zinc-300">
                {product.stock} Items Left
              </div>
            </div>

            {/* Quantity */}

            <div className="mt-5">
              <p className="mb-1 text-sm text-zinc-500">Quantity</p>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-zinc-700">
                <button
                  onClick={() => {
                    setQuantity((prev) =>
                      Math.max(product.minimumOrderQuantity, prev - 1),
                    );
                    handleDecreaseItem(Number(id));
                  }}
                  className="border-r border-zinc-700 p-2 transition hover:bg-zinc-800"
                >
                  <Minus size={18} />
                </button>

                <span className="w-10 text-center text-base font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    handleIncreaseItem(Number(id));
                  }}
                  className="border-l border-zinc-700 p-2 transition hover:bg-zinc-800"
                >
                  <Plus size={18} />
                </button>
              </div>

              <p className="mt-3 text-sm text-zinc-500">
                Minimum Order :
                <span className="ml-2 text-lime-400">
                  {product.minimumOrderQuantity}
                </span>
              </p>
            </div>

            {/* Buttons */}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  handleAddToCart(Number(id));
                }}
                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-lime-400 px-8 py-4 font-semibold text-black transition duration-300 cursor-pointer hover:scale-[1.03]"
              >
                <ShoppingCart size={20} />
                Add To Cart
              </button>

              <button
                onClick={() => setIsFavourite((prev) => !prev)}
                className={`flex items-center justify-center rounded-2xl border border-zinc-700 p-4 transition hover:border-red-400 hover:text-red-400 ${isFavourite ? "bg-red-500/20" : ""}`}
              >
                {isFavourite ? (
                  <Heart size={22} stroke="red" fill="red" />
                ) : (
                  <Heart size={22} stroke="red" />
                )}
              </button>
            </div>

            {/* Features */}

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <Truck className="mb-3 text-lime-400" />

                <p className="text-sm font-medium">
                  {product.shippingInformation}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <ShieldCheck className="mb-3 text-lime-400" />

                <p className="text-sm font-medium">
                  {product.warrantyInformation}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <RotateCcw className="mb-3 text-lime-400" />

                <p className="text-sm font-medium">{product.returnPolicy}</p>
              </div>
            </div>
            {productIds.length > 1 && (
              <div className="mt-5 flex w-full items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/shop/details/${previousProductId}`)}
                  aria-label="View previous product"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-lime-400 hover:text-lime-400"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/shop/details/${nextProductId}`)}
                  aria-label="View next product"
                  className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-300"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}

        <section className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="mb-8 font-[clash] text-3xl font-bold">
            Product Specifications
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">Brand</span>
              <span>{product.brand}</span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">SKU</span>
              <span>{product.sku}</span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">Weight</span>
              <span>{product.weight} g</span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">Availability</span>
              <span className="text-lime-400">
                {product.availabilityStatus}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">Dimensions</span>

              <span>
                {product.dimensions.width} × {product.dimensions.height} ×{" "}
                {product.dimensions.depth} cm
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">Minimum Order</span>

              <span>{product.minimumOrderQuantity}</span>
            </div>
          </div>
        </section>

        {/* Tags */}

        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="mb-6 font-[clash] text-3xl font-bold">Tags</h2>

          <div className="flex flex-wrap gap-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-lime-500/30 bg-lime-400/10 px-5 py-2 capitalize text-lime-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Reviews */}

        <section className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="mb-8 font-[clash] text-3xl font-bold">
            Customer Reviews
          </h2>

          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-lime-400"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {review.reviewerName}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-zinc-700"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-5 leading-relaxed text-zinc-400">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}

        <section className="mt-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-[clash] text-3xl font-bold">
              You May Also Like
            </h2>

            <NavLink to="/shop" className="text-lime-400 hover:underline">
              View All
            </NavLink>
          </div>

          <div className="grid gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {relatedProducts?.slice(0, 4).map((item) => (
              <RelatedProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProductDetails;
