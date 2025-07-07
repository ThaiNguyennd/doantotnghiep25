import { useUser } from "@/components/hooks/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CommentFormComponent from "./CommentFormComponent";
import CommentItemComponent from "./CommentItemComponent";

const CommentComponent = ({ bookId }: any) => {
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDelete] = useState(false);
  const [token, setToken] = useState<string | null>("");
  const { user } = useUser();
  useEffect(() => {
    fetchCmt();
  }, []);
  useEffect(() => {
    fetchCmt();
  }, [isDeleted]);

  console.log("isDeleted", token);
  const fetchCmt = async () => {
    const result = await axios.get(
      `http://192.168.0.101:3001/comments/book/${bookId}`
    );
    const tokena = await AsyncStorage.getItem("token");
    setToken(tokena);
    setComments(result.data.data);
  };

  const addComment = async (parentId: string | null, content: string) => {
    if (token != "") {
      if (parentId === null) {
        const newComment = {
          book: bookId,
          content: content,
          parent: parentId,
        };
        console.log("newcmt", newComment);
        await axios.post(
          `http://192.168.0.101:3001/comments/`,

          newComment,

          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCmt();
        window.alert("bạn đã thêm bình luạn thành công");
      } else {
        const newComment = {
          book: bookId,
          content: content,
          parent: parentId,
        };
        console.log("newcmt1", newComment);
        await axios.post(
          `http://192.168.0.101:3001/comments/`,

          newComment,

          { headers: { Authorization: `Bearer ${token}` } }
        );
        const result = await axios.get(
          `http://192.168.0.101:3001/comments/book/${bookId}`
        );
        setComments(result.data.data);
        window.alert("bạn đã thêm bình luạn thành công");
      }
    } else {
      window.alert("Bạn cần phải đăng nhập mới có thể bình luận");
    }
  };
  return (
    <View>
      <View className="w-full  p-4  shadow rounded border-gray-400 mb-10 border border-l-0 border-r-0  text-gray-200">
        <Text className="text-xl font-bold mb-4 text-white">💬 Bình luận</Text>
        <View className="mt-4 space-y-4 text-xl">
          {comments.map((c: any) => (
            <CommentItemComponent
              key={c._id}
              comment={c}
              onReply={addComment}
              setIsDelete={setIsDelete}
              isDeleted={isDeleted}
            />
          ))}
        </View>
        <View className="mt-10">
          <CommentFormComponent
            onSubmit={(content) => addComment(null, content)}
          />
        </View>
      </View>
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({});
