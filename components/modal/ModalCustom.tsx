import React from "react";
import { Modal, StyleSheet, View } from "react-native";

const ModalCustom = ({ visible, onRequestClose, children }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-11/12 rounded-xl p-2 items-center shadow-lg relative">
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({});
