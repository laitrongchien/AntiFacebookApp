import { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Alert } from "react-native";

import { auth } from "../../api/auth";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const ChangePassScreen = () => {
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSubmit = async () => {
    try {
      await auth.changePassword(pass, newPass);
      Alert.alert("Thông báo", "Mật khẩu đã được thay đổi thành công", [{ text: "OK" }]);
    } catch (error) {
      //   console.log(error.reponse.data.code == 9990);
      if (error.response.data.code == 9990) {
        Alert.alert("Thông báo", "Mật khẩu hiện tại không đúng", [{ text: "OK" }]);
      } else {
        Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 6 ký tự", [{ text: "OK" }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
          <VectorIcon name="arrow-left" type="MaterialCommunityIcons" color="#000" size={30} />
        </TouchableOpacity>
        <Text style={styles.navigationTitle}>Đổi mật khẩu</Text>
      </View>

      <View style={styles.wrapper}>
        <TextInput
          placeholder="Nhập mật khẩu hiện tại"
          value={pass}
          onChangeText={(value) => setPass(value)}
          style={styles.inputBox}
          selectionColor="#333"
        />
      </View>
      <View style={styles.wrapper}>
        <TextInput
          placeholder="Nhập mật khẩu mới"
          value={newPass}
          onChangeText={(value) => setNewPass(value)}
          style={styles.inputBox}
          selectionColor="#333"
        />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btnSave} onPress={handleSubmit}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  navigationBar: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  btnBack: {
    width: 50,
    alignItems: "center",
  },
  navigationTitle: {
    fontSize: 18,
  },
  inputBox: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#bebebe",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  wrapper: {
    padding: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  btnSave: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1877f2",
    height: 40,
    borderRadius: 5,
  },
});
