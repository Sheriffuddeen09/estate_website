import { Route, Routes } from "react-router-dom";

import LoginPage from "./Form/LoginPage";
import RegisterPage from "./Form/Register";
import HomePage from './pages/Home'
import NotFound from "./layout/Notfound";
import BuyPage from "./pages/BuyPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ForgotPassword from "./Form/ForgetPassword";
import ResetPassword from "./Form/ResetPassword";
import AdimForm from "./Form/AdminForm";
import TermsForm from "./Form/TermsForm";

   
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

      {/* Forget Password */}
      <Route path="/forget-password" element={
          <ForgotPassword />
      } />

      {/* Forget Password */}
      <Route path="/reset-password" element={
          <ResetPassword />
      } />

      <Route path="/admin/form" element={
          <AdimForm />
      } />

      <Route path="/terms/form" element={
          <TermsForm />
      } />

       <Route path="*" element={<NotFound />} />

      </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
