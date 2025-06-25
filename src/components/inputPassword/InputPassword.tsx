import React from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const InputPassword: React.FC<any> = ({
  value,
  handleChange,
  isShowPassword = true,
  onclickIcon,
  placeholder = "Mật khẩu",
  name = "password",
}) => {
  return (
    <div className="relative">
      <input
        name={name}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="bg-gray-500 w-full pl-7 p-2 rounded-lg border outline-none focus:border-blue-500 focus:bg-slate-500  my-3 "
      />
      <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
        <FaLock className="h-5 w-5 text-white" />
      </div>
      <div
        className="absolute right-0 pr-3 top-6 cursor-pointer"
        onClick={onclickIcon}
      >
        {isShowPassword ? <FaEye /> : <FaEyeSlash />}
      </div>
    </div>
  );
};
export default InputPassword;
