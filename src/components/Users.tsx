/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    isPremium: boolean;
}

interface Meta {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit] = useState<number>(5);

    const fetchData = async (page = 1) => {
        try {
            const res = await axios.get('http://localhost:3001/users', {
                params: {
                    page,
                    limit,
                },
            });
            const { result, meta } = res.data.data;
            setUsers(result);
            setMeta(meta);
            setCurrentPage(page);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    return (
        <div className="bg-white rounded shadow-md max-w-7xl mx-auto mt-8 w-[100%] p-8 m-8">
            <div className="text-2xl font-bold mb-6 flex justify-between w-[100%]">
                <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>
                <button className="bg-yellow-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs mr-2">
                    Thêm mới
                </button>
            </div>

            {meta && (
                <p className="mb-4 text-sm text-gray-500">
                    Trang {meta.current} / {meta.pages} — Tổng: {meta.total}{' '}
                    người dùng
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">STT</th>
                            <th className="px-4 py-2 border">Tên</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Role</th>
                            <th className="px-4 py-2 border">Premium</th>
                            <th className="px-4 py-2 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border text-center">
                                    {(currentPage - 1) * limit + idx + 1}
                                </td>
                                <td className="px-4 py-2 border">
                                    {user.name}
                                </td>
                                <td className="px-4 py-2 border">
                                    {user.email}
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    {user.role}
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    {user.isPremium ? '✅' : '❌'}
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                                        Sửa
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs ml-2">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-4 text-gray-500">
                                    Không có người dùng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {meta && meta.pages > 1 && (
                <div className="mt-4 flex justify-center items-center space-x-4">
                    <button
                        onClick={() => fetchData(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">
                        ← Trước
                    </button>
                    <span className="text-sm">
                        Trang {currentPage} / {meta.pages}
                    </span>
                    <button
                        onClick={() => fetchData(currentPage + 1)}
                        disabled={currentPage === meta.pages}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">
                        Sau →
                    </button>
                </div>
            )}
        </div>
    );
};

export default Users;
