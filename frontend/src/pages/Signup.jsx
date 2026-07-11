import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { signup } from "../services/authApi";

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    try{
      const { name, email, password } = data;
      await signup(name, email, password);
      navigate("/login");
    }catch(error){
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-white">
          Create Your Account
        </h2>
        <p className="text-sm text-center text-gray-400">
          Join us and start your journey 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters",
                },
              })}
              className="w-full px-4 py-2 mt-1 text-white placeholder-gray-400 bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 mt-1 text-white placeholder-gray-400 bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 mt-1 text-white placeholder-gray-400 bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <span className="w-1/3 border-t border-gray-600"></span>
          <span className="mx-2 text-sm text-gray-400">or</span>
          <span className="w-1/3 border-t border-gray-600"></span>
        </div>


        {/* Auth link */}
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
