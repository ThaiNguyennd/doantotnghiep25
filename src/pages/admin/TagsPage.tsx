import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Tag {
    _id: string;
    name: string;
    description: string;
    createdBy?: { email: string };
    updatedBy?: { email: string };
    isDeleted: boolean;
}

const TagsPage: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const fetchTags = () => {
        axios
            .get('http://localhost:3001/tags')
            .then((res) => {
                setTags(res.data.data.result);
            })
            .catch((err) => {
                console.error('Lỗi khi load tags:', err);
                alert('Không thể tải danh sách thẻ!');
            });
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá thẻ này không?')) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Bạn chưa đăng nhập!');
                return;
            }

            await axios.delete(`http://localhost:3001/tags/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTags((prev) => prev.filter((tag) => tag._id !== id));
        } catch (error: any) {
            console.error('Lỗi xoá:', error);
            alert(
                'Không thể xoá thẻ! Kiểm tra lại đăng nhập hoặc quyền truy cập.'
            );
        }
    };

    const handleAdd = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Bạn chưa đăng nhập!');
                return;
            }

            await axios.post(
                'http://localhost:3001/tags',
                {
                    name: newName,
                    description: newDesc,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTags();
            setIsAddModalOpen(false);
            setNewName('');
            setNewDesc('');
        } catch (err) {
            console.error('Lỗi thêm thẻ:', err);
            alert('Không thể thêm thẻ!');
        }
    };

    const handleEdit = (id: string) => {
        console.log('Edit tag:', id);
        // Chưa có modal sửa, nếu cần tao làm tiếp
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quản lý Thẻ</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow">
                    <FaPlus /> Thêm thẻ mới
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-md shadow">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">
                                Tên thẻ
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Mô tả
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Người tạo
                            </th>
                            <th className="px-4 py-3 text-center font-medium">
                                Trạng thái
                            </th>
                            <th className="px-4 py-3 text-center font-medium">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((tag) => (
                            <tr
                                key={tag._id}
                                className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">{tag.name}</td>
                                <td className="px-4 py-3">{tag.description}</td>
                                <td className="px-4 py-3">
                                    {tag.createdBy?.email ||
                                        tag.updatedBy?.email ||
                                        '—'}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                                            tag.isDeleted
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                        {tag.isDeleted
                                            ? 'Đã xoá'
                                            : 'Đang hoạt động'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => handleEdit(tag._id)}
                                            className="text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Sửa
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(tag._id)
                                            }
                                            className="text-red-600 hover:underline flex items-center gap-1">
                                            <FaTrash /> Xoá
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {tags.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center text-gray-500 py-6">
                                    Không có thẻ nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm Thẻ */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4">
                            Thêm thẻ mới
                        </h2>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">
                                Tên thẻ
                            </label>
                            <input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full border p-2 rounded mt-1"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">
                                Mô tả
                            </label>
                            <input
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                                className="w-full border p-2 rounded mt-1"
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                Huỷ
                            </button>
                            <button
                                onClick={handleAdd}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Thêm
                            </button>
                        </div>
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold">
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TagsPage;
