import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import bookimg from './public/book.jpg';
const Hero: React.FC = () => {
    const featuredBooks = [
        {
            id: 1,
            title: 'Đắc Nhân Tâm',
            author: 'Dale Carnegie',
            cover: '/books/dac-nhan-tam.jpg',
            description:
                'Nghệ thuật đối nhân xử thế và đạt được thành công trong cuộc sống',
        },
        {
            id: 2,
            title: 'Nhà Giả Kim',
            author: 'Paulo Coelho',
            cover: '/books/nha-gia-kim.jpg',
            description: 'Hành trình tìm kiếm kho báu và ý nghĩa cuộc sống',
        },
        // Add more featured books as needed
    ];

    return (
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{ nextEl: '.swiper-button-next', prevEl: null }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    className="h-[500px]">
                    {featuredBooks.map((book) => (
                        <SwiperSlide key={book.id}>
                            <div className="flex flex-col md:flex-row items-center justify-between h-full">
                                <div className="md:w-1/2 p-6">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                        {book.title}
                                    </h2>
                                    <p className="text-xl text-gray-600 mb-4">
                                        Tác giả: {book.author}
                                    </p>
                                    <p className="text-gray-700 mb-6">
                                        {book.description}
                                    </p>
                                    <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
                                        Đọc ngay
                                    </button>
                                </div>
                                <div className="md:w-1/2 p-6 mt-6">
                                    <img
                                        src={bookimg}
                                        alt={book.title}
                                        className="ms-auto me-auto w-64 h-auto rounded-lg shadow-xl "
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Hero;
