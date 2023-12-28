import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useState } from "react";
import { SCREEN_WIDTH } from "../../constants";
import { pickOneImage } from "../../utils/PickImage";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { changeProfileAfterSignup } from "../../redux/actions/authAction";
import { navigation } from "../../rootNavigation";

const ChangeAvatarScreen = () => {
  const route = useRoute();
  const fullName = route.params?.fullName || "Username";
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePickImage = async () => {
    const result = await pickOneImage();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // await dispatch(changeProfileAfterSignup(fullName, image));
      const imageFile = {
        uri:
          image ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUzlfySeiXVWcK9aWigruMaOILZBN2YooUMQ&usqp=CAU",
        type: "image/jpeg",
        name: "avatar.jpg",
      };
      const formData = new FormData();
      formData.append("username", fullName);
      formData.append("avatar", imageFile);

      await dispatch(changeProfileAfterSignup(formData));
      setLoading(false);
      navigation.navigate("MainScreen");
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ paddingVertical: 12, fontSize: 22, fontWeight: "500" }}>
        Thêm ảnh đại diện
      </Text>
      <Text style={{ paddingVertical: 12, fontSize: 18, fontWeight: "400" }}>
        Hãy thêm ảnh đại diện để bạn bè nhận ra bạn. Mọi người có thể nhìn thấy
        ảnh của bạn
      </Text>
      <Image
        style={styles.avatar}
        source={
          image
            ? { uri: image }
            : require("../../assets/images/default-img.png")
        }
      />
      <TouchableOpacity style={styles.btn} onPress={handlePickImage}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Thêm ảnh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.btn, backgroundColor: "#fff" }}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator color="#333" />
        ) : (
          <Text style={{ color: "#333", fontSize: 18 }}>
            {!image ? "Bỏ qua" : "Tiếp"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChangeAvatarScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#1877f2",
    marginTop: 12,
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 2000,
    borderColor: "#fff",
    borderWidth: 5,
    marginLeft: (SCREEN_WIDTH - 190) / 2 - 15,
    marginBottom: 32,
  },
});
