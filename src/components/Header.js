import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logos from "./image/Frame 7.png";
import { User } from "lucide-react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const auth = getAuth();

  // Monitor Firebase login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (err) {
      console.error("Sign out error:", err.message);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/buy", label: "Buy" },
    { path: "/rent", label: "Rent" },
    { path: "/sell", label: "Sell" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-white w-full z-10 px-3 py-4 sm:p-6">
      <nav className="flex flex-row justify-between items-center lg:mx-7">
        {/* Logo */}
        <Link to={"/"}>
          <img src={logos} alt="logo" width={140} height={80} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-sans font-normal py-2 transition-all duration-300 ${
                  isActive ? "text-blue-500" : "text-black hover:text-blue-400"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 bottom-2 h-[2px] w-full transition-transform duration-300 ${
                    isActive
                      ? "bg-blue-500 scale-x-100"
                      : "bg-blue-400 scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ transformOrigin: "left" }}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="md:block hidden">
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-24 font-bold mx-auto bg-red-600 text-white px-5 py-2 text-sm md:text-[13px] rounded-full flex items-center gap-2 hover:bg-red-700"
              >
                Sign Out
              </button>
            ) : (
              <button className="w-40 mx-auto bg-blue-700 text-white px-5 py-2 text-sm md:text-[13px] rounded-full flex items-center gap-2 hover:bg-blue-800">
                <Link to="/login" className="flex items-center gap-2">
                  Login / Register <User className="w-4 h-4" />
                </Link>
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenu(!menu)}
            className="md:hidden flex text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menu && (
        <div className="bg-black md:hidden h-full w-full fixed top-0 right-0 bg-opacity-70 backdrop-blur-md p-6 z-50 shadow-lg">
          <div className="w-72 bg-black p-6 h-full fixed top-0 right-0 z-50 shadow-lg">
            <button
              onClick={() => setMenu(false)}
              className="text-white mb-6 float-right"
            >
              ✕
            </button>
            <ul className="flex flex-col gap-4 mt-12">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setMenu(false)}
                      className={`relative block text-sm py-2 transition-all duration-300 ${
                        isActive
                          ? "text-blue-500"
                          : "text-white hover:text-blue-400"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] w-full transition-transform duration-300 ${
                          isActive
                            ? "bg-blue-500 scale-x-100"
                            : "bg-blue-400 scale-x-0 hover:scale-x-100"
                        }`}
                        style={{ transformOrigin: "left" }}
                      ></span>
                    </Link>
                  </li>
                );
              })}

              <div className="block md:hidden mt-6">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 w-28 font-bold text-white px-5 py-2 text-sm rounded-full flex items-center gap-2 hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-blue-700 w-44 text-white px-5 py-2 text-sm rounded-full flex items-center gap-2 hover:bg-blue-800"
                  >
                    Login / Register <User className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
