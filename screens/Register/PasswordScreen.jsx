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
import { useRoute } from "@react-navigation/native";

const PasswordScreen = () => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const route = useRoute();
  const { email } = route.params;

  const handleChangePassword = (value) => {
    setPassword(value);
    setError("");
  };

  const handleValidate = () => {
    if (!password) {
      setError("Mật khẩu không được để trống");
    } else if (password.length < 6) {
      setError("Mật khẩu phải gồm ít nhất 6 ký tự");
    } else {
      navigation.navigate("PolicyScreen", { email, password });
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
        Nhập mật khẩu của bạn
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 16, fontWeight: "400" }}>
        Nhập mật khẩu gồm ít nhất 6 ký tự chữ cái hoặc số
      </Text>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={handleChangePassword}
          style={[
            styles.inputBox,
            isPasswordFocused
              ? { borderColor: "#000" }
              : { borderColor: "#bebebe" },
            error ? { borderColor: "#a81414" } : null,
          ]}
          selectionColor="#333"
          underlineColorAndroid="#fff"
          secureTextEntry={!passwordShown}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        {password && (
          <TouchableOpacity style={styles.iconBtn}>
            {passwordShown ? (
              <VectorIcon
                name="eye-off"
                type="MaterialCommunityIcons"
                size={26}
                color="#333"
                onPress={() => setPasswordShown(false)}
              />
            ) : (
              <VectorIcon
                name="eye"
                type="MaterialCommunityIcons"
                size={26}
                color="#333"
                onPress={() => setPasswordShown(true)}
              />
            )}
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
  iconBtn: {
    position: "absolute",
    right: 8,
    top: 24,
  },
});

export default PasswordScreen;
