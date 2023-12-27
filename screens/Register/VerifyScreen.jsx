import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
// import { navigation } from "../../rootNavigation";
import { auth as authApi } from "../../api/auth";
import { useRoute } from "@react-navigation/native";
import { login } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const VerifyScreen = () => {
  const [codeVerify, setCodeVerify] = useState("");
  const route = useRoute();
  const { email, password, device_id } = route.params;
  const dispatch = useDispatch();

  const handlePress = async () => {
    const res = await authApi.checkVerifyCode(email, codeVerify);
    console.log(res);
    if (res.data.code === "1000") {
      dispatch(login(email, password, device_id));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ paddingVertical: 12, fontSize: 22, fontWeight: "500" }}>
        Nhập mã xác nhận
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 18, fontWeight: "400" }}>
        Để xác nhận tài khoản, hãy nhập mã gồm 6 chữ số được gửi đến email của
        bạn
      </Text>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Mã xác nhận"
          value={codeVerify}
          onChangeText={(value) => setCodeVerify(value)}
          style={styles.inputBox}
          selectionColor="#333"
        />
        {codeVerify && (
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setCodeVerify("")}
          >
            <VectorIcon
              name="close"
              type="MaterialCommunityIcons"
              size={26}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Tiếp</Text>
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
    marginTop: 36,
  },
  inputBox: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#bebebe",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  closeBtn: {
    position: "absolute",
    right: 8,
    top: 24,
  },
});

export default VerifyScreen;
