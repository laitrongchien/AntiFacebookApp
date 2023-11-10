import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { SCREEN_WIDTH } from "../../constants";

const StartRegisterScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <VectorIcon
        name="arrow-left"
        type="MaterialCommunityIcons"
        color="#000"
        size={30}
        onPress={openModal}
      />
      <Text style={{ paddingVertical: 12, fontSize: 22, fontWeight: "500" }}>
        Tham gia Facebook
      </Text>
      <Image
        source={require("../../assets/images/join_facebook.jpg")}
        style={styles.image}
      />
      <Text style={{ paddingVertical: 12, fontSize: 15 }}>
        Tạo tài khoản để kết nối với bạn bè, người thân và cộng đồng có chung sở
        thích.
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("FullNameScreen")}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Bắt đầu</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <Text style={{ ...styles.text, fontSize: 18 }}>
                  Bạn có muốn dừng tạo tài khoản không?
                </Text>
                <Text
                  style={{ ...styles.text, color: "#666", marginBottom: 32 }}
                >
                  Nếu dừng bây giờ, bạn sẽ mất toàn bộ tiến trình đã thực hiện
                </Text>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={{ ...styles.text, textAlign: "right" }}>
                    TIẾP TỤC TẠO TÀI KHOẢN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    navigation.goBack();
                  }}
                >
                  <Text
                    style={{
                      ...styles.text,
                      color: "#1877f2",
                      textAlign: "right",
                    }}
                  >
                    DỪNG TẠO TÀI KHOẢN
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  image: {
    width: SCREEN_WIDTH - 30,
    height: 200,
    borderRadius: 20,
  },
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    backgroundColor: "#1877f2",
    marginTop: 12,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: SCREEN_WIDTH - 80,
    borderRadius: 12,
    padding: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 12,
  },
});

export default StartRegisterScreen;
