import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios"; // ✅ Thêm dòng này
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import { Book, Tag } from "../../types";
import SearchHeader from "../searchHeader/SearchHeader";
import { useUser } from "../../hooks/UserContext";

const Header: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);

  const [userLogin, setUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const { user } = useUser();
  useEffect(() => {
    fetchTags();
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("📦 Token hiện tại:", token);

      if (token) {
        await axios.post(
          "http://localhost:3001/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      localStorage.removeItem("token");
      localStorage.removeItem("userLogin");
      setIsAuthenticated(false);
      setUser({ name: "", email: "" });
      setIsUserMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };
  const handleLogin = () => setIsLoginModalOpen(true);
  const handleRegister = () => setIsRegisterModalOpen(true);

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setTimeout(() => setIsRegisterModalOpen(true), 150);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setTimeout(() => setIsLoginModalOpen(true), 150);
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get("http://localhost:3001/tags");
      setTags(res.data?.data?.result);
      console.log("tag", tags);
    } catch (err) {
      console.error("Lỗi khi lấy tags:", err);
    }
  };

  return (
    <>
      <header className="fixed h-auto top-0 left-0 w-full z-40 bg-[#18191A] bg-opacity-75 backdrop-blur-md shadow text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0 text-white">
              <span className="h-12 font-bold text-3xl text-green-600">
                WAKAkKa
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link to="/ebooks" className="text-white hover:text-blue-600">
                Sách nổi bật
              </Link>
              <div className="group relative inline-block text-left">
                <div className="text-white hover:text-blue-600">Thể loại</div>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 absolute left-0 mt-2 w-[700px] bg-neutral-900 text-white p-6 rounded-xl shadow-xl z-50">
                  <div className="grid grid-cols-3 gap-x-8 gap-y-3 text-sm">
                    {tags.map((e) => (
                      <div
                        key={e.name}
                        className="flex items-center gap-1"
                        onClick={() => navigate(`/categoriesBook/${e._id}`)}
                      >
                        <span className="hover:underline cursor-pointer">
                          {e.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/audiobooks" className="text-white hover:text-blue-600">
                Sách miễn phí
              </Link>
            </nav>

            <SearchHeader></SearchHeader>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-blue-600"
                  >
                    <FaUserCircle className="w-6 h-6" />
                    <span className="hidden md:inline">{userLogin.name}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Thông tin cá nhân
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Quản lí Admin
                        </Link>
                      )}
                      {/* <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sách yêu thích
                      </Link> */}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="inline mr-2" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogin}
                    className="text-white/25 hover:text-white"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={handleRegister}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Header;
