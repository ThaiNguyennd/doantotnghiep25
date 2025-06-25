import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import CommentForm from "./CommentForm";

// === MOCK DATA ===

const CommentSection: React.FC<any> = () => {
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDelete] = useState(false);
  const token = localStorage.getItem("token");

  const { user } = useUser();
  useEffect(() => {
    fetchCmt();
  }, []);
  useEffect(() => {
    fetchCmt();
  }, [isDeleted]);

  const { id } = useParams<{ id: string }>();
  console.log("isDeleted", isDeleted);
  const fetchCmt = async () => {
    const result = await axios.get(`http://localhost:3001/comments/book/${id}`);
    setComments(result.data.data);
  };

  const addComment = async (parentId: string | null, content: string) => {
    if (token != "") {
      if (parentId === null) {
        const newComment = {
          book: id,
          content: content,
          parent: parentId,
        };
        console.log("newcmt", newComment);
        await axios.post(
          `http://localhost:3001/comments/`,

          newComment,

          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCmt();
        window.alert("bạn đã thêm bình luạn thành công");
      } else {
        const newComment = {
          book: id,
          content: content,
          parent: parentId,
        };
        console.log("newcmt", newComment);
        await axios.post(
          `http://localhost:3001/comments/`,

          newComment,

          { headers: { Authorization: `Bearer ${token}` } }
        );
        const result = await axios.get(
          `http://localhost:3001/comments/book/${id}`
        );
        setComments(result.data.data);
        window.alert("bạn đã thêm bình luạn thành công");
      }
    } else {
      window.alert("Bạn cần phải đăng nhập mới có thể bình luận");
    }
  };
  // const handlEditComment = async (e: string) => {};

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">💬 Bình luận</h2>
      <div className="mt-4 space-y-4">
        {comments.map((c: any) => (
          <CommentItem
            key={c._id}
            comment={c}
            onReply={addComment}
            setIsDelete={setIsDelete}
            isDeleted={isDeleted}
          />
        ))}
      </div>
      <div className="mt-10">
        <CommentForm onSubmit={(content) => addComment(null, content)} />
      </div>
    </div>
  );
};

function CommentItem({ comment, onReply, setIsDelete, isDeleted }: any) {
  const { user } = useUser();
  const [showReply, setShowReply] = useState(false);
  console.log("user", user?._id);
  const handleDelteComment = async (idComment: string) => {
    await axios.delete(`http://localhost:3001/comments/${idComment}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setIsDelete(!isDeleted);
    window.alert("Bạn đã xóa bình luận thành công");
  };
  return (
    <div className="border-l-2 pl-4">
      <p className="text-sm">
        🧑 <strong>{comment.user.name}</strong>: {comment.content}
      </p>
      <div className="flex">
        <button
          className="text-blue-500 text-xs mt-1 mr-5"
          onClick={() => setShowReply((prev) => !prev)}
        >
          {showReply ? "Hủy" : "↪ Trả lời"}
        </button>
        {/* {user?._id === comment.user._id && (
          // <button
          //   className="text-blue-500 text-xs mt-1 mr-5"
          //   onClick={() => {
          //     handlEditComment(comment._id);
          //   }}
          // >
          //   sửa
          // </button>
          div
        )} */}
        {user?._id === comment.user._id && (
          <button
            className="text-blue-500 text-xs mt-1 mr-5"
            onClick={() => {
              handleDelteComment(comment._id);
            }}
          >
            xóa
          </button>
        )}
      </div>
      {showReply && (
        <div className="mt-1">
          <CommentForm
            onSubmit={(content) => {
              onReply(comment._id, content);
              setShowReply(false);
            }}
          />
        </div>
      )}
      <div className="ml-4 mt-2 space-y-2">
        {comment.replies.map((r: any) => (
          <CommentItem key={r._id} comment={r} onReply={onReply} />
        ))}
      </div>
    </div>
  );
}

// function CommentForm({ onSubmit }: { onSubmit: (content: string) => void }) {
//   const [value, setValue] = useState("");
//   return (
//     <div>
//       <textarea
//         className="w-full border p-2 rounded text-sm"
//         rows={2}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Viết bình luận..."
//       />
//       <button
//         className="mt-1 bg-blue-500 text-white px-3 py-1 rounded text-sm"
//         onClick={() => {
//           if (value.trim()) {
//             onSubmit(value.trim());
//             setValue("");
//           }
//         }}
//       >
//         Gửi
//       </button>
//     </div>
//   );
// }

export default CommentSection;
