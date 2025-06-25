import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Chapter {
  _id: string;
  title: string;
  content: string;
  isPremium: boolean;
  createdAt: string;
}

const EditChapter: React.FC<any> = ({
  selectedBookId,
  titleBookselect,
  Isselectbookpremium,
  setEditChapterModal,
  idChapterSelect,
}) => {
  const [editChapterTitle, setEitChapterTitle] = useState<string>();
  const [contentEdit, setContentEdit] = useState<string>();
  const [chapter, setChapter] = useState();
  useEffect(() => {
    fetchChapter();
  }, [idChapterSelect]);
  const fetchChapter = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/chapters/${idChapterSelect}`
      );
      setEitChapterTitle(res.data.data.title);
      setContentEdit(res.data.data.content);
    } catch (error: any) {
      console.error("Lỗi lấy chapter:", error.response?.data || error.message);
      alert("Có lỗi xảy ra khi tải chương. Vui lòng thử lại.");
    }
  };
  const handleEditChapter = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("idbook", editChapterTitle);
      console.log("namebook", contentEdit);
      await axios.patch(
        `http://localhost:3001/chapters/${idChapterSelect}`,
        {
          title: editChapterTitle,
          content: contentEdit,
          book: {
            _id: selectedBookId,
            name: titleBookselect,
          },
          isPremium: Isselectbookpremium,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // handleShowChapters(showChaptersForBookId);

      // Reset form
      Swal.fire({
        title: "Bạn đã sửa chương thành công ",
        icon: "success",
        draggable: true,
      });
      setEditChapterModal(false);
    } catch (err) {
      alert("❌ Lỗi khi sửa chương");
      console.error(err);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-lg font-bold mb-4">Thêm chương mới</h2>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Tên chương"
          value={editChapterTitle}
          onChange={(e) => setEitChapterTitle(e.target.value)}
        />
        <textarea
          className="w-full border rounded px-3 py-2 mb-4 min-h-[200px]"
          placeholder="Nội dung"
          value={contentEdit}
          onChange={(e) => setContentEdit(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setEditChapterModal(false)}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={handleEditChapter}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Sửa
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChapter;
