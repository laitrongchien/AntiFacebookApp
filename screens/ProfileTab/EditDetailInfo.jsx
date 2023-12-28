import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { useState } from "react";
import { setUserInfo } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const EditDetailInfo = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (city) formData.append("city", city);
      if (country) formData.append("country", country);
      dispatch(setUserInfo(formData));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnBack}
        >
          <VectorIcon
            name="arrow-left"
            type="MaterialCommunityIcons"
            color="#000"
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.navigationTitle}>Chỉnh sửa chi tiết</Text>
      </View>

      <View style={styles.wrapper}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Thành phố</Text>
        <TextInput
          placeholder="Đến từ thành phố"
          value={city}
          onChangeText={(value) => setCity(value)}
          style={styles.inputBox}
          selectionColor="#333"
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Quốc gia</Text>
        <TextInput
          placeholder="Quốc gia"
          value={country}
          onChangeText={(value) => setCountry(value)}
          style={styles.inputBox}
          selectionColor="#333"
        />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnSave}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
            Lưu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditDetailInfo;

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
