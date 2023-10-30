import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const Story = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <ImageBackground
          imageStyle={{ resizeMode: "cover" }}
          style={styles.imageBackground}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGJROMHaqxsLxl0TgyYtCFR_5vMNL8QYolWg&usqp=CAU",
          }}
        >
          <Image
            style={styles.avatar}
            source={require("../../../assets/images/default-img.png")}
          />
        </ImageBackground>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Nguyen Van A</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imageBackground: {
    position: "relative",
    height: 250,
    width: 140,
  },
  avatar: {
    marginTop: 10,
    marginLeft: 10,
    resizeMode: "cover",
    borderRadius: 50,
    height: 44,
    width: 44,
    borderWidth: 2,
    borderColor: "#1877f2",
  },
  nameWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  name: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
});
