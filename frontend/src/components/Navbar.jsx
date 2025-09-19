import React from "react";
import { FiSettings } from "react-icons/fi"; // settings icon

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-gray-100 border-b border-gray-300">
      {/* Left Logo + Title */}
      <div className="flex items-center gap-2">
        <span className="w-3.5 h-3.5 bg-green-900 rounded-sm"></span>
        <h1 className="text-sm font-semibold text-green-900">
          eDNA Biodiversity Explorer
        </h1>
      </div>

      {/* Center Navigation */}
      <div className="hidden md:flex gap-6">
        <a href="/" className="text-sm font-medium text-green-900 hover:text-green-600">
          Home
        </a>
        <a href="/datasets" className="text-sm font-medium text-green-900 hover:text-green-600">
          Datasets
        </a>
        <a href="/taxonomy" className="text-sm font-medium text-green-900 hover:text-green-600">
          Taxonomy
        </a>
        <a href="/metrics" className="text-sm font-medium text-green-900 hover:text-green-600">
          Metrics
        </a>
        <a href="/reports" className="text-sm font-medium text-green-900 hover:text-green-600">
          Reports
        </a>
        <a href="/news" className="text-sm font-medium text-green-900 hover:text-green-600">
          Data News
        </a>
      </div>

      {/* Right Icon */}
      <div>
        <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
          <FiSettings size={18} className="text-green-900" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
