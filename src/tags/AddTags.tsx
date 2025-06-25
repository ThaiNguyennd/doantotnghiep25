import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import React from "react";

const AddTags = ({ setIsAddModalOpen, fetchTags }: any) => {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      await axios.post(
        "http://localhost:3001/tags",
        {
          name: newName,
          description: newDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTags();
      setIsAddModalOpen(false);
      setNewName("");
      setNewDesc("");
      Swal.fire({
        title: "Bạn đã tạo tag thành công ",
        icon: "success",
        draggable: true,
      });
    } catch (err) {
      console.error("Lỗi thêm thẻ:", err);
      alert("Không thể thêm thẻ!");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Thêm thẻ mới</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium">Tên thẻ</label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Mô tả</label>
          <input
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Huỷ
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Thêm
          </button>
        </div>
        <button
          onClick={() => setIsAddModalOpen(false)}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddTags;
