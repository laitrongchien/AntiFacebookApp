import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { useRoute } from "@react-navigation/native";
import { auth as authApi } from "../../api/auth";

const PolicyScreen = () => {
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { email, password } = route.params;
  const device_id = "string";
  // console.log(email, password);
  const handleRegister = async () => {
    setLoading(true);
    const res = await authApi.signup(email, password, device_id);
    setLoading(false);
    const verifyCode = res.data.data.verify_code;
    console.log(verifyCode);
    // navigation.navigate("VerifyScreen", { verifyCode });
    navigation.navigate("VerifyScreen", { email, password, device_id });
  };
  return (
    <View style={styles.container}>
      <VectorIcon
        name="arrow-left"
        type="MaterialCommunityIcons"
        color="#000"
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Text style={{ paddingVertical: 12, fontSize: 22, fontWeight: "500" }}>
        Chấp nhận điều khoản và chính sách của Facebook
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 18, fontWeight: "400" }}>
        Bằng cách nhấn vào Tôi đồng ý, bạn đồng ý tạo tài khoản, cũng như chấp
        nhận Điều khoản, Chính sách quyền riêng tư và Chính sách Cookie của
        Facebook
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 18, fontWeight: "400" }}>
        Chính sách quyền riêng tư mô tả các cách mà chúng tôi có thể dùng thông
        tin thu thập được khi bạn tạo tài khoản. Chẳng hạn, chúng tôi sử dụng
        thông tin này để cung cấp, cá nhân hóa, và cải thiện các sản phẩm của
        mình bao gồm quảng cáo
      </Text>
      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16 }}>Tôi đồng ý</Text>
        )}
      </TouchableOpacity>
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
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    backgroundColor: "#1877f2",
    marginTop: 12,
  },
});

export default PolicyScreen;
