import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // true nếu token tồn tại, false nếu không
    }, []);
    console.log(isLoggedIn);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <header className="fixed z-50 h-16 opacity-50 w-screen bg-[#141414] text-white px-6 py-3 flex items-center justify-between shadow">
            <div
                className="flex items-center space-x-2 ps-2 cursor-pointer"
                onClick={() => navigate('/')}>
                <span className="font-bold text-3xl text-green-600">Waka</span>
            </div>

            <nav className="flex space-x-6 text-sm font-semibold">
                <a href="#">Sách điện tử</a>
                <a href="#">Sách hội viên</a>
                <a href="#">Sách hiệu sối</a>
                <a href="#">Waka Shop</a>
                <a href="#">Sách nói</a>
                <a href="#">Podcast</a>
                <a href="#">Xem thêm</a>
            </nav>

            <div className="flex items-center space-x-3">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium border border-yellow-600">
                    Gói cước
                </button>

                {!isLoggedIn ? (
                    <>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-[#3a3a3a] text-white px-4 py-1 rounded-full text-sm">
                            Đăng ký
                        </button>

                        <button
                            onClick={() => navigate('/login')}
                            className="bg-[#00B396] text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Đăng nhập
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Đăng xuất
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
