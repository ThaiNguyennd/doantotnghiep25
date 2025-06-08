import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3001/auth/login', {
                username,
                password,
            });

            const data = res.data.data;

            console.log(data);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.user.role);
            setMessage('Đăng nhập thành công!');

            setTimeout(() => {
                if (data.user.role === 'ADMIN') {
                    navigate('/admin'); // Trang dành cho admin
                } else {
                    navigate('/'); // Trang dành cho user bình thường
                }
            }, 1000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(
                    'Lỗi: ' + (error.response?.data?.message || error.message)
                );
            } else if (error instanceof Error) {
                setMessage('Lỗi: ' + error.message);
            } else {
                setMessage('Lỗi không xác định');
            }
        }
    };

    return (
        <div className="max-w-sm mx-auto p-8 bg-white rounded shadow-md pt-32">
            <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
            <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Đăng nhập
            </button>
            {message && (
                <p
                    className={`mt-4 text-center ${
                        message.includes('Lỗi')
                            ? 'text-red-600'
                            : 'text-green-600'
                    }`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Login;
