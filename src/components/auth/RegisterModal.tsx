/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import {
    FaEnvelope,
    FaLock,
    FaUser,
    FaGoogle,
    FaFacebook,
} from 'react-icons/fa';
import Modal from '../Modal';
import axios from 'axios';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
    showBackground?: boolean;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
    isOpen,
    onClose,
    onSwitchToLogin,
    showBackground = false,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3001/auth/register',
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }
            );
            console.log('Đăng ký thành công:', response.data);
            onClose();
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            alert('Đăng ký thất bại. Vui lòng thử lại!');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Đăng ký tài khoản Waka"
            showBackground={showBackground}
            className="sm:max-w-md">
            <div className="text-center mb-6 flex justify-between">
                <p className="font-bold text-green-500 text-3xl">WAKA</p>
                <p className="text-white-600 align-middle mt-auto mb-auto">
                    Tham gia Waka để khám phá thế giới sách
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white">
                        Tên người dùng
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                         text-black placeholder:text-gray-400 focus:outline-none 
                         focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập tên của bạn"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white">
                        Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                         text-black placeholder:text-gray-400 focus:outline-none 
                         focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Hãy nhập email của bạn"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-white">
                        Mật khẩu
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                         text-black placeholder:text-gray-400 focus:outline-none 
                         focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-white">
                        Xác nhận mật khẩu
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                         text-black placeholder:text-gray-400 focus:outline-none 
                         focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {/* Terms */}
                <div className="flex items-center">
                    <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        required
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                        htmlFor="agreeToTerms"
                        className="ml-2 block text-sm text-white">
                        Tôi đồng ý với{' '}
                        <button
                            type="button"
                            className="font-medium text-blue-400 hover:underline">
                            Điều khoản sử dụng
                        </button>{' '}
                        và{' '}
                        <button
                            type="button"
                            className="font-medium text-blue-400 hover:underline">
                            Chính sách bảo mật
                        </button>
                    </label>
                </div>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent 
                       rounded-md shadow-sm text-sm font-medium text-white 
                       bg-blue-600 hover:bg-blue-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        Đăng ký
                    </button>
                </div>

                {/* Social */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Hoặc đăng ký với
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 
                         rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 
                         hover:bg-gray-50">
                            <FaGoogle className="h-5 w-5" />
                            <span className="ml-2">Google</span>
                        </button>

                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 
                         rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 
                         hover:bg-gray-50">
                            <FaFacebook className="h-5 w-5 text-blue-600" />
                            <span className="ml-2">Facebook</span>
                        </button>
                    </div>
                </div>

                {/* Switch to Login */}
                <div className="text-center mt-6">
                    <p className="text-sm text-white">
                        Đã có tài khoản?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="font-medium text-blue-400 hover:underline">
                            Đăng nhập ngay
                        </button>
                    </p>
                </div>
            </form>
        </Modal>
    );
};

export default RegisterModal;
