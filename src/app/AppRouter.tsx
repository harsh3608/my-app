"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Login from "./components/Login";
import RoomList from "./components/Room/RoomList";
import CustomerList from "./components/Customer/CustomerList";
import Register from "./components/Register";

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
            <Route path="/signup" element={<Register />} />
            <Route path="/rooms" element={<RoomList/>} />
            <Route path="/customers" element={<CustomerList/>} />
          </Routes>
        </main>
      </div>
    </div>
  </Router>
);

export default AppRouter;
