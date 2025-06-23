"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Use custom SVG icon for sidebar toggle
  const CustomMenuIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="128" height="128" rx="32" fill="#000" />
      <rect x="32" y="40" width="64" height="8" rx="4" fill="#fff" />
      <rect x="32" y="60" width="64" height="8" rx="4" fill="#fff" />
      <rect x="32" y="80" width="64" height="8" rx="4" fill="#fff" />
    </svg>
  );

  return (
    <aside
      className={`h-full bg-gray-900 text-white flex flex-col py-6 px-2 space-y-4 transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex justify-end mb-4">
        <IconButton
          onClick={() => setCollapsed((c) => !c)}
          size="large"
          className="text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300 rounded-full p-1"
        >
          <CustomMenuIcon />
        </IconButton>
      </div>
      <nav className="flex flex-col space-y-2">
        <Link
          to="/"
          className="hover:bg-gray-700 rounded px-3 py-2 flex items-center justify-start"
        >
          <span className={collapsed ? "hidden" : "block"}>Home</span>
        </Link>
        <Link
          to="/login"
          className="hover:bg-gray-700 rounded px-3 py-2 flex items-center justify-start"
        >
          <span className={collapsed ? "hidden" : "block"}>Login</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
