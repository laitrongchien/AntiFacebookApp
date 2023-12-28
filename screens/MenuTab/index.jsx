import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import { SCREEN_WIDTH } from "../../constants";
import { logout } from "../../redux/actions/authAction";
import { buyCoins } from "../../redux/actions/userAction";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const MenuScreen = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { username, avatar, coins } = useSelector((state) => state.auth);

  const onLogoutPress = async () => {
    try {
      setLoading(true);
      dispatch(logout());
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleBuyCoins = () => {
    setAmount("");
    dispatch(buyCoins("string", amount));
    closeModal();
  };

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.iconWrap}>
          <ExTouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={{ ...styles.btnSearch, marginRight: 8 }}>
            <VectorIcon name="search" type="FontAwesome5" size={19} color="#000" />
          </ExTouchableOpacity>
          <ExTouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={styles.btnSearch}>
            <VectorIcon name="cog" type="FontAwesome5" size={19} color="#000" />
          </ExTouchableOpacity>
        </View>
      </View>
      <ExTouchableOpacity
        style={{ ...styles.userWrapper, justifyContent: "space-between" }}
        onPress={() => navigation.navigate("ProfileScreen")}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: avatar }} style={styles.userAvatar} />
          <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 12 }}>{username}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "500", fontSize: 16, marginRight: 4 }}>Số xu: {coins}</Text>
          <Image source={require("../../assets/images/coin.png")} style={styles.coin} />
        </View>
      </ExTouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 10,
          marginHorizontal: 20,
        }}>
        Tất cả lối tắt
      </Text>
      <View style={styles.allShortcut}>
        <ExTouchableOpacity onPress={() => navigation.navigate("Watch")} style={styles.shortcut}>
          <Image source={require("../../assets/images/video.png")} style={styles.iconImage} />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Video</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity onPress={() => navigation.navigate("Friend")} style={styles.shortcut}>
          <Image source={require("../../assets/images/friend.png")} style={styles.iconImage} />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Bạn bè</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.shortcut} onPress={() => setIsModalVisible(true)}>
          <Image source={require("../../assets/images/coin.png")} style={styles.iconImage} />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Mua coin</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.shortcut}>
          <Image source={require("../../assets/images/memories.png")} style={styles.iconImage} />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Kỷ niệm</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.shortcut}>
          <Image source={require("../../assets/images/video-game.png")} style={styles.iconImage} />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Trò chơi</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.shortcut}>
          <Image
            source={require("../../assets/images/messenger.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Messenger</Text>
        </ExTouchableOpacity>
      </View>
      <ExTouchableOpacity style={styles.btnOption}>
        <VectorIcon name="help-circle" type="MaterialCommunityIcons" size={24} color="#666" />
        <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 8 }}>Trợ giúp & Hỗ trợ</Text>
      </ExTouchableOpacity>
      <ExTouchableOpacity style={styles.btnOption}>
        <VectorIcon name="cog" type="MaterialCommunityIcons" size={24} color="#666" />
        <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 8 }}>
          Cài đặt thông báo đẩy
        </Text>
      </ExTouchableOpacity>
      <ExTouchableOpacity
        style={{
          ...styles.userWrapper,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
        onPress={onLogoutPress}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Đăng xuất</Text>
        )}
      </ExTouchableOpacity>
      <Modal transparent visible={isModalVisible} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <Text style={styles.text}>Nhập số coin bạn muốn mua?</Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    placeholder="Số coin"
                    selectionColor="#333"
                    style={styles.inputBox}
                    value={amount}
                    onChangeText={(value) => setAmount(value)}
                  />
                  <Image
                    source={require("../../assets/images/coin.png")}
                    style={{
                      ...styles.iconImage,
                      position: "absolute",
                      right: 12,
                      top: 24,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ExTouchableOpacity onPress={handleBuyCoins} style={styles.btnConfirm}>
                    <Text style={{ fontSize: 16, color: "#fff" }}>Xác nhận</Text>
                  </ExTouchableOpacity>
                  <ExTouchableOpacity
                    onPress={closeModal}
                    style={{
                      ...styles.btnConfirm,
                      backgroundColor: "#dedede",
                      marginLeft: 24,
                      paddingHorizontal: 24,
                    }}>
                    <Text style={{ fontSize: 16 }}>Hủy</Text>
                  </ExTouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.001)",
    width: "100%",
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  btnSearch: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userWrapper: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 12,
  },
  allShortcut: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
  },
  shortcut: {
    backgroundColor: "#fff",
    height: 80,
    paddingHorizontal: 15,
    flexBasis: "48%",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 16,
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  coin: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  btnOption: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: SCREEN_WIDTH - 80,
    borderRadius: 12,
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    marginBottom: 12,
  },
  inputBox: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#bebebe",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 18,
  },
  btnConfirm: {
    padding: 8,
    backgroundColor: "#1877f2",
    borderRadius: 8,
  },
});

export default MenuScreen;
