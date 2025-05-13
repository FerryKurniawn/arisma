import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:2000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role == "ADMIN") {
          navigate("/admin/beranda-admin");
        } else if (data.user.role == "KEPSEK") {
          navigate("/kepsek/beranda-kepsek");
        }
      } else {
        setError(data.message || "Terjadi kesalahan");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg flex p-10 max-w-4xl w-full relative z-10">
        <div className="flex justify-center items-center w-1/2">
          <img src="man1.png" alt="Logo" className="w-65" />
        </div>

        <div className="w-1/2 px-6">
          <p className="text-center mt-2 text-gray-700 flex flex-col">
            <strong className="text-[25px]">ARISMA</strong>
            <strong className="text-[20 px]">
              ARSIP DIGITAL MADRASAH ALIYAH <br></br>NEGERI 1 SINTANG
            </strong>
            .
          </p>
          <form className="mt-6" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 pr-10 ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img src="visibility.png" alt="" width="21px" />
                  ) : (
                    <img src="invisible-symbol.png" alt="" width="18px" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-2 rounded-full transition"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
