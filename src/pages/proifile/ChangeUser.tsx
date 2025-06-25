import React, { useEffect, useState } from "react";
import { User, useUser } from "../../hooks/UserContext";
import Swal from "sweetalert2";

const ChangeUser = ({ setChangeUserModal, changeUserModal }: any) => {
  const { user } = useUser();
  const [editName, setEditName] = useState<string>();
  const [editEmail, setEditEmail] = useState<string>();
  useEffect(() => {
    setEditName(user?.name);
    setEditEmail(user?.email);
  }, [changeUserModal]);
  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/users/${user?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
        }),
      });

      if (res.ok) {
        Swal.fire({
          title: "Bạn đã sửa thành công thong tin",
          icon: "success",
          draggable: true,
        }).then((result) => {
          if (result.isConfirmed) {
            // ✅ Người dùng đã bấm OK
            console.log("Người dùng đã bấm OK");
            window.location.reload();
            // 👉 Thực hiện hành động sau đó, ví dụ:
            // - đóng modal
            // - chuyển trang
            // - gọi API tiếp theo
          }
        });
      } else {
        const data = await res.json();
        alert(`Cập nhật thất bại: ${data.message || "Lỗi không xác định"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật người dùng");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Sửa người dùng</h2>
        <input
          className="border px-4 py-2 rounded w-full mb-3"
          placeholder="Tên"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <input
          className="border px-4 py-2 rounded w-full mb-3"
          placeholder="Email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setChangeUserModal(false)}
            className="px-4 py-2 text-gray-600"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateUser}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangeUser;
