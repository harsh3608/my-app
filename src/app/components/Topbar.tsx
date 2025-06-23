"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import LoginIcon from "@mui/icons-material/Login";

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-16 bg-gray-800 text-white flex items-center px-6 py-4 shadow justify-between">
      <h1 className="text-xl font-bold">My App</h1>
      <Button
        variant="outline"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300 flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-base"
        onClick={() => navigate("/login")}
      >
        <LoginIcon fontSize="small" className="mr-1" /> Login
      </Button>
    </header>
  );
};

export default Topbar;
