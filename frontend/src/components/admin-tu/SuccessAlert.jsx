import React from "react";

const SuccessModal = ({ onClose }) => {
  return (
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
  );
};

export default SuccessModal;
