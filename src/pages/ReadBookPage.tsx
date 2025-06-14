import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Chapter {
    _id: string;
    title: string;
    content: string;
    isPremium: boolean;
}

interface Book {
    _id: string;
    name: string;
}

export default function ReadBookPage() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const [bookRes, chapterRes] = await Promise.all([
                    fetch(`http://localhost:3001/books/${id}`),
                    fetch(`http://localhost:3001/chapters/by-book/${id}`),
                ]);

                const bookData = await bookRes.json();
                const chapterData = await chapterRes.json();

                setBook(bookData);
                const chapterList = Array.isArray(chapterData.data)
                    ? chapterData.data
                    : [];
                setChapters(chapterList);
                setSelectedChapter(chapterList[0] || null);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Không thể tải dữ liệu.');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex p-8 space-x-4">
                <div className="w-1/4 h-[400px] bg-gray-200 animate-pulse rounded" />
                <div className="w-3/4 h-[400px] bg-gray-200 animate-pulse rounded" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 p-4">{error}</p>;
    }

    return (
        <div className="flex h-screen mt-16">
            {/* Sidebar danh sách chương */}
            <div className="w-1/4 border-r border-gray-300 overflow-y-auto p-4">
                <h2 className="text-xl font-bold mb-4">{book?.name}</h2>
                <ul className="space-y-2">
                    {chapters.map((chapter) => (
                        <li
                            key={chapter._id}
                            className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                                selectedChapter?._id === chapter._id
                                    ? 'bg-gray-200 font-semibold'
                                    : ''
                            }`}
                            onClick={() => setSelectedChapter(chapter)}>
                            {chapter.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Nội dung chương */}
            <div className="w-3/4 p-6 overflow-y-auto">
                <h3 className="text-2xl font-semibold mb-4">
                    {selectedChapter?.title}
                </h3>
                <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                    {selectedChapter?.content}
                </div>
            </div>
        </div>
    );
}
