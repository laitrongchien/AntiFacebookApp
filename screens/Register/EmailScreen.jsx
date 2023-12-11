import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { auth } from "../../api/auth";

const EmailScreen = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (value) => {
    setEmail(value);
    setError("");
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isEmailExisted = async (email) => {
    const res = await auth.checkEmail(email);
    return res.data.data.existed;
  };

  const handleValidate = () => {
    if (!email) {
      setError("Phải có email");
    } else if (!isEmailValid(email)) {
      setError("Nhập địa chỉ email hợp lệ");
    } else if (isEmailExisted(email)) {
      setError("Hiện đã có tài khoản liên kết với địa chỉ email này");
    } else {
      navigation.navigate("PasswordScreen", { email });
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
      <Text style={{ paddingTop: 12, fontSize: 22, fontWeight: "500" }}>
        Email của bạn là gì?
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 16, fontWeight: "400" }}>
        Nhập email có thể dùng để liên hệ với bạn. Thông tin này sẽ không hiển
        thị với ai khác trên trang cá nhân của bạn.
      </Text>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={handleChangeEmail}
          style={[
            styles.inputBox,
            isEmailFocused
              ? { borderColor: "#000" }
              : { borderColor: "#bebebe" },
            error ? { borderColor: "#a81414" } : null,
          ]}
          selectionColor="#333"
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
        {email && (
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setEmail("")}
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
      {error && <Text style={{ marginTop: 8, color: "#a81414" }}>{error}</Text>}
      <TouchableOpacity style={styles.btn} onPress={handleValidate}>
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

export default EmailScreen;
