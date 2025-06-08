// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className=" w-64 h-[calc(100vh-4rem)] bg-gray-900 text-white left-0 p-8 shadow-lg  pt-32">
            {/* 	 */}
            <nav className="flex flex-col space-y-8">
                <Link to="/admin/users" className="hover:text-green-400">
                    Quản lý người dùng
                </Link>
                <Link to="/admin/tags" className="hover:text-green-400">
                    Quản lý danh mục
                </Link>
                <Link to="/admin/books" className="hover:text-green-400">
                    Quản lý sách
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
