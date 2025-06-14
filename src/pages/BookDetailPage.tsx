import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book } from '../types';

const BookDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const res = await fetch(`http://localhost:3001/books/${id}`);
                const json = await res.json();
                setBook(json.data);
            } catch (err) {
                setError('Lỗi khi tải thông tin sách');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                Đang tải...
            </div>
        );
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!book) return <div className="text-center">Không tìm thấy sách</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-2">
                <div className="container mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <a href="/" className="hover:text-blue-600">
                            Trang chủ
                        </a>
                        <span className="mx-2">›</span>
                        <span>{book.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Book Cover */}
                    <div className="md:col-span-1">
                        <div className="sticky top-4">
                            <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                (Ảnh bìa chưa có)
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600">
                                        <span>❤</span>
                                        <span>0</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600">
                                        <span>↗</span>
                                        <span>Chia sẻ</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Book Details */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold mb-2">
                            {book.title}
                        </h1>

                        {/* Author and Publisher */}
                        <div className="space-y-2 mb-6">
                            <p>
                                <span className="font-semibold">Tác giả:</span>{' '}
                                {book.author}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Email người tạo:
                                </span>{' '}
                                {book.createdBy.email}
                            </p>
                            <p>
                                <span className="font-semibold">Premium:</span>{' '}
                                {book.isPremium ? 'Có' : 'Không'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 mb-8">
                            <button
                                onClick={() => navigate(`/read/${book._id}`)}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                <span>📖</span>
                                <span>Đọc sách</span>
                            </button>
                        </div>

                        {/* Description */}
                        <div className="prose max-w-none">
                            <h2 className="text-xl font-semibold mb-4">
                                Giới thiệu
                            </h2>
                            <p className="text-gray-700">{book.description}</p>
                        </div>

                        {/* Tags */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(book.tags) ? (
                                    book.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                            {tag.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        {book.tags.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Member Benefits */}
                        {book.isPremium && (
                            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">
                                    ĐỌC & NGHE SÁCH KHÔNG GIỚI HẠN
                                </h3>
                                <p className="mb-4">
                                    Sách này và 20,000+ sách điện tử, sách nói,
                                    truyện tranh...
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">
                                        1.000đ/ngày
                                    </span>
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                        Trở thành hội viên
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;
