import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

interface User {
    _id: string;
    name: string;
    email: string;
    role?: string;
    isDeleted?: boolean;
    isPremium?: boolean;
    createdAt: string;
}

interface ApiResponse {
    data: {
        result: User[];
        meta: {
            current: number;
            pageSize: number;
            total: number;
            pages: number;
        };
    };
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        isPremium: true,
    });
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:3001/users');
            const json: ApiResponse = await res.json();
            setUsers(json.data.result || []);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3001/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                setUsers((prev) => prev.filter((u) => u._id !== id));
            } else {
                const data = await res.json();
                alert(`Xóa thất bại: ${data.message || 'Lỗi không xác định'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Lỗi khi xóa người dùng');
        }
    };

    const handleCreateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });

            if (res.ok) {
                setShowModal(false);
                setNewUser({
                    name: '',
                    email: '',
                    role: 'user',
                    password: '',
                    isPremium: true,
                });
                fetchUsers();
            } else {
                const data = await res.json();
                alert(`Tạo thất bại: ${data.message || 'Lỗi không xác định'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Lỗi khi tạo người dùng');
        }
    };

    const handleUpdateUser = async () => {
        if (!editingUser) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `http://localhost:3001/users/${editingUser._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: editingUser.name,
                        email: editingUser.email,
                        role: editingUser.role,
                        isPremium: editingUser.isPremium,
                    }),
                }
            );

            if (res.ok) {
                setEditingUser(null);
                fetchUsers();
            } else {
                const data = await res.json();
                alert(
                    `Cập nhật thất bại: ${data.message || 'Lỗi không xác định'}`
                );
            }
        } catch (err) {
            console.error(err);
            alert('Lỗi khi cập nhật người dùng');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Quản lý người dùng
                </h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                    onClick={() => setShowModal(true)}>
                    <FaUserPlus className="mr-2" />
                    Thêm người dùng
                </button>
            </div>

            {/* Bảng người dùng */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {[
                                'Tên',
                                'Email',
                                'Vai trò',
                                'Hội viên',
                                'Trạng thái',
                                'Ngày tham gia',
                                'Thao tác',
                            ].map((title, i) => (
                                <th
                                    key={i}
                                    className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase ${
                                        i === 6 ? 'text-right' : 'text-left'
                                    }`}>
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => {
                            const isActive = !user.isDeleted;
                            const isPremium = user.isPremium;

                            return (
                                <tr key={user._id}>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                                user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role === 'admin'
                                                ? 'Admin'
                                                : 'User'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                                isPremium
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {isPremium
                                                ? 'Hội viên'
                                                : 'Miễn phí'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                                isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {isActive
                                                ? 'Đang hoạt động'
                                                : 'Không hoạt động'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setEditingUser(user)}
                                            className="text-blue-600 hover:text-blue-900 mr-4">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(user._id)
                                            }
                                            className="text-red-600 hover:text-red-900">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal thêm người dùng */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Thêm người dùng
                        </h2>
                        <input
                            className="border px-4 py-2 rounded w-full mb-3"
                            placeholder="Tên"
                            value={newUser.name}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    name: e.target.value,
                                })
                            }
                        />
                        <input
                            className="border px-4 py-2 rounded w-full mb-3"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    email: e.target.value,
                                })
                            }
                        />
                        <input
                            className="border px-4 py-2 rounded w-full mb-3"
                            type="password"
                            placeholder="Mật khẩu"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value,
                                })
                            }
                        />
                        <select
                            className="border px-4 py-2 rounded w-full mb-3"
                            value={newUser.role}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    role: e.target.value,
                                })
                            }>
                            <option value="user">member</option>
                            <option value="admin">admin</option>
                        </select>
                        <select
                            className="border px-4 py-2 rounded w-full mb-4"
                            value={newUser.isPremium ? 'true' : 'false'}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    isPremium: e.target.value === 'true',
                                })
                            }>
                            <option value="true">Hội viên</option>
                            <option value="false">Miễn phí</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600">
                                Hủy
                            </button>
                            <button
                                onClick={handleCreateUser}
                                className="bg-blue-600 text-white px-4 py-2 rounded">
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal sửa người dùng */}
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Sửa người dùng
                        </h2>
                        <input
                            className="border px-4 py-2 rounded w-full mb-3"
                            placeholder="Tên"
                            value={editingUser.name}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    name: e.target.value,
                                })
                            }
                        />
                        <input
                            className="border px-4 py-2 rounded w-full mb-3"
                            placeholder="Email"
                            value={editingUser.email}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    email: e.target.value,
                                })
                            }
                        />
                        <select
                            className="border px-4 py-2 rounded w-full mb-3"
                            value={editingUser.role}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    role: e.target.value,
                                })
                            }>
                            <option value="user">member</option>
                            <option value="admin">admin</option>
                        </select>
                        <select
                            className="border px-4 py-2 rounded w-full mb-4"
                            value={editingUser.isPremium ? 'true' : 'false'}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    isPremium: e.target.value === 'true',
                                })
                            }>
                            <option value="true">Hội viên</option>
                            <option value="false">Miễn phí</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="px-4 py-2 text-gray-600">
                                Hủy
                            </button>
                            <button
                                onClick={handleUpdateUser}
                                className="bg-blue-600 text-white px-4 py-2 rounded">
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
