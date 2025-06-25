import React, { useEffect, useRef, useState } from "react";
import { Book, Tag } from "../../types";
import resizeImage from "../../utils/ResizeImageToUnder10MB";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const EditBooksComponents: React.FC<any> = ({
  setShowEditModal,
  tags,
  fetchBooks,
  book,
  showEditModal,
}) => {
  const [file, setFile] = useState<FormData | undefined>(undefined);
  const [fileReview, setFileReivew] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editBook, setEditBook] = useState({
    title: "",
    author: "",
    cover: null as string | null,
    description: "",
    tags: null as Tag | null,
    isPremium: false,
  });
  console.log("first", book);
  useEffect(() => {
    setEditBook(book);
    setFileReivew(
      `http://localhost:3001/public/img/books/${book.title}/images/${book.cover}`
    );
  }, [showEditModal]);
  const handleFile = async (e: any) => {
    setEditBook({ ...editBook, cover: e.target.files?.[0]?.name });
    const fileReSiZe = await resizeImage(e.target.files?.[0], 1024);
    const formData = new FormData();
    formData.append("file", fileReSiZe);
    setFile(formData);
    const imageUrl = URL.createObjectURL(fileReSiZe);
    setFileReivew(imageUrl);
  };

  const handleUpdateBook = async () => {
    try {
      if (!editBook) return;
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:3001/books/${book._id}`, editBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowEditModal(false);
      setEditBook({
        title: "",
        author: "",
        cover: "",
        description: "",
        tags: null as Tag | null,
        isPremium: false,
      });
      fetchBooks();
      Swal.fire({
        title: "Bạn đã sửa thành công  sách ",
        icon: "success",
        draggable: true,
      });
    } catch (err) {
      alert("Lỗi khi cập nhật sách");
      console.error(err);
    }
  };

  console.log("first", fileReview);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-lg font-bold mb-4">Chỉnh sửa sách</h2>

        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Tiêu đề"
          value={editBook?.title}
          onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
        />
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Tác giả"
          value={editBook.author}
          onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
        />
        <div className="flex items-center justify-between relative px-3 py-4 mb-2 border rounded h-[70px]">
          {!fileReview ? (
            <input
              type="file"
              className="w-full  2 mr-2"
              placeholder="Link ảnh bìa"
              onChange={(e) => handleFile(e)}
              ref={fileInputRef}
            />
          ) : (
            <h2 className="text-xl ">Ảnh bìa</h2>
          )}
          {fileReview ? (
            <div className="relative h-full w-[70px] bg-cover">
              <img
                src={fileReview || ""}
                alt=""
                className={` w-full h-full  `}
              />
              <div
                className="absolute -top-3 -right-2 cursor-pointer"
                onClick={() => {
                  setFileReivew("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // ✅ Cách reset đúng
                  }
                }}
              >
                <FaTimes></FaTimes>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <textarea
          className="w-full border rounded px-3 py-2 mb-2 min-h-[200px]"
          placeholder="Mô tả"
          value={editBook.description}
          onChange={(e) =>
            setEditBook({ ...editBook, description: e.target.value })
          }
        />
        <select
          className="w-full border rounded px-3 py-2 mb-2"
          value={editBook.tags?._id}
          onChange={(e) => {
            const selectedTag = tags.find(
              (tag: any) => tag._id === e.target.value
            );
            setEditBook({ ...editBook, tags: selectedTag || null });
          }}
        >
          <option value="">-- Chọn thể loại --</option>
          {tags.map((tag: any) => (
            <option key={tag._id} value={tag._id}>
              {tag.name}
            </option>
          ))}
        </select>
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={editBook.isPremium}
            onChange={(e) =>
              setEditBook({ ...editBook, isPremium: e.target.checked })
            }
          />
          <span>Là sách hội viên?</span>
        </label>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setShowEditModal(false);
              setEditBook({
                title: "",
                author: "",
                cover: "",
                description: "",
                tags: null as Tag | null,
                isPremium: false,
              });
            }}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateBook}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditBooksComponents;
