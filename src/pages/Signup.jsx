import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { nanoid } from "nanoid";

const Signup = ({ setUsers, users }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    // watch, //Alternatively, getValues() can also be used here
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //   const checkPassword = watch("password");

  const formHandle = (data) => {
    const isLoggedin = users.some((elem) => elem.email === data.email);

    if (isLoggedin) {
      alert("Email already exists, try logging in! 🤔");
      navigate("/");
      return;
    }

    const { userName, email, password } = data;

    let arr = [
      ...users,
      {
        id: nanoid(),
        userName,
        email,
        password,
      },
    ];
    setUsers(arr);
    reset();
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="my-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400">
          <Zap className="fill-black text-black" size={20} />
        </div>

        <h1 className="text-2xl font-bold font-[clash] text-white tracking-tight">
          Sky<span className="text-lime-400">Mart</span>
        </h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-[450px] rounded-3xl border border-zinc-800 bg-[#111111] p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white font-[clash]">
          Create account
        </h2>

        <p className=" text-sm text-zinc-600 font-bold mt-1">
          Join SkyMart and start shopping
        </p>

        <form
          onSubmit={handleSubmit((data) => formHandle(data))}
          className="mt-7 space-y-2"
        >
          {/* Full Name */}
          <div className="flex h-12 items-center rounded-2xl border border-zinc-700 bg-[#1d1d1d] px-4">
            <User size={18} className="text-zinc-500" />

            <input
              {...register("userName", {
                required: "Name can't be empty!",
                pattern: {
                  value: /^(?!\s*$).+/,
                  message: "Blank spaces are not allowed!",
                },
              })}
              type="text"
              placeholder="Full name"
              className="ml-4 w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
            />
          </div>
          {errors.userName && (
            <p className="text-red-500 text-sm">{errors.userName.message}</p>
          )}
          {/* Email */}
          <div className="flex h-12 items-center rounded-2xl border border-zinc-700 bg-[#1d1d1d] px-4">
            <Mail size={18} className="text-zinc-500" />

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
              className="ml-4 w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          {/* Password */}
          <div className="flex h-12 items-center rounded-2xl border border-zinc-700 bg-[#1d1d1d] px-4">
            <Lock size={18} className="text-zinc-500" />

            <input
              {...register("password", {
                required: "Password is required!",
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
              placeholder="Password (min 8 chars)"
              className="ml-4 w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
            />

            <button
              className="cursor-pointer"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-zinc-500" />
              ) : (
                <Eye size={18} className="text-zinc-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {/* Confirm Password */}
          <div className="flex h-12 items-center rounded-2xl border border-zinc-700 bg-[#1d1d1d] px-4">
            <Lock size={18} className="text-zinc-500" />

            <input
              {...register("confirmPassword", {
                required: "Please confirm your password!",
                validate: (val) =>
                  val === getValues("password") || "Passwords do not match!",
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="ml-4 w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
          {/* Button */}
          <button className="mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 text-xl font-semibold text-black transition hover:bg-lime-300 font-[clash] cursor-pointer">
            Create Account
            <ArrowRight size={22} />
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            type="button"
            className="font-semibold text-lime-400 hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
