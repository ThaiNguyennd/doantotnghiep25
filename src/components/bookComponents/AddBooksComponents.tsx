import React, { useRef, useState } from "react";
import resizeImage from "../../utils/ResizeImageToUnder10MB";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "../../types";
import { FaTimes } from "react-icons/fa";

const AddBooksComponents: React.FC<any> = ({
  setShowAddModal,
  tags,
  fetchBooks,
}) => {
  const [file, setFile] = useState<FormData | undefined>(undefined);
  const [fileReview, setFileReivew] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    cover: "",
    description: "",
    tag: null as Tag | null,
    isPremium: false,
  });
  const handleFile = async (e: any) => {
    setNewBook({ ...newBook, cover: e.target.files?.[0]?.name });
    const fileReSiZe = await resizeImage(e.target.files?.[0], 1024);
    const formData = new FormData();
    formData.append("file", fileReSiZe);
    setFile(formData);
    const imageUrl = URL.createObjectURL(fileReSiZe);
    setFileReivew(imageUrl);

    console.log("formData124324123",formData);
  };
  const handleCreateBook = async () => {
    if (
      newBook.title === "" ||
      newBook.cover === ""
      // newBook.description === "" ||
      // newBook.tag
    ) {
      Swal.fire({
        title: "Drag me!",
        icon: "success",
        draggable: true,
      });
    } else {
      try {
        console.log(newBook.cover);
        console.log(newBook.title);
        const token = localStorage.getItem("token");
        console.log("📘 Token khi tạo sách:", newBook);

        await axios.post(
          "http://localhost:3001/books",
          {
            title: newBook.title,
            author: newBook.author,
            cover: newBook.cover,
            description: newBook.description,
            tags: newBook.tag,
            isPremium: newBook.isPremium,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // await axios.post(`http://localhost:3001/files/upload`, file, {
        //   headers: {
        //     folder_type: `img/books/${newBook.title}`,
        //   },
        // });

        setShowAddModal(false);
        setNewBook({
          title: "",
          author: "",
          cover: "",
          description: "",
          tag: null,
          isPremium: false,
        });
        fetchBooks();
        Swal.fire({
          title: "Bạn đã thành công tạo sách mới",
          icon: "success",
          draggable: true,
        });
      } catch (err) {
        alert("Lỗi khi tạo sách mới");
        console.error(err);
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-lg font-bold mb-4">Thêm sách mới</h2>

        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Tiêu đề"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Tác giả"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
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
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
        />
        <select
          className="w-full border rounded px-3 py-2 mb-2"
          value={newBook.tag?._id || ""}
          onChange={(e) => {
            const selectedTag = tags.find(
              (tag: any) => tag._id === e.target.value
            );
            setNewBook({ ...newBook, tag: selectedTag || null });
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
            checked={newBook.isPremium}
            onChange={(e) =>
              setNewBook({ ...newBook, isPremium: e.target.checked })
            }
          />
          <span>Là sách hội viên?</span>
        </label>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={handleCreateBook}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Thêm sách
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddBooksComponents;
