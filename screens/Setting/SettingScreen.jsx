import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import { auth } from "../../api/auth";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const SettingScreen = () => {
  const handleDeactivate = () => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn vô hiệu hóa tài khoản", [
      {
        text: "OK",
        onPress: async () => {
          await auth.deactive();
        },
      },
      {
        text: "Cancel",
      },
    ]);
  };

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon name="arrow-left" type="MaterialCommunityIcons" color="#000" size={32} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Cài đặt & Quyền riêng tư</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <VectorIcon name="magnify" type="MaterialCommunityIcons" color="#000" size={28} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 12 }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Cài đặt tài khoản</Text>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigation.navigate("ChangePassScreen")}>
            <VectorIcon
              name="shield-check-outline"
              type="MaterialCommunityIcons"
              size={24}
              color="#333"
            />
            <Text style={{ fontSize: 16, marginLeft: 16 }}>Đổi mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}>
            <VectorIcon
              name="shield-account"
              type="MaterialCommunityIcons"
              size={24}
              color="#333"
            />
            <Text style={{ fontSize: 16, marginLeft: 16 }}>Đổi tên hiển thị</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption} onPress={handleDeactivate}>
            <VectorIcon name="lock" type="MaterialCommunityIcons" size={24} color="#333" />
            <Text style={{ fontSize: 16, marginLeft: 16 }}>Vô hiệu hóa tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigation.navigate("RestoreEmailScreen")}>
            <VectorIcon name="lock-open" type="MaterialCommunityIcons" size={24} color="#333" />
            <Text style={{ fontSize: 16, marginLeft: 16 }}>Khôi phục tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.btnOption, borderBottomColor: "#ddd", borderBottomWidth: 1 }}>
            <VectorIcon name="bell" type="MaterialCommunityIcons" size={24} color="#333" />
            <Text style={{ fontSize: 16, marginLeft: 16 }}>Cài đặt thông báo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  btnOption: {
    flexDirection: "row",
    paddingVertical: 12,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
});

export default SettingScreen;
