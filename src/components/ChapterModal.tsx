import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Chapter {
    _id: string;
    title: string;
}

interface ChapterModalProps {
    bookTitle: string;
    chapters: Chapter[];
    onClose: () => void;
    onAdd: () => void;
    onEdit: (chapterId: string) => void;
    onDelete: (chapterId: string) => void;
}

const ChapterModal: React.FC<ChapterModalProps> = ({
    bookTitle,
    chapters,
    onClose,
    onAdd,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <h2 className="text-xl font-semibold mb-4">
                    Danh sách chương – {bookTitle}
                </h2>
                <ul className="max-h-64 overflow-y-auto divide-y">
                    {chapters.length > 0 ? (
                        chapters.map((chapter) => (
                            <li
                                key={chapter._id}
                                className="flex justify-between items-center py-2">
                                <span>{chapter.title}</span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => onEdit(chapter._id)}
                                        className="text-blue-600 hover:text-blue-800">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDelete(chapter._id)}
                                        className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Không có chương nào</p>
                    )}
                </ul>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={onAdd}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        + Thêm chương
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-black font-semibold">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChapterModal;
