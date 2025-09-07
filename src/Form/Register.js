import { useState } from "react";
import { Mail, Lock, Home, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase"; // ✅ make sure firebase.js exports auth & db
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import imagebuy from "./image/Rectangle 1 (2).png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "bottom-center" });
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }

      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });

      navigate("/login"); // ✅ redirect to login page
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
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

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Section - Form */}
        <div className="flex-1 flex flex-col my-10 justify-center px-8 md:px-16 lg:px-24">
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-2xl text-black font-bold text-center">
              Create new account
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-black">
                  First Name
                </label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="Enter First Name"
                  required
                  className="w-full border text-black rounded-lg px-4 py-3 border-blue-900 shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  placeholder="Enter Last Name"
                  required
                  className="w-full border text-black rounded-lg px-4 py-3 border-blue-900 shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                  className="w-full border text-black rounded-lg px-4 py-3 border-blue-900 shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  required
                  className="w-full border rounded-lg px-4 py-3 text-black  border-blue-900 shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Your Password"
                  required
                  className="w-full border rounded-lg px-4 text-black py-3 border-blue-900 shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition flex items-center justify-center"
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
                  "Create Account"
                )}
              </button>
            </form>

            {/* Redirect to Login */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-900 font-semibold">
                Log In
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
