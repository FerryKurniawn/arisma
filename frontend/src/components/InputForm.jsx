import React from "react";

const InputForm = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  isTextarea,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <p className="font-medium w-64">{label}</p>
      {/* Jika isTextarea true, gunakan <textarea>, jika tidak gunakan <input> */}
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-3 rounded-md bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300 h-32 resize-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-3 rounded-md bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      )}
    </div>
  );
};

export default InputForm;
