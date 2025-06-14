import React, { useState } from 'react';
import axios from 'axios';

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
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3001/auth/login',
                {
                    username: formData.username,
                    password: formData.password,
                }
            );

            // ✅ Ghi log toàn bộ response
            console.log('📥 Full response từ backend:', response);
            console.log(
                '🔐 Token nhận được:',
                response.data?.data?.access_token
            );
            console.log('👤 User info:', response.data?.data?.user);

            if (response.status === 201) {
                const { access_token, user } = response.data.data;

                // ✅ Lưu vào localStorage
                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user));

                onClose();
                window.location.reload(); // làm mới trang sau đăng nhập
            }
        } catch (err) {
            console.error('❌ Lỗi khi đăng nhập:', err);
            setError('Tài khoản hoặc mật khẩu không đúng');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#222] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
                <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>

                {/* 🔹 Username */}
                <label className="text-white mb-1 block">Tên đăng nhập</label>
                <input
                    name="username"
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded text-black"
                />

                {/* 🔹 Password */}
                <label className="text-white mb-1 block">Mật khẩu</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded text-black"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Đăng nhập
                </button>

                <p className="mt-4 text-sm text-center">
                    Chưa có tài khoản?{' '}
                    <span
                        onClick={onSwitchToRegister}
                        className="text-blue-400 cursor-pointer hover:underline">
                        Đăng ký
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
