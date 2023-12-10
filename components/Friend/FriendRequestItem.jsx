import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { memo, useState } from "react";
import ExTouchableOpacity from "../ExTouchableOpacity";
import { getTimeSendRequest } from "../../utils/helper";
import { user as userApi } from "../../api/user";

const FriendRequestItem = ({ requestItem }) => {
  const { id, username, avatar, created, same_friends } = requestItem;
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptRequest = async () => {
    setIsAccepted(true);
    await userApi.setAcceptFriend(id, "1");
  };

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
            <Text style={{ opacity: 0.4, right: -10, fontSize: 12 }}>
              {getTimeSendRequest(created)}
            </Text>
          </View>
          <View style={styles.optionView_coFriend}>
            {same_friends != 0 && (
              <ImageBackground
                imageStyle={{ borderRadius: 64 }}
                style={styles.coFriendAvatar}
                source={require("../../assets/images/default-img.png")}
              ></ImageBackground>
            )}

            {same_friends != 0 && (
              <Text style={{ marginLeft: 5 }}>{same_friends} bạn chung</Text>
            )}
          </View>
          {isAccepted ? (
            <Text style={{ fontSize: 15 }}>
              Bạn và {username} hiện đã là bạn bè
            </Text>
          ) : (
            <View style={styles.optionView_button}>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#1877f2" }}
                onPress={handleAcceptRequest}
              >
                <Text style={styles.buttonText}>Chấp nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#e8e8e8" }}
              >
                <Text style={{ ...styles.buttonText, color: "black" }}>
                  Xóa
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
    marginTop: 16,
  },
  avatarView: {
    flex: 3,
    height: 84,
    width: 84,
    alignItems: "center",
    justifyContent: "center",
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

export default memo(FriendRequestItem);
