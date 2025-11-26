import {Home, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import imagebuy from './image/path_islam.png'
import axios from "axios";
import ImageSlider from "./ImageSlider";


export default function LoginPage() {

 const [steps, setSteps] = useState(1);
 const [menuOpen, setMenuOpen] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // OTP
  const [otpBoxes, setOtpBoxes] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const clearError = (field) => {
    setErrors(prev =>({...prev, [field]: ''}))
  }

  const handleLoginNext = async () => {
    const newErrors = {};

    if (!loginEmail) newErrors.email = "Email is required";
    if (!loginPassword) newErrors.loginPassword = "Password is required";


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    

    try {
    setLoading(true);
    await axios.post('/api/send-login-otp', {
      email: loginEmail
    })
    setSteps(2);
  }

  catch (err) {
      setErrors({ email: "Failed to send OTP. Try again." });
    } finally {
      setLoading(false);
    }

  }

  const verifyOtpLogin = async () => {

    setLoading(true)
    const otp = otpBoxes.join('')
    
      if (otp.length !== 6){
        setErrors({ otp: "Enter full 6-digit code" });
      setLoading(false);
      return;
    }

    try{

    await axios.post('/api/send-otp', {
      email: loginEmail,
      otp
    })

    const loginRes = await axios.post('/api/login', {
      email: loginEmail,
      password: loginPassword,
      remember
    })
    localStorage.setItem("token", loginRes.data.token)
    window.location.href = "/dashboard";
    } catch (err) {
      setErrors({ otp: "Invalid OTP. Try again" });
    } finally {
      setLoading(false);
    }   
  }

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const updated = [...otpBoxes];
    updated[index] = value;
    setOtpBoxes(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpBoxes[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };



  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation */}
      <header className="flex justify-between items-center shadow-md py-4 px-8 md:px-16 lg:px-24 border-b relative">
      {/* Left - Homepage */}
      <Link
        to="/"
        className="hidden md:flex items-center gap-2 text-gray-600 border border-blue-600 px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition"
      >
        ← Homepage
      </Link>

      {/* Center Logo */}
       <p className="font-bold text-black text-lg font-serif flex items-center gap-3">
        <Home /> Islam Path Of Knowledge
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

      <div className="wrapper flex flex-col items-center block sm:hidden">
      <p className="text-2xl welcome font-bold text-black mt-5 mb-2">Kick Start Your Study</p>
      <ul className="dynamic mt-1 mb-">
        <ol><main>Islam Path of Knowledge</main></ol>
      </ul>
    </div>

      {/* Main Content - Login + Image */}
      <div className="flex flex-1 flex-col items-center md:flex-row">
        {/* Left Section - Form */}
<div className="flex flex-1 flex-col justify-center items-center p-6">
        <div className="sm:w-full w-80 sm:max-w-md p-6 border border-blue-200 shadow-xl rounded-lg">

          {/* STEP 1 — Email + Password */}
          {steps === 1 && (
            <>
              <h2 className="text-2xl font-bold text-center text-black mb-6">
                
              </h2>

              {/* Email */}
              <div className="mb-6 relative">
                <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-blue-500 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border bg-white outline-0 focus:bg-white border-blue-200 text-black px-4 py-3 rounded"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    clearError("email");
                  }}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6 relative">
                <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-blue-500 font-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border bg-white outline-0 border-blue-200 text-black px-4 py-3 rounded"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    clearError("password");
                  }}
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex justify-between pt-2 items-center text-xs mt-2">
              <label className="flex items-center text-sm gap-2 mb-6 text-black">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Remember me
              </label>
              <Link to={'/forget_password'} className="text-blue-500 font-semibold hover:text-blue-700">
                Forgot Password?
              </Link>
              </div>

              {/* NEXT */}
              <button
                onClick={handleLoginNext}
                className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 hover:scale-105"
              >
                {loading ? "Sending OTP..." : "Login"}
              </button>

               <div className="flex items-center my-5 gap-4">
              <div className="flex-1 h-px bg-gray-300 h-0.5"></div>
              <p className="text-sm text-gray-500">OR CONTINUE WITH</p>
              <div className="flex-1 h-px bg-gray-300 h-0.5"></div>
            </div>

            <p className="text-center text-xs text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-900 text-xs font-semibold">
                Create Account
              </Link>
            </p>
            </>
          )}

          {/* STEP 2 — OTP Verification */}
          {steps === 2 && (
            <>
              <button
                className="px-4 py-2 text-black rounded opacity-60"
                onClick={() => setSteps(1)}
              >
                ← Back
              </button>

              <h2 className="text-2xl font-bold text-black text-center">
                Verify your login
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                Enter the 6-digit code sent to your email
              </p>

              <div className="mt-6 flex gap-3 mx-auto justify-center">
                {otpBoxes.map((val, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={val}
                    maxLength={1}
                    // onChange={(e) =>
                    //   handleOtpChange(e.target.value, i)
                    // }
                    // onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-14 h-14 text-center text-black border rounded text-xl"
                  />
                ))}
              </div>

              {errors.otp && (
                <p className="text-red-600 text-xs mt-2">{errors.otp}</p>
              )}

              <button
                className="mt-6 px-4 py-2 bg-blue-700 float-right text-white rounded hover:bg-blue-800 hover:scale-105"
                onClick={verifyOtpLogin}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}
        </div>
        
      </div>

        {/* Right Section - Image */}
        <div className="flex-1 hidden rounded-2xl lg:flex">
          <ImageSlider images={[imagebuy, imagebuy, imagebuy, imagebuy]} />
        </div>
      </div>
    </div>
  );
}
