import { useState } from "react";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Star } from "lucide-react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const stats = [
    {
      value: "20K+",
      label: "Products",
    },
    {
      value: "50K+",
      label: "Users",
    },
    {
      value: "4.9",
      label: "Rating",
      icon: <Star size={18} fill="currentColor" />,
    },
  ];

  const formHandle = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex">
      {/* LEFT SIDE */}
      <section className="hidden lg:flex w-1/2 border-r border-zinc-700/70">
        <div className="flex flex-col justify-around w-full px-12 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400">
              <Zap size={20} className="fill-black text-black" />
            </div>

            <h1 className="font-[clash] text-2xl font-bold tracking-tight text-white">
              Sky
              <span className="text-lime-400">Mart</span>
            </h1>
          </div>

          {/* Hero */}
          <div className="max-w-xl">
            <p className="uppercase tracking-[4px] font-semibold text-lime-400">
              Welcome Back
            </p>

            <h2 className="mt-1 text-5xl font-bold font-[clash] leading-tight text-white">
              Shop the future.
              <br />
              <span className="text-lime-400">Today.</span>
            </h2>
            <p className="mt-3 text-base leading-6 text-zinc-500 w-2/3">
              Thousands of products, lightning-fast delivery, and prices that
              make your wallet happy.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-zinc-300 px-6 py-2 text-center"
              >
                <div className="font-[clash] flex items-center justify-center gap-2 text-2xl font-bold text-lime-400">
                  {item.value}
                  {item.icon}
                </div>

                <p className="text-zinc-500 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-[520px] rounded-[30px] border border-zinc-800 bg-[#101010] p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white font-[clash]">
            Sign in
          </h2>

          <p className="mt-2 text-base text-zinc-500">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit(formHandle)} className="mt-5 space-y-2">
            {/* Email */}
            <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-[#1A1A1A] px-5">
              <Mail size={18} className="text-zinc-500/50" />

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter valid email!",
                  },
                })}
                type="email"
                placeholder="Email address"
                className="ml-4 w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm"> {errors.email.message}</p>
            )}
            {/* Password */}
            <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-[#1A1A1A] px-5">
              <Lock size={18} className="text-zinc-500/50" />

              <input
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    minLength: (v) =>
                      v.length >= 8 || "Must be at least 8 characters long",
                    uppercase: (v) =>
                      /[A-Z]/.test(v) ||
                      "Must include at least one uppercase letter",
                    lowercase: (v) =>
                      /[a-z]/.test(v) ||
                      "Must include at least one lowercase letter",
                    number: (v) =>
                      /\d/.test(v) || "Must include at least one number",
                    specialChar: (v) =>
                      /[`!@#$%^&*()_+{}|:"<>?~=\-[\]\\;',./]/.test(v) ||
                      "Must include at least one special character",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="ml-4 w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-zinc-500" />
                ) : (
                  <Eye size={20} className="text-zinc-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {/* Button */}
            <button className="mt-4 flex h-12 w-full font-[clash] items-center justify-center gap-3 rounded-2xl bg-lime-400 text-xl font-semibold text-black transition hover:bg-lime-300 cursor-pointer">
              Sign in
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-zinc-500">
            Don't have an account?{" "}
            <span className="cursor-pointer font-semibold text-lime-400 hover:underline">
              Create one
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
