import React, { useState } from "react";
import { useUser } from "../../hooks/UserContext";
import ChangeAvt from "./ChangeAvt";
import ChangeUser from "./ChangeUser";
import Swal from "sweetalert2";

const AudiobooksPage: React.FC = () => {
  const [ChangeAvtModal, setChangeAvtModal] = useState(false);
  const [changeUserModal, setChangeUserModal] = useState(false);
  const { user, loading } = useUser();

  const changeUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/users/${user?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isPremium: true,
        }),
      });

      if (res.ok) {
        Swal.fire({
          title: "Bạn đã đăng ký trở thành hội viên của chúng tôi thành công",
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
  const handleIsPrimium = () => {
    Swal.fire({
      title: "Bạn có muốn đăng ký không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đăng ký",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Người dùng bấm "Đăng ký"
        console.log("Người dùng đồng ý đăng ký");
        // Thực hiện hành động đăng ký tại đây
        changeUser();
      } else if (result.isDismissed) {
        // ❌ Người dùng bấm "Hủy" hoặc đóng popup
        console.log("Người dùng từ chối đăng ký");
        // Có thể xử lý khác nếu muốn
      }
    });
  };
  console.log("userpfl", user);
  return (
    <div className="max-w-4xl my-20 mt-40 mx-auto p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-1">Thông Tin Cá Nhân</h2>
      <p className="text-sm text-gray-600 mb-6">
        Quản lý thông tin cá nhân của bạn.
      </p>

      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          {user?.avatar === "" ? (
            <div className="text-gray-500 text-xl">👤</div>
          ) : (
            <img
              className="h-full w-full rounded-full"
              src={`http://localhost:3001/public/img/User/userId-${user?._id}/images/${user?.avatar}`}
            ></img>
          )}
          <button
            className="absolute bottom-0 bg-gray-700 text-white text-xs px-2 py-1 rounded"
            onClick={() => {
              setChangeAvtModal(true);
            }}
          >
            Thay đổi
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên tài khoản
          </label>
          <input
            disabled
            type="text"
            defaultValue={user?.name}
            className="mt-1 w-full p-2 border rounded bg-gray-100 "
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 ">
            Email đăng kí
          </label>
          <input
            type="text"
            defaultValue={user?.email}
            className="mt-1 w-full p-2 border rounded mb-10"
          />
        </div>
        {user?.isPremium === true ? (
          <div>
            <label className="block text-xl font-bold text-gray-700">
              Bạn đã là Hội viên của chúng tôi
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <label className="block text-xl font-semibold text-gray-700">
              Bạn chưa Là Hội viên
            </label>
            <button
              className="p-2 bg-blue-500 rounded-md"
              onClick={() => {
                handleIsPrimium();
              }}
            >
              Đăng kí trở thành hội viên
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 pt-4 space-y-2 sm:space-y-0">
          <button
            onClick={() => {
              setChangeUserModal(true);
              console.log("ấđâsd");
            }}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Sửa
          </button>
        </div>
      </div>
      {ChangeAvtModal && (
        <ChangeAvt
          setChangeAvtModal={setChangeAvtModal}
          ChangeAvtModal={ChangeAvtModal}
        ></ChangeAvt>
      )}
      {changeUserModal && (
        <ChangeUser
          setChangeUserModal={setChangeUserModal}
          changeUserModal={changeUserModal}
        ></ChangeUser>
      )}
    </div>
  );
};

export default AudiobooksPage;
