import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const CustomInput = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col relative">
      <label className="mb-1 text-gray-300">{label}</label>
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none text-white"
      />
      {type === "password" && (
        <span
          className="absolute right-3 top-10 cursor-pointer text-gray-200"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
