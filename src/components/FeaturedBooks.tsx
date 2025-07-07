import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import bookimg from "./public/book.jpg";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  isPremium: boolean;
  rating: number;
}

const FeaturedBooks: React.FC<any> = ({ books }) => {
  const navigate = useNavigate();
  function removePrefix(str: string, prefix: string): string {
    if (str.startsWith(prefix)) {
      return str.slice(prefix.length);
    }
    return str;
  }
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Sách Mới</h2>
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
          className="pb-12"
        >
          {books.map((book: Book) => (
            <SwiperSlide key={book.id}>
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative pb-[140%]">
                    <img
                      src={`http://localhost:3001/public/img/books/${book.title
                        .normalize("NFD") // Bỏ dấu
                        .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9\s-]/g, "") // Bỏ ký tự đặc biệt
                        .replace(/\s+/g, "-") // Thay khoảng trắng bằng "-"
                        .replace(/-+/g, "-")}/images/${removePrefix(
                        book.cover,
                        "http://localhost:3001"
                      )}`}
                      alt={book.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-semibold">
                        {book.isPremium ? "Member" : "Free"}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
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
