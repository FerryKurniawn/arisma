import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <span className="text-sm font-medium">
        {user ? user.username : "Loading..."}
      </span>
      <button
        className="border px-3 py-1 rounded text-sm hover:bg-gray-200 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}

export default Logout;
