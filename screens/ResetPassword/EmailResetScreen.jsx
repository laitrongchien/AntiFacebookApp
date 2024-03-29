import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { auth } from "../../api/auth";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const EmailResetScreen = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (value) => {
    setEmail(value);
    setError("");
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleValidate = async () => {
    if (!email) {
      setError("Phải có email");
    } else if (!isEmailValid(email)) {
      setError("Nhập địa chỉ email hợp lệ");
    } else {
      setLoading(true);
      const res = await auth.getVerifyCode(email);
      setLoading(false);
      console.log(res.data.data.verify_code);
      const verifyCode = res.data.data.verify_code;
      if (res.data.code === "1000") {
        navigation.navigate("VerifyCodeResetScreen", { email, verifyCode });
      }
    }
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
      <Text style={{ paddingTop: 12, fontSize: 22, fontWeight: "500" }}>Lấy lại mật khẩu</Text>
      <Text style={{ paddingVertical: 12, fontSize: 16, fontWeight: "400" }}>
        Nhập email để lấy lại mật khẩu
      </Text>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={handleChangeEmail}
          style={[
            styles.inputBox,
            isEmailFocused ? { borderColor: "#000" } : { borderColor: "#bebebe" },
            error ? { borderColor: "#a81414" } : null,
          ]}
          selectionColor="#333"
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
        {email && (
          <TouchableOpacity style={styles.closeBtn} onPress={() => setEmail("")}>
            <VectorIcon name="close" type="MaterialCommunityIcons" size={26} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={{ marginTop: 8, color: "#a81414" }}>{error}</Text>}
      <TouchableOpacity style={styles.btn} onPress={handleValidate}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16 }}>Tiếp</Text>
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
    marginTop: 24,
  },
  inputBox: {
    fontSize: 16,
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

export default EmailResetScreen;
