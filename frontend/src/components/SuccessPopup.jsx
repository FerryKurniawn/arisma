import React from "react";

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded-lg p-6 w-72 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="bg-green-700 rounded-full p-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p className="text-lg font-semibold mb-4">Berhasil Ditambahkan!</p>
        <button
          onClick={onClose}
          className="bg-green-800 text-white py-2 px-4 rounded w-full hover:bg-green-900"
        >
          Oke!
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
