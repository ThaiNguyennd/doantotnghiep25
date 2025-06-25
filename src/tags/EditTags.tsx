import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditTags = ({ idtag, setIsEditModalOpen, fetchTags }: any) => {
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  useEffect(() => {
    FetchTag();
  }, [idtag]);
  console.log("first", idtag);
  const FetchTag = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      const res = await axios.get(`http://localhost:3001/tags/${idtag}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditName(res.data.data.name);
      setEditDesc(res.data.data.description);
    } catch (error) {
      console.error("Lỗi thêm thẻ:", error);
      alert("Không thể thêm thẻ!");
    }
  };
  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      await axios.patch(
        `http://localhost:3001/tags/${idtag}`,
        {
          name: editName,
          description: editDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTags();
      Swal.fire({
        title: "Bạn đã sửa tag thành công ",
        icon: "success",
        draggable: true,
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Lỗi thêm thẻ:", error);
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
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Mô tả</label>
          <input
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Huỷ
          </button>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Sửa
          </button>
        </div>
        <button
          onClick={() => setIsEditModalOpen(false)}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
export default EditTags;
