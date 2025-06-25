import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import resizeImage from "../../utils/ResizeImageToUnder10MB";
import axios from "axios";
import { useUser } from "../../hooks/UserContext";
import Swal from "sweetalert2";

const ChangeAvt = ({ setChangeAvtModal, ChangeAvtModal }: any) => {
  const { user } = useUser();
  const [file, setFile] = useState<FormData | undefined>(undefined);
  const [fileReview, setFileReivew] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avt, setAvt] = useState();
  const handleFile = async (e: any) => {
    setAvt(e.target.files?.[0]?.name);
    const fileReSiZe = await resizeImage(e.target.files?.[0], 1024);
    const formData = new FormData();
    formData.append("file", fileReSiZe);
    setFile(formData);
    const imageUrl = URL.createObjectURL(fileReSiZe);
    setFileReivew(imageUrl);
  };
  useEffect(() => {
    setFileReivew(
      `http://localhost:3001/public/img/User/userId-${user?._id}/images/${user?.avatar}`
    );
  }, [ChangeAvtModal]);
  const handleChangeAvt = async () => {
    const token = localStorage.getItem("token");
    console.log("first", avt);
    console.log("id", user?._id);
    await axios.patch(
      `http://localhost:3001/users/${user?._id}`,
      {
        avatar: avt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await axios.post(`http://localhost:3001/files/upload`, file, {
      headers: {
        folder_type: `img/User/userId-${user?._id}`,
      },
    });
    setChangeAvtModal(false);
    Swal.fire({
      title: "Bạn đã đổi thành công avatar",
      icon: "success",
      draggable: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] h-[500px] relative">
        <div className="">
          {fileReview != "" ? (
            <div className="relative h-[350px] w-full bg-cover  rounded-md ">
              <h2 className="text-xl font-bold">Ảnh bìa của bạn sẽ là </h2>
              <div className="relative h-full">
                <img
                  src={fileReview || ""}
                  alt=""
                  className={` w-full h-full rounded-md mt-5 `}
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
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400]">
              <input
                type="file"
                className="w-full "
                placeholder="Link ảnh bìa"
                onChange={(e) => handleFile(e)}
                ref={fileInputRef}
              />
            </div>
          )}
        </div>
        <div className="flex items-end absolute bottom-4 right-6 gap-3">
          <div
            className=" p-2 bg-blue-500 rounded-md text-white font-semibold"
            onClick={() => {
              setChangeAvtModal(false);
            }}
          >
            <button className="items-end">Hủy</button>
          </div>
          <div
            className=" p-2 bg-blue-500 rounded-md text-white font-semibold"
            onClick={() => {
              handleChangeAvt();
            }}
          >
            <button className="items-end">Thay đổi avt</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangeAvt;
