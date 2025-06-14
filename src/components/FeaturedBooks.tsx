import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import bookimg from './public/book.jpg';

interface Book {
    id: number;
    title: string;
    author: string;
    cover: string;
    isPremium: boolean;
    rating: number;
}

const FeaturedBooks: React.FC = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/books`
                );
                const data = await res.json();
                console.log('📦 Kết quả từ API /books:', data);
                const booksFromAPI = data.data.result;

                const formattedBooks: Book[] = booksFromAPI
                    .sort(
                        (a: any, b: any) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .map((item: any) => ({
                        id: item._id,
                        title: item.title,
                        author: item.author,
                        cover: `${process.env.REACT_APP_API_URL}/${item.cover}`, // nếu cover là tên file, sửa tại đây
                        isPremium: item.isPremium,
                        rating: 4.5, // hoặc item.rating nếu API có
                    }));

                setBooks(formattedBooks);
            } catch (error) {
                console.error('Lỗi khi fetch sách:', error);
            }
        };

        fetchBooks();
    }, []);
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Sách Nổi Bật
                </h2>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="pb-12">
                    {books.map((book) => (
                        <SwiperSlide key={book.id}>
                            <div
                                className="cursor-pointer"
                                onClick={() => navigate(`/books/${book.id}`)}>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="relative pb-[140%]">
                                        <img
                                            src={bookimg}
                                            alt={book.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                                            {book.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {book.author}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-600 font-semibold">
                                                {book.isPremium
                                                    ? 'Member'
                                                    : 'Free'}
                                            </span>
                                            <div className="flex items-center">
                                                <span className="text-yellow-400">
                                                    ★
                                                </span>
                                                <span className="text-gray-600 text-sm ml-1">
                                                    {book.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedBooks;
