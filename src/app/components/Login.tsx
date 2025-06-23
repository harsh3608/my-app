"use client";

import React from "react";
import { Button } from "./ui/button";
import LoginIcon from "@mui/icons-material/Login";

const Login: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
    <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center mx-4">
      <div className="flex items-center gap-2 mb-6">
        <LoginIcon fontSize="large" className="text-blue-600" />
        <h2 className="text-3xl font-extrabold text-gray-800">Sign in to your account</h2>
      </div>
      <form className="flex flex-col space-y-5 w-full">
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-500 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
        >
          <LoginIcon fontSize="small" /> Login
        </Button>
      </form>
      <div className="mt-6 text-gray-500 text-sm">
        <span>Don't have an account?</span>
        <a href="#" className="ml-2 text-blue-600 hover:underline font-medium">Sign up</a>
      </div>
    </div>
  </div>
);

export default Login;
