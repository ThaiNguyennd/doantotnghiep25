import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaHeadphones, FaGift, FaBookmark, FaMicrophone } from 'react-icons/fa';

interface Category {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      title: "Sách điện tử",
      description: "Hơn 100.000 đầu sách điện tử",
      icon: <FaBook className="w-12 h-12 text-blue-600" />,
      link: "/ebooks"
    },
    {
      id: 2,
      title: "Sách nói",
      description: "Hơn 10.000 đầu sách nói",
      icon: <FaHeadphones className="w-12 h-12 text-green-600" />,
      link: "/audiobooks"
    },
    {
      id: 3,
      title: "Sách miễn phí",
      description: "Hàng nghìn sách miễn phí",
      icon: <FaGift className="w-12 h-12 text-red-600" />,
      link: "/free-books"
    },
    {
      id: 4,
      title: "Sách tóm tắt",
      description: "Tóm tắt sách hay mỗi tuần",
      icon: <FaBookmark className="w-12 h-12 text-yellow-600" />,
      link: "/summaries"
    },
    {
      id: 5,
      title: "Podcast",
      description: "Podcast sách hay mỗi ngày",
      icon: <FaMicrophone className="w-12 h-12 text-purple-600" />,
      link: "/podcasts"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Danh Mục Sách</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 