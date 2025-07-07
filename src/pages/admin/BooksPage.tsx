import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaList } from "react-icons/fa";
import ChapterModal from "../../components/chapterComponents/ChapterModal";
import AddChapter from "../../components/chapterComponents/AddChapter";
import AddBooksComponents from "../../components/bookComponents/AddBooksComponents";
import EditBooksComponents from "../../components/bookComponents/EditBooksComponent";
import EditChapter from "../../components/chapterComponents/EditChapter";
import CommentModalAdmin from "../../components/admin/CommentModalAdmin";
import Swal from "sweetalert2";

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  tags?: { _id: string; name: string };
  isPremium: boolean;
  isDeleted: boolean;
  description?: string;
}

interface Chapter {
  _id: string;
  title: string;
}

interface Tag {
  _id: string;
  name: string;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [Isselectbookpremium, setisprmium] = useState<boolean>();

  const [showChaptersForBookId, setShowChaptersForBookId] = useState<
    string | null
  >(null);
  const [currentBookTitle, setCurrentBookTitle] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [AddChapterModal, setAddChapterModal] = useState<boolean>(false);
  const [editChapterModal, setEditChapterModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const [isDeleteComment, setIsDeleteComment] = useState<boolean>(false);
  const [bookCmt, setBookCmt] = useState<string>("");
  const [cmtData, setCmtData] = useState<string>("");
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [idChapterSelect, setIdChapterSelect] = useState<string>();

  useEffect(() => {
    fetchBooks();
    fetchTags();
  }, []);

  const fetchBooks = () => {
    axios.get("http://localhost:3001/books").then((res) => {
      setBooks(res.data?.data?.result || []);
    });
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get("http://localhost:3001/tags");
      setTags(res.data?.data?.result || []);
    } catch (err) {
      console.error("Lỗi khi lấy tags:", err);
    }
  };
  const handleShowModalCmtBook = async (bookId: string) => {
    const result = await axios.get(
      `http://localhost:3001/comments/book/${bookId}`
    );
    const result2 = await axios.get(`http://localhost:3001/books/${bookId}`);
    console.log("result", result);
    setBookCmt(result2.data.data);
    setCmtData(result.data.data);
    setShowCommentModal(true);
  };

  const handleDeleteBook = async (bookId: string) => {
    if (confirm("Xác nhận xoá sách này?")) {
      await axios.delete(`http://localhost:3001/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchBooks();
    }
  };

  const handleShowChapters = async (bookId: string) => {
    const res = await axios.get(
      `http://localhost:3001/chapters/by-book/${bookId}`
    );
    const book = books.find((b) => b._id === bookId);
    setChapters(res.data.data || []);
    setShowChaptersForBookId(bookId);
    setCurrentBookTitle(book?.title || "Không rõ");
    setisprmium(book?.isPremium);
  };

  const closeChapterModal = () => {
    setShowChaptersForBookId(null);
    setChapters([]);
  };

  const handleAddChapter = () => {
    setAddChapterModal(true);
  };

  const handleEditChapter = (chapterId: string) => {
    console.log("asdasdasd", chapterId);
    setEditChapterModal(true);
    setIdChapterSelect(chapterId);
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (confirm("Xoá chương này?")) {
      axios
        .delete(`http://localhost:3001/chapters/${chapterId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          setChapters((prev) => prev.filter((c) => c._id !== chapterId));
        });
    }
  };

  const handleEditBook = (book: any) => {
    setEditBook(book);
    setShowEditModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý sách</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" />
          Thêm sách mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 w-20 text-center">Bìa</th>
              <th className="px-4 py-2 w-1/4 text-left">Tên sách</th>
              <th className="px-4 py-2 w-1/6 text-left">Tác giả</th>
              <th className="px-4 py-2 w-1/6 text-left">Thể loại</th>
              <th className="px-4 py-2 w-20 text-left">Quyền</th>
              <th className="px-4 py-2 w-32 text-left">Quản lí bình luận</th>
              <th className="px-4 py-2 w-28 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t">
                <td className="px-4 py-2 text-center">
                  <img
                    src={`http://localhost:3001/public/img/books/${book.title
                      .normalize("NFD") // Bỏ dấu
                      .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9\s-]/g, "") // Bỏ ký tự đặc biệt
                      .replace(/\s+/g, "-") // Thay khoảng trắng bằng "-"
                      .replace(/-+/g, "-")}/images/${book.cover}`}
                    alt="cover"
                    className="w-10 h-14 object-cover mx-auto rounded shadow"
                  />
                </td>
                <td className="px-4 py-2 text-left">{book.title}</td>
                <td className="px-4 py-2 text-left">{book.author}</td>
                <td className="px-4 py-2 text-left">
                  {book.tags?.name || "Không rõ"}
                </td>
                <td className="px-4 py-2 text-left">
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      book.isPremium
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {book.isPremium ? "Hội viên" : "Free"}
                  </span>
                </td>
                <td className="px-4 py-2 text-left">
                  {/* <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      book.isDeleted
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {book.isDeleted ? "Không hoạt động" : "Đang hoạt động"}
                  </span> */}
                  <button onClick={() => handleShowModalCmtBook(book._id)}>
                    Bình luận
                  </button>
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button
                    onClick={() => handleShowChapters(book._id)}
                    className="text-purple-600 hover:text-purple-900"
                    title="Danh sách chương"
                  >
                    <FaList />
                  </button>
                  <button
                    onClick={() => handleEditBook(book)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="text-red-600 hover:text-red-900"
                    title="Xoá"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm sách */}
      {showAddModal && (
        <AddBooksComponents
          setShowAddModal={setShowAddModal}
          tags={tags}
          fetchBooks={fetchBooks}
        />
      )}

      {/* Modal Sửa sách */}
      {showEditModal && editBook && (
        <EditBooksComponents
          book={editBook}
          setEditBook={setEditBook}
          setShowEditModal={setShowEditModal}
          tags={tags}
          fetchBooks={fetchBooks}
        />
      )}

      {showChaptersForBookId && (
        <ChapterModal
          bookTitle={currentBookTitle}
          chapters={chapters}
          onClose={closeChapterModal}
          onAdd={handleAddChapter}
          onEdit={handleEditChapter}
          onDelete={handleDeleteChapter}
        />
      )}
      {AddChapterModal && (
        <AddChapter
          selectedBookId={showChaptersForBookId}
          titleBookselect={currentBookTitle}
          Isselectbookpremium={Isselectbookpremium}
          setShowModalAddChapter={setAddChapterModal}
          setShowChaptersForBookId={setShowChaptersForBookId}
        />
      )}
      {editChapterModal && (
        <EditChapter
          selectedBookId={showChaptersForBookId}
          titleBookselect={currentBookTitle}
          Isselectbookpremium={Isselectbookpremium}
          setEditChapterModal={setEditChapterModal}
          idChapterSelect={idChapterSelect}
        ></EditChapter>
      )}
      {showCommentModal && (
        <CommentModalAdmin
          setIsDeleteComment={() => {
            setIsDeleteComment(true);
          }}
          bookCmt={bookCmt}
          cmtData={cmtData}
          handleCloseCommentModal={() => {
            setShowCommentModal(false);
          }}
        ></CommentModalAdmin>
      )}
    </div>
  );
};

export default BooksPage;
