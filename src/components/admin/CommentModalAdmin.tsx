import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useUser } from "../../hooks/UserContext";

const CommentModalAdmin: React.FC<any> = ({
  bookCmt,
  cmtData,
  handleCloseCommentModal,
}) => {
  const { user } = useUser();



  const handleDeleteComment = async (idComment: string) => {
    if (user?.role === "admin") {
      await axios.delete(`http://localhost:3001/comments/${idComment}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.alert("Bạn đã xóa bình luận này");
      handleCloseCommentModal(true);
    } else {
      window.alert("Bạn không phải là quản trị viên bạn không có quyền");
    }
  };



  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative border-l-2 pl-4 bg-white rounded-lg p-6 w-[700px] min-h-[500px]">
        <div className="absolute top-3 right-3 cursor-pointer ">
          <FaTimes size={"20px"} onClick={handleCloseCommentModal} />
        </div>
        <div></div>
        <div className="flex justify-center font-bold items-center text-xl">{`Bình luận của sách ${bookCmt.title} `}</div>
        {cmtData.length === 0 ? (
          <div className="text-black w-full   text-center mt-10">
            <h2 className="font-semibold text-base">
              Sách này chưa có bình luận nào
            </h2>
          </div>
        ) : (
          <div>
            <div className="border-l-2 pl-4 mt-2 w-full  p-4">
              {cmtData.map((e: any) => (
                <div
                  key={e._id}
                  className="bg-slate-300 mt-2 p-2 rounded-md relative"
                >
                  <button
                    onClick={() => handleDeleteComment(e._id)}
                    className="text-red-600 hover:text-red-900 absolute top-2 right-2 "
                    title="Xoá"
                  >
                    <FaTrash />
                  </button>
                  <p className="text-sm">
                    🧑 <strong>{e?.user.name}</strong>: {e.content}
                  </p>
                  {e.replies.length > 0 &&
                    e.replies.map((e: any) => (
                      <div
                        className="relative pl-4 border-b-2 mt-2"
                        key={e._id}
                      >
                        <p className="text-sm">
                          🧑 <strong>{e?.user.name}</strong>: {e.content}
                        </p>
                        <button
                          onClick={() => handleDeleteComment(e._id)}
                          className="text-red-600 hover:text-red-900 absolute top-0 right-2 "
                          title="Xoá"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CommentModalAdmin;
