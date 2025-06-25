import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import bookimg from "../public/book.jpg";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  isPremium: boolean;
  rating: number;
}

const CategoriesToBooksComponent: React.FC<any> = ({ idTag }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  function removePrefix(str: string, prefix: string): string {
    if (str.startsWith(prefix)) {
      return str.slice(prefix.length);
    }
    return str;
  }
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/books/by-tags/${idTag}`
        );
        const data = await res.json();
        console.log("firs,dat", data.data);
        const booksFromAPI = data.data;

        const formattedBooks: Book[] = booksFromAPI
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
        console.log("format book12312312", books);
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div>
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
                    src={`http://localhost:3001/public/img/books/${
                      book.title
                    }/images/${removePrefix(
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
  );
};
export default CategoriesToBooksComponent;
