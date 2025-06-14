import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaSearch,
    FaUserCircle,
    FaShoppingCart,
    FaSignOutAlt,
} from 'react-icons/fa';
import axios from 'axios'; // ✅ Thêm dòng này
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

const Header: React.FC = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string }>({
        name: '',
        email: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('📦 Token hiện tại:', token);

            if (token) {
                await axios.post(
                    'http://localhost:3001/auth/logout',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            setUser({ name: '', email: '' });
            setIsUserMenuOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Lỗi khi logout:', error);
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

    return (
        <>
            <header className="fixed h-auto top-0 left-0 w-full z-40 bg-[#18191A] bg-opacity-75 backdrop-blur-md shadow text-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex-shrink-0 text-white">
                            <span className="h-12 font-bold text-3xl text-green-600">
                                WAKA
                            </span>
                        </Link>

                        <nav className="hidden md:flex space-x-8">
                            <Link
                                to="/ebooks"
                                className="text-white hover:text-blue-600">
                                Sách điện tử
                            </Link>
                            <Link
                                to="/audiobooks"
                                className="text-white hover:text-blue-600">
                                Sách nói
                            </Link>
                            <Link
                                to="/free-books"
                                className="text-white hover:text-blue-600">
                                Sách miễn phí
                            </Link>
                            <Link
                                to="/summaries"
                                className="text-white hover:text-blue-600">
                                Sách tóm tắt
                            </Link>
                            <Link
                                to="/podcasts"
                                className="text-white hover:text-blue-600">
                                Podcast
                            </Link>
                        </nav>

                        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sách..."
                                    className="text-black w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                to="/cart"
                                className="text-white/25 hover:text-white">
                                <FaShoppingCart className="w-6 h-6" />
                            </Link>

                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setIsUserMenuOpen(!isUserMenuOpen)
                                        }
                                        className="flex items-center space-x-2 text-white hover:text-blue-600">
                                        <FaUserCircle className="w-6 h-6" />
                                        <span className="hidden md:inline">
                                            {user.name}
                                        </span>
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() =>
                                                    setIsUserMenuOpen(false)
                                                }>
                                                Thông tin cá nhân
                                            </Link>
                                            <Link
                                                to="/orders"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() =>
                                                    setIsUserMenuOpen(false)
                                                }>
                                                Đơn hàng của tôi
                                            </Link>
                                            <Link
                                                to="/wishlist"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() =>
                                                    setIsUserMenuOpen(false)
                                                }>
                                                Sách yêu thích
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                                        className="text-white/25 hover:text-white">
                                        Đăng nhập
                                    </button>
                                    <button
                                        onClick={handleRegister}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
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
