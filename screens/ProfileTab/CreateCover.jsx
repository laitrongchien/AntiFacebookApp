import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { useRoute } from "@react-navigation/native";
import { setUserInfo } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const CreateCover = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { image } = route.params;
  //   console.log(image);

  const saveCover = () => {
    try {
      const formData = new FormData();

      const uriParts = image.uri.split("/");
      const fileNameWithType = uriParts[uriParts.length - 1];
      const [fileName, fileType] = fileNameWithType.split(".");

      const imageData = {
        uri:
          Platform.OS === "android"
            ? image.uri
            : image.uri.replace("file://", ""),
        type: "image/" + fileType,
        name: fileName,
      };
      //   console.log(imageData);
      formData.append("cover_image", imageData);
      dispatch(setUserInfo(formData));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftItem}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 3 }}
          >
            <VectorIcon
              name="arrow-left"
              type="MaterialCommunityIcons"
              color="#000"
              size={32}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 8, fontSize: 18 }}>Xem trước ảnh bìa</Text>
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={saveCover}>
          <Text style={{ fontSize: 16, color: "#fff" }}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 24 }}>
        <Image source={{ uri: image.uri }} style={styles.cover} />
      </View>
    </View>
  );
};

export default CreateCover;

const styles = StyleSheet.create({
  header: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  saveBtn: {
    backgroundColor: "#1877f2",
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cover: {
    width: "100%",
    height: 240,
  },
});
