// Delete.jsx
import React from "react";

const Delete = ({ onDelete, onCancel }) => {
  return (
    <div className="w-80 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 border">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 border border-green-700">
        <img src="/warning.png" alt="" width="70px" />
      </div>
      <p className="text-lg font-semibold text-center text-gray-900">
        Anda Yakin Ingin Menghapus ?
      </p>
      <div className="w-full flex flex-col space-y-2">
        <button
          onClick={onDelete}
          className="w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
        >
          Ya, Hapus
        </button>
        <button
          onClick={onCancel}
          className="w-full py-2 border border-gray-400 text-black rounded-md hover:bg-gray-100"
        >
          Batalkan
        </button>
      </div>
    </div>
  );
};

export default Delete;
