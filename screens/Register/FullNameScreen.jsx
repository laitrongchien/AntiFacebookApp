import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";

const FullNameScreen = () => {
  const [isFirstFocused, setIsFirstFocused] = useState(false);
  const [isLastFocused, setIsLastFocused] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleChangeFirstName = (value) => {
    setFirstName(value);
    setError("");
  };

  const handleChangeLastName = (value) => {
    setLastName(value);
    setError("");
  };

  const handleValidate = () => {
    if (!firstName && !lastName) {
      setError("Vui lòng nhập họ và tên của bạn");
    } else if (firstName.length < 2 || lastName.length < 2) {
      setError(
        "Tên trên Facebook không thể quá ngắn. Hãy nhập họ tên có ít nhất 2 chữ cái"
      );
    } else {
      navigation.navigate("DateOfBirthScreen");
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
        Bạn tên gì?
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 16, fontWeight: "400" }}>
        Nhập tên bạn sử dụng trong đời thực
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ position: "relative", flexBasis: "48%" }}>
          <TextInput
            placeholder="Họ"
            value={firstName}
            onChangeText={handleChangeFirstName}
            style={[
              styles.inputBox,
              isFirstFocused
                ? { borderColor: "#000" }
                : { borderColor: "#bebebe" },
              error ? { borderColor: "#a81414" } : null,
            ]}
            selectionColor="#333"
            onFocus={() => setIsFirstFocused(true)}
            onBlur={() => setIsFirstFocused(false)}
          />
          {firstName && (
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setFirstName("")}
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
        <View style={{ position: "relative", flexBasis: "48%" }}>
          <TextInput
            placeholder="Tên"
            value={lastName}
            onChangeText={handleChangeLastName}
            style={[
              styles.inputBox,
              isLastFocused
                ? { borderColor: "#000" }
                : { borderColor: "#bebebe" },
              error ? { borderColor: "#a81414" } : null,
            ]}
            selectionColor="#333"
            onFocus={() => setIsLastFocused(true)}
            onBlur={() => setIsLastFocused(false)}
          />
          {lastName && (
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setLastName("")}
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

export default FullNameScreen;
