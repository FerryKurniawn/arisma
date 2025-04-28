import React, { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Simpan token ke localStorage atau sessionStorage
        localStorage.setItem("token", data.token);

        // Redirect atau handle login sukses
        window.location.href = "/dashboard"; // Misalnya setelah login ke dashboard
      } else {
        // Tampilkan error
        setError(data.message || "Terjadi kesalahan");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan jaringan");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg flex p-10 max-w-4xl w-full relative z-10">
        <div className="flex justify-center items-center w-1/2">
          <img src="man1.png" alt="Logo" className="w-80" />
        </div>

        <div className="w-1/2 px-6">
          <h2 className="text-center text-lg font-semibold">Selamat Datang</h2>
          <p className="text-center mt-2 text-gray-700">
            Halo, Selamat Datang di <strong>ARISMA</strong> (
            <strong>ARSIP DIGITAL MADRASAH ALIYAH NEGERI 1</strong>).
            <br />
            Solusi Cerdas Pengelolaan Arsip Digital Madrasah Aliyah Negeri 1.
          </p>

          {/* Tampilkan error message jika ada */}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <form className="mt-6" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                User name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your User name"
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
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 pr-10"
                  placeholder="Enter your Password"
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

            <div className="flex justify-between items-center mb-6 text-sm">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-2 rounded-full transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
