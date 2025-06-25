import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart,
  FaTags,
} from "react-icons/fa";
import axios from "axios";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { path: "/admin", icon: <FaChartBar />, label: "Dashboard" },
    { path: "/admin/books", icon: <FaBook />, label: "Quản lý sách" },
    {
      path: "/admin/users",
      icon: <FaUsers />,
      label: "Quản lý người dùng",
    },
    { path: "/admin/tags", icon: <FaTags />, label: "Thể loại" },
    // { path: '/admin/settings', icon: <FaCog />, label: 'Cài đặt' },
  ];

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
      localStorage.removeItem("user");

      navigate("/");
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Waka Admin</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
                location.pathname === item.path ? "bg-gray-700 text-white" : ""
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white w-full"
            onClick={() => {
              handleLogout();
            }}
          >
            <span className="mr-3">
              <FaSignOutAlt />
            </span>
            Đăng xuất
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
