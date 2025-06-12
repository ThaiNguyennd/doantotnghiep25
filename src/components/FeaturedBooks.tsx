import React from 'react';
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
    price: string;
    rating: number;
}

const FeaturedBooks: React.FC = () => {
    const books: Book[] = [
        {
            id: 1,
            title: 'Đắc Nhân Tâm',
            author: 'Dale Carnegie',
            cover: '/books/dac-nhan-tam.jpg',
            price: '89.000đ',
            rating: 4.5,
        },
        {
            id: 2,
            title: 'Nhà Giả Kim',
            author: 'Paulo Coelho',
            cover: '/books/nha-gia-kim.jpg',
            price: '79.000đ',
            rating: 4.8,
        },
        {
            id: 3,
            title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
            author: 'Rosie Nguyễn',
            cover: '/books/tuoi-tre.jpg',
            price: '69.000đ',
            rating: 4.6,
        },
        {
            id: 4,
            title: 'Cà Phê Cùng Tony',
            author: 'Tony Buổi Sáng',
            cover: '/books/ca-phe.jpg',
            price: '59.000đ',
            rating: 4.3,
        },
        // Add more books as needed
    ];

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
                                            {book.price}
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedBooks;
