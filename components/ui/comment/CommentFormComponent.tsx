import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CommentFormComponent = ({
  onSubmit,
}: {
  onSubmit: (content: string) => void;
}) => {
  const [value, setValue] = useState("");

  return (
    <View>
      <View>
        <TextInput
          className="w-full border p-5 rounded text-sm  border-gray-500 placeholder:text-gray-500 text-white"
          numberOfLines={2}
          value={value}
          onChangeText={setValue}
          placeholder="Viết bình luận..."
        />
        <TouchableOpacity
          className=" bg-blue-500 text-white px-3 py-4 rounded text-sm mt-5 items-center"
          onPress={() => {
            if (value.trim()) {
              onSubmit(value.trim());
              setValue("");
            }
          }}
        >
          <Text className="text-white"> Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentFormComponent;

const styles = StyleSheet.create({});
