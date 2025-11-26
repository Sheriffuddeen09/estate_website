import { Route, Routes } from "react-router-dom";

import LoginPage from "./Form/LoginPage";
import RegisterPage from "./Form/Register";
import HomePage from './pages/Home'
import NotFound from "./layout/Notfound";
import BuyPage from "./pages/BuyPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

   
function App() {

  
  return (
    <div className="">
      <Routes>

        {/* register */}
      <Route path="/register" element={
        
        <RegisterPage />
       
      } />

      {/* login */}
      <Route path="/login" element={
        <LoginPage />
    } />

      {/* Home Page*/}
      <Route path="/" element={
          <HomePage />
      } />

      {/* Buy */}
      <Route path="/buy" element={
          <BuyPage />
      } />

       <Route path="*" element={<NotFound />} />

      </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
