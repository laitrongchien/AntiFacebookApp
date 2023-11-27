import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import VectorIcon from "../../../utils/VectorIcon";
import { useSelector } from "react-redux";

const CreateStory = () => {
  const { avatar } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <ImageBackground
          imageStyle={{ resizeMode: "cover" }}
          style={styles.imageBackground}
          source={{ uri: avatar }}
        >
          <View style={styles.iconWrapper}>
            <VectorIcon
              name="plus"
              type="FontAwesome5"
              size={22}
              color="#fff"
            />
          </View>
        </ImageBackground>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Tạo tin</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreateStory;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 5,
    height: 250,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imageBackground: {
    position: "relative",
    height: 180,
    width: 140,
  },
  iconWrapper: {
    position: "absolute",
    bottom: -20,
    left: 54,
    borderRadius: 50,
    height: 36,
    width: 36,
    backgroundColor: "#318bfb",
    justifyContent: "center",
    alignItems: "center",
  },
  nameWrapper: {
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
