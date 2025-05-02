import React from "react";

const DeleteConfirmationPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-xl p-6 shadow-md text-center w-80">
        {/* Icon peringatan */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-200 border-4 border-green-700 rounded-full w-20 h-20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
              />
            </svg>
          </div>
        </div>

        {/* Teks konfirmasi */}
        <h2 className="text-md font-semibold mb-6">
          Anda Yakin Ingin<br />Menghapus ?
        </h2>

        {/* Tombol Aksi */}
        <div className="flex flex-col gap-3 items-center">
          <button
            onClick={onConfirm}
            className="bg-green-800 text-white w-full py-2 rounded-md hover:bg-green-900 transition"
          >
            Ya, Hapus
          </button>
          <button
            onClick={onCancel}
            className="border border-gray-400 text-black w-full py-2 rounded-md hover:bg-gray-100 transition"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
