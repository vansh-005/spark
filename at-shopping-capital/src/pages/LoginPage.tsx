import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-end bg-gradient-to-tr from-[#3a70e2] to-[#7810d9] relative overflow-hidden">
      {/* BG Illustration */}
      <img
        src="/login-bg.png" // Your left-side illustration (without login box)
        alt="AI Shopping"
        className="absolute left-0 top-0 h-full w-1/2 object-cover object-left z-0 max-md:hidden"
        draggable={false}
      />

      {/* Optional: white gradient overlay for smooth blend on right */}
      <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-white via-white/80 to-transparent z-10 max-md:hidden"></div>

      {/* Login Box on the right */}
      <div className="relative z-20 w-full max-w-2xl mr-28 flex justify-end">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 mx-8 my-16">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Welcome Back
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#3a70e2] hover:bg-[#7810d9] text-white font-bold text-lg shadow-md transition"
            >
              Log in
            </button>
            <div className="text-center mt-4 text-gray-600">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* Responsive: hide illustration on mobile */}
      <style>
        {`
          @media (max-width: 900px) {
            img[alt="AI Shopping"] {
              display: none;
            }
            .bg-gradient-to-l {
              width: 100% !important;
            }
            .flex.justify-end {
              justify-content: center !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
