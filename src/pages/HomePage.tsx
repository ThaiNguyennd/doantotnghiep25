import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedBooks from "../components/FeaturedBooks";
import Categories from "../components/categoriesToBooks/Categories";
import { Book } from "../types";

const HomePage: React.FC = () => {
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
    <main className="">
      <Hero />
      <FeaturedBooks books={books} />
      <Categories />
    </main>
  );
};

export default HomePage;
