import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaBook, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <FaChartBar />, label: 'Dashboard' },
    { path: '/admin/books', icon: <FaBook />, label: 'Quản lý sách' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Quản lý người dùng' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Cài đặt' },
  ];

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
                location.pathname === item.path ? 'bg-gray-700 text-white' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white w-full"
            onClick={() => {/* Handle logout */}}
          >
            <span className="mr-3"><FaSignOutAlt /></span>
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