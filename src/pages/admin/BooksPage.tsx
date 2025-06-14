import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaList } from 'react-icons/fa';
import ChapterModal from '../../components/ChapterModal';

interface Book {
    _id: string;
    title: string;
    author: string;
    cover: string;
    tags?: { name: string };
    isPremium: boolean;
    isDeleted: boolean;
}

interface Chapter {
    _id: string;
    title: string;
}

const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [showChaptersForBookId, setShowChaptersForBookId] = useState<
        string | null
    >(null);
    const [currentBookTitle, setCurrentBookTitle] = useState<string>('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get('http://localhost:3001/books').then((res) => {
            setBooks(res.data?.data?.result || []);
        });
    };

    const handleDeleteBook = async (bookId: string) => {
        if (confirm('Xác nhận xoá sách này?')) {
            await axios.delete(`http://localhost:3001/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchBooks();
        }
    };

    const handleShowChapters = async (bookId: string) => {
        const res = await axios.get(
            `http://localhost:3001/chapters/by-book/${bookId}`
        );
        const book = books.find((b) => b._id === bookId);
        setChapters(res.data.data || []);
        setShowChaptersForBookId(bookId);
        setCurrentBookTitle(book?.title || 'Không rõ');
    };

    const closeChapterModal = () => {
        setShowChaptersForBookId(null);
        setChapters([]);
    };

    const handleAddChapter = () => {
        alert('Thêm chương cho sách: ' + currentBookTitle);
    };

    const handleEditChapter = (chapterId: string) => {
        alert('Sửa chương: ' + chapterId);
    };

    const handleDeleteChapter = (chapterId: string) => {
        if (confirm('Xoá chương này?')) {
            axios
                .delete(`http://localhost:3001/chapters/${chapterId}`)
                .then(() => {
                    setChapters((prev) =>
                        prev.filter((c) => c._id !== chapterId)
                    );
                });
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Quản lý sách
                </h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <FaPlus className="mr-2" />
                    Thêm sách mới
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full table-fixed">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 w-20 text-center">Bìa</th>
                            <th className="px-4 py-2 w-1/4 text-left">
                                Tên sách
                            </th>
                            <th className="px-4 py-2 w-1/6 text-left">
                                Tác giả
                            </th>
                            <th className="px-4 py-2 w-1/6 text-left">
                                Thể loại
                            </th>
                            <th className="px-4 py-2 w-20 text-left">Quyền</th>
                            <th className="px-4 py-2 w-32 text-left">
                                Trạng thái
                            </th>
                            <th className="px-4 py-2 w-28 text-right">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id} className="border-t">
                                <td className="px-4 py-2 text-center">
                                    <img
                                        src={book.cover || '/book.jpg'}
                                        alt="cover"
                                        className="w-10 h-14 object-cover mx-auto rounded shadow"
                                    />
                                </td>
                                <td className="px-4 py-2 text-left">
                                    {book.title}
                                </td>
                                <td className="px-4 py-2 text-left">
                                    {book.author}
                                </td>
                                <td className="px-4 py-2 text-left">
                                    {book.tags?.name || 'Không rõ'}
                                </td>
                                <td className="px-4 py-2 text-left">
                                    <span
                                        className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                            book.isPremium
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}>
                                        {book.isPremium ? 'Hội viên' : 'Free'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-left">
                                    <span
                                        className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                            book.isDeleted
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                        {book.isDeleted
                                            ? 'Không hoạt động'
                                            : 'Đang hoạt động'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-right space-x-2">
                                    <button
                                        onClick={() =>
                                            handleShowChapters(book._id)
                                        }
                                        className="text-purple-600 hover:text-purple-900"
                                        title="Danh sách chương">
                                        <FaList />
                                    </button>
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Sửa">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteBook(book._id)
                                        }
                                        className="text-red-600 hover:text-red-900"
                                        title="Xoá">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showChaptersForBookId && (
                <ChapterModal
                    bookTitle={currentBookTitle}
                    chapters={chapters}
                    onClose={closeChapterModal}
                    onAdd={handleAddChapter}
                    onEdit={handleEditChapter}
                    onDelete={handleDeleteChapter}
                />
            )}
        </div>
    );
};

export default BooksPage;
