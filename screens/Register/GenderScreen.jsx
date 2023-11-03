import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { RadioButton } from "react-native-paper";

const GenderScreen = () => {
  const [checked, setChecked] = useState("male");
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
        Giới tính của bạn là gì?
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 16, fontWeight: "400" }}>
        Bạn có thể thay đổi người nhìn thấy giới tính của mình trên trang cá
        nhân vào lúc khác.
      </Text>
      <View style={styles.genderWrapper}>
        <TouchableOpacity
          style={styles.genderItem}
          onPress={() => setChecked("male")}
        >
          <Text style={styles.label}>Nam</Text>
          <RadioButton
            value="male"
            status={checked === "male" ? "checked" : "unchecked"}
            color="#1877f2"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.genderItem}
          onPress={() => setChecked("female")}
        >
          <Text style={styles.label}>Nữ</Text>
          <RadioButton
            value="female"
            status={checked === "female" ? "checked" : "unchecked"}
            color="#1877f2"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.genderItem}
          onPress={() => setChecked("other")}
        >
          <Text style={styles.label}>Tùy chọn khác</Text>
          <RadioButton
            value="other"
            status={checked === "other" ? "checked" : "unchecked"}
            color="#1877f2"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("EmailScreen")}
      >
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
    textAlignVertical: "bottom",
  },
  genderWrapper: {
    backgroundColor: "#efefef",
    borderRadius: 20,
  },
  genderItem: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
  },
});

export default GenderScreen;
