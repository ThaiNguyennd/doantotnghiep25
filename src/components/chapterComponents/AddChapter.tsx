import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface Chapter {
  _id: string;
  title: string;
  content: string;
  isPremium: boolean;
  createdAt: string;
}

const AddChapter: React.FC<any> = ({
  selectedBookId,
  titleBookselect,
  Isselectbookpremium,
  setShowModalAddChapter,
  setShowChaptersForBookId,
}) => {
  const [newChapterTitle, setNewChapterTitle] = useState<string>();
  const [newContent, setNewContent] = useState<string>();

  const handleCreateChapter = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3001/chapters",
        {
          title: newChapterTitle,
          content: newContent,
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

      //  cp nhật lại danh sách chương
      //   handleShowChapters(showChaptersForBookId);
      setShowChaptersForBookId(null);

      // Reset form
      Swal.fire({
        title: "Bạn đã tạo chương thành công ",
        icon: "success",
        draggable: true,
      });
      setShowModalAddChapter(false);
    } catch (err) {
      alert("❌ Lỗi khi tạo chương");
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
          value={newChapterTitle}
          onChange={(e) => setNewChapterTitle(e.target.value)}
        />
        <textarea
          className="w-full border rounded px-3 py-2 mb-4 min-h-[200px]"
          placeholder="Nội dung"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowModalAddChapter(false)}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={handleCreateChapter}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
