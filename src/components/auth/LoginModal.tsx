import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputPassword from "../inputPassword/InputPassword";
import Modal from "../Modal";
import { useUser } from "../../hooks/UserContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { setUser, user } = useUser();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      // ✅ Ghi log toàn bộ response
      console.log("📥 Full response từ backend:", response);
      console.log("🔐 Token nhận được:", response.data?.data?.access_token);
      console.log("👤 User info:", response.data?.data?.user);
      console.log("first", response.data.data.user);

      if (response.status === 201) {
        const { access_token, user } = response.data.data;
        console.log(user);
        // ✅ Lưu vào localStorage
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("idUser", user._id);
        onClose();
        window.location.reload(); // làm mới trang sau đăng nhập
      }
    } catch (err) {
      console.error("❌ Lỗi khi đăng nhập:", err);
      setError("Tài khoản hoặc mật khẩu không đúng");
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="bg-[#222] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title=""
          className="w-full max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4 ">Đăng nhập</h2>

          {/* 🔹 Username */}
          <label className="text-white mb-1 block">Email</label>
          <input
            name="username"
            type="text"
            placeholder="Email"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-500 w-full pl-7 p-2 rounded-lg border outline-none focus:border-blue-500 focus:bg-slate-500  my-0 mb-5"
          />

          {/* 🔹 Password */}
          <label className="text-white mb-1 block">Mật khẩu</label>
          <InputPassword
            value={formData.password}
            handleChange={handleChange}
            onclickIcon={() => {
              setIsShowPassword(!isShowPassword);
            }}
            isShowPassword={isShowPassword}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2"
          >
            Đăng nhập
          </button>

          <p className="mt-4 text-sm text-center">
            Chưa có tài khoản?{" "}
            <span
              onClick={onSwitchToRegister}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Đăng ký
            </span>
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default LoginModal;
