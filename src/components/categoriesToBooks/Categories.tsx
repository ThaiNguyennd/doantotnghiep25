import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaHeadphones,
  FaGift,
  FaBookmark,
  FaMicrophone,
} from "react-icons/fa";
import axios from "axios";
import { Tag } from "../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import bookimg from "./public/book.jpg";
import CategoriesToBooksComponent from "./CategoriesToBooksComponent";

interface Category {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const Categories: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const navigate = useNavigate();
  const fetchTags = async () => {
    try {
      const res = await axios.get("http://localhost:3001/tags");
      setTags(res.data?.data?.result);
      console.log("first", res.data?.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy tags:", err);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
  console.log("tag",tags)
  return (
    <div className="w-full container mx-auto px-4 my-10">
      {tags.map((tag: Tag) => (
        <div key={tag._id}>
          <h2 className="text-3xl font-bold text-gray-800 my-8 ">{tag.name}</h2>
          <CategoriesToBooksComponent idTag={tag._id}></CategoriesToBooksComponent>
        </div>
      ))}
    </div>
  );
};

export default Categories;
