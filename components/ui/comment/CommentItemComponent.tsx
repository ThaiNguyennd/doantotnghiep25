import { useTheme } from "@/components/hooks/ThemeContext";
import { useUser } from "@/components/hooks/userContext";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommentFormComponent from "./CommentFormComponent";


const CommentItemComponent = ({
  comment,
  onReply,
  setIsDelete,
  isDeleted,
}: any) => {
    const { theme, setTheme } = useTheme();

  const { user } = useUser();
  const [showReply, setShowReply] = useState(false);
  console.log("user", user?._id);
  const handleDelteComment = async (idComment: string) => {
    
    await axios.delete(`http://10.0.2.2:3001/comments/${idComment}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("đã xóa")
    alert('bạn đã xóa bình luận của bạn')
    setIsDelete(!isDeleted);
    
  };
  return (
    <View>
      <View className="border-l-2 pl-4">
        <Text className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
          🧑 <Text>{comment.user.name}</Text>: {comment.content}
        </Text>
        <View className="flex flex-row">
          <TouchableOpacity
            className="text-blue-500 text-xs mt-1 mr-5"
            onPress={() => setShowReply((prev) => !prev)}
          >
            <Text className={`${theme === "dark" ? "text-gray-300" : "text-blue-300"}`}>
              {" "}
              {showReply ? "Hủy" : "↪ Trả lời"}
            </Text>
          </TouchableOpacity>
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
            <TouchableOpacity
              className="text-blue-500 text-xs mt-1 mr-5"
              onPress={() => {
                handleDelteComment(comment._id);
              }}
            >
              <Text className="text-gray-200">xóa</Text>
            </TouchableOpacity>
          )}
        </View>
        {showReply && (
          <View className="mt-1">
            <CommentFormComponent
              onSubmit={(content) => {
                onReply(comment._id, content);
                setShowReply(false);
              }}
            />
          </View>
        )}
        <View className="ml-4 mt-2 space-y-2">
          {comment.replies.map((r: any) => (
            <CommentItemComponent key={r._id} comment={r} onReply={onReply} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CommentItemComponent;

const styles = StyleSheet.create({});
