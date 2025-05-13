import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmLogout from "./ConfirmLogout"; // Import komponen konfirmasi

function Logout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // State untuk popup
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          <span className="text-sm font-medium">
            {user ? user.username : "Loading..."}
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {openDropdown && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
            <button
              onClick={() => {
                setOpenDropdown(false);
                setShowConfirm(true); // Tampilkan konfirmasi logout
              }}
              className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmLogout
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}

export default Logout;
