import React from "react";

const AddAlert = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="w-80 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 border">
        <div
          className="w-24 h-24 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full">
            <img src="/check.png" alt="Success Icon" width="40px" />
          </div>
        </div>
        <p className="text-lg font-semibold text-center text-gray-900">
          Berhasil Ditambahkan!
        </p>
        <div className="w-full">
          <button
            onClick={onClose}
            className="w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
          >
            Oke!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAlert;
