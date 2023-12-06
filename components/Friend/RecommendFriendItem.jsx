import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import ExTouchableOpacity from "../ExTouchableOpacity";

const RecommendFriendItem = ({ recommendItem }) => {
  const { username, avatar, same_friends } = recommendItem;
  return (
    <View>
      <ExTouchableOpacity style={styles.container}>
        <ImageBackground
          imageStyle={{ borderRadius: 64 }}
          style={styles.avatarView}
          source={
            avatar
              ? { uri: avatar }
              : require("../../assets/images/default-img.png")
          }
        ></ImageBackground>
        <View style={styles.optionView}>
          <View style={styles.optionView_name}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {username || "Username"}
            </Text>
          </View>
          {same_friends != 0 && (
            <View style={styles.optionView_coFriend}>
              <ImageBackground
                imageStyle={{ borderRadius: 64 }}
                style={styles.coFriendAvatar}
                source={require("../../assets/images/default-img.png")}
              ></ImageBackground>
              <Text style={{ marginLeft: 5 }}>{same_friends} bạn chung</Text>
            </View>
          )}

          <View style={styles.optionView_button}>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#1877f2" }}
            >
              <Text style={styles.buttonText}>Thêm bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#e8e8e8" }}
            >
              <Text style={{ ...styles.buttonText, color: "black" }}>Gỡ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ExTouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    paddingVertical: 8,
  },
  avatarView: {
    flex: 3,
    height: 84,
    width: 84,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginLeft: -8,
    marginRight: 5,
  },

  optionView: {
    flex: 7,
  },
  optionView_name: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionView_coFriend: {
    marginTop: 5,
    flexDirection: "row",
  },
  coFriendAvatar: {
    height: 20,
    width: 20,
    position: "relative",
  },
  optionView_button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginRight: 10,
    flex: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RecommendFriendItem;
