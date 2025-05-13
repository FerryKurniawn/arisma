import React from "react";

const ConfirmLogout = ({ onConfirm, onCancel }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // inline background
    >
      <div className="w-80 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 border">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-300">
          <img src="/warning.png" alt="Warning Icon" width="40px" />
        </div>
        <p className="text-lg font-semibold text-center text-gray-900">
          Anda yakin ingin logout?
        </p>
        <div className="w-full flex flex-col space-y-2">
          <button
            onClick={onConfirm}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Ya, Logout
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2 border border-gray-400 text-black rounded-md hover:bg-gray-100"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogout;
