import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../layout/Header";
import { Link } from "react-router-dom";

export default function CheckLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user-status", {
        withCredentials: true,   // IMPORTANT if using Sanctum cookies
      })
      .then((res) => {
        setIsLoggedIn(res.data.logged_in);
        setUser(res.data.user);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  return (
    <div className="">
        <Navbar />
    <div className="text-black text-center mt-20">

      {isLoggedIn ? (
        <h1>Welcome, {user?.name || user?.firstname}</h1>
      ) : (
        <>
        <h1>You are not logged in</h1>
        <Link to="/login" className="text-blue-500 underline">Login here</Link>
        </>
      )}
    </div>
    </div>
  );
}
