import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { auth as authApi } from "../../api/auth";
import { useRoute } from "@react-navigation/native";

const NewPasswordScreen = () => {
  const [newPass, setNewPass] = useState("");
  const route = useRoute();

  const { email, codeVerify } = route.params;

  const handlePress = async () => {
    const res = await authApi.resetPassword(email, codeVerify, newPass);
    // console.log(email, codeVerify, newPass);
    // console.log(res);
    if (res.data.code === "1000") {
      navigation.navigate("LoginScreen");
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
      <Text style={{ paddingVertical: 12, fontSize: 22, fontWeight: "500" }}>
        Điền mật khẩu mới
      </Text>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Mật khẩu"
          value={newPass}
          onChangeText={(value) => setNewPass(value)}
          style={styles.inputBox}
          selectionColor="#333"
        />
        {newPass && (
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setNewPass("")}
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
        <Text style={{ color: "#fff", fontSize: 16 }}>Hoàn thành</Text>
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

export default NewPasswordScreen;
