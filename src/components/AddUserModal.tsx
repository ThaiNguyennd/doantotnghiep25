// 🔹 AddUserModal.tsx
import React, { useState } from 'react';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserAdded: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    isOpen,
    onClose,
    onUserAdded,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(`Thêm thất bại: ${data.message}`);
                return;
            }

            alert('Thêm người dùng thành công!');
            onUserAdded();
            onClose();
        } catch (err) {
            console.error('Lỗi khi thêm người dùng:', err);
            alert('Đã có lỗi xảy ra!');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Thêm người dùng</h2>

                <input
                    name="name"
                    type="text"
                    placeholder="Tên"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded">
                    <option value="user">Người dùng</option>
                    <option value="admin">Quản trị viên</option>
                </select>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-300 rounded">
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded">
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
