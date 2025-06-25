import React, { useEffect, useState } from "react";
import FeaturedBooks from "../components/FeaturedBooks";
import { Book } from "../types";

const AudiobooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/books`);
        const data = await res.json();
        console.log("📦 Kết quả từ API /books:", data);
        const booksFromAPI = data.data.result;

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
        console.log("format book", formattedBooks);
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Sách Nói</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Add audiobook filters and sorting options here */}
          <div className="col-span-full mb-6">
            <div className="flex flex-wrap gap-4">
              <select className="px-4 py-2 border rounded-lg">
                <option value="">Sắp xếp theo</option>
                <option value="newest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="duration-asc">Thời lượng tăng dần</option>
                <option value="duration-desc">Thời lượng giảm dần</option>
              </select>
              <select className="px-4 py-2 border rounded-lg">
                <option value="">Thể loại</option>
                <option value="fiction">Tiểu thuyết</option>
                <option value="business">Kinh doanh</option>
                <option value="self-help">Tự lực</option>
                <option value="education">Giáo dục</option>
              </select>
            </div>
          </div>
        </div>
        <FeaturedBooks books={books} />
      </div>
    </main>
  );
};

export default AudiobooksPage;
