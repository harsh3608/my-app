"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Login from "./components/Login";

const AppRouter: React.FC = () => (
  <Router>
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  </Router>
);

export default AppRouter;
