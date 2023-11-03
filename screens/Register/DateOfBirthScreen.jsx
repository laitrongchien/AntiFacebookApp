import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateOfBirthScreen = () => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(Date.now()));
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // console.log(age);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleDateConfirm = (date) => {
    setDateOfBirth(date);
    hideDatePicker();
  };

  // Format date in "dd/mm/yyyy" format
  const formattedDateOfBirth = new Intl.DateTimeFormat("en-GB").format(
    dateOfBirth
  );

  useEffect(() => {
    // Calculate age in the useEffect to avoid infinite re-renders
    const currentTime = new Date(Date.now());
    const age = currentTime.getUTCFullYear() - dateOfBirth.getUTCFullYear();
    setError("");
    setAge(age);
  }, [dateOfBirth]);

  const handleValidate = () => {
    if (age < 10 && age > 0) {
      setError(
        "Hình như bạn đang nhập sai thông tin về tuổi. Tuổi của bạn còn nhỏ để sử dụng Facebook"
      );
    } else {
      navigation.navigate("GenderScreen");
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
        Ngày sinh của bạn là khi nào?
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 16, fontWeight: "400" }}>
        Chọn ngày sinh của bạn.Bạn luôn có thể đặt thông tin này ở chế độ riêng
        tư vào lúc khác.
      </Text>
      <View style={{ position: "relative" }}>
        <TextInput
          ref={inputRef}
          value={formattedDateOfBirth}
          onFocus={showDatePicker}
          style={styles.inputBox}
          selectionColor="#333"
        />
        <Text
          style={{ position: "absolute", top: 10, left: 12, color: "#333" }}
        >
          Ngày sinh ({age} tuổi)
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        date={dateOfBirth}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        display="spinner"
      />

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
    textAlignVertical: "bottom",
  },
});

export default DateOfBirthScreen;
