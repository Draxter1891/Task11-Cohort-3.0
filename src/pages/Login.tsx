import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#111111] p-8 shadow-2xl">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white">Sign in</h2>

      <p className="mt-2 text-zinc-500">
        Enter your credentials to continue
      </p>

      {/* Form */}
      <form className="mt-10 space-y-5">
        {/* Email */}
        <div className="flex items-center rounded-2xl border border-zinc-700 bg-[#1A1A1A] px-5 py-4">
          <FiMail className="mr-3 text-lg text-zinc-500" />

          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center rounded-2xl border border-zinc-700 bg-[#1A1A1A] px-5 py-4">
          <FiLock className="mr-3 text-lg text-zinc-500" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-zinc-500 transition hover:text-white"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime-400 py-4 text-lg font-semibold text-black transition hover:bg-lime-300"
        >
          Sign in
          <FiArrowRight size={20} />
        </button>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-zinc-500">
        Don't have an account?{" "}
        <button
          type="button"
          className="font-semibold text-lime-400 hover:underline"
        >
          Create one
        </button>
      </p>
    </div>
  );
};

export default Login;