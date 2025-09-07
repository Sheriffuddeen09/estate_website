import { Mail, Lock, Home, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo1 from './image/Symbol.svg (1).png'
import logo2 from './image/Symbol.svg (2).png'
import logo3 from './image/Symbol.svg.png'
import imagebuy from './image/Rectangle 1 (2).png'

export default function LoginPage() {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // ✅ loading state
    const navigate = useNavigate();
     const [menuOpen, setMenuOpen] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true); // start loading
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        navigate("/"); // ✅ redirect to homepage
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, {
          position: "bottom-center",
        });
      } finally {
        setLoading(false); // stop loading
      }
    };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation */}
      <header className="flex justify-between items-center shadow-md py-6 px-8 md:px-16 lg:px-24 border-b relative">
      {/* Left - Homepage */}
      <Link
        to="/"
        className="hidden md:flex items-center gap-2 text-gray-600 border border-blue-600 px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition"
      >
        ← Homepage
      </Link>

      {/* Center Logo */}
      <p className="font-bold text-black flex items-center gap-3">
        <Home /> PropBot
      </p>

      {/* Right - About Us (desktop) */}
      <Link
        to="/about"
        className="hidden md:block bg-blue-900 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-700 transition"
      >
        About Us →
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-black"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} className="hidden" /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-64  space-y-6 text-center">
            <X size={28} className="text-black" onClick={() => setMenuOpen(!menuOpen)} />
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 font-semibold  border border-blue-600 px-4 py-2 rounded-full hover:bg-gray-100 transition"
            >
              ← Homepage
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block bg-blue-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              About Us →
            </Link>
          </div>
        </div>
      )}
    </header>

      {/* Main Content - Login + Image */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Section - Form */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          {/* Logo */}

          {/* Login Form */}
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-2xl text-black font-bold text-center">Log In</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Email Address
                </label>
                <div className="relative mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email Id"
                    className="w-full border text-black rounded-lg px-4 py-3 pl-3 border-blue-900 shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    className="w-full border text-black rounded-lg px-4 py-3 pl-3 border-blue-900 shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex justify-between items-center text-xs mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" /> Remember Me
                  </label>
                  <a href="#" className="text-red-500 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-900 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition flex justify-center items-center"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          "Log In"
        )}
      </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300 h-0.5"></div>
              <p className="text-sm text-gray-500">OR CONTINUE WITH</p>
              <div className="flex-1 h-px bg-gray-300 h-0.5"></div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center gap-6">
              <button>
                <img
                  src={logo3}
                  alt="Apple"
                  className="w-8 h-8"
                />
              </button>
              <button>
                <img
                  src={logo1}
                  alt="Facebook"
                  className="w-8 h-8"
                />
              </button>
              <button>
                <img
                  src={logo2}
                  alt="Google"
                  className="w-8 h-8"
                />
              </button>
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-gray-600">
              Doesn’t have an account?{" "}
              <Link to="/register" className="text-blue-900 font-semibold">
                Create One
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex-1 hidden rounded-2xl md:flex">
          <img
            src={imagebuy}
            alt="Property"
            className="w-full h-full py-4 rounded-2xl object-cover md:rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
