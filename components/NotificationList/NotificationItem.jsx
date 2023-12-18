import { Text, StyleSheet, View, Image, ImageBackground } from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import ExTouchableOpacity from "../ExTouchableOpacity";
import { SCREEN_WIDTH } from "../../constants";
import NotificationOption from "./NotificationOption";
import BottomModal from "../BottomModal";
import { useState } from "react";
import { navigation } from "../../rootNavigation";
import { formatTime } from "../../utils/helper";
import { post } from "../../api/post";

const NotificationItem = ({ notificationData }) => {
  const [notificationOptionVisible, setNotificationOptionVisible] =
    useState("false");

  const { type, object_id, title, created, group, read, user } =
    notificationData;

  let content = "";
  if (type == 1) {
    content = `gửi lời mời kết bạn đến bạn`;
  } else if (type == 2) {
    content = "đã chấp nhận lời mời kết bạn của bạn";
  } else if (type == 3) {
    content = "đã đăng một bài đăng mới";
  } else if (type == 4) {
    content = "đã có những cập nhật mới liên quan đến bài đăng";
  } else if (type == 5) {
    content = "đã bày tỏ cảm xúc về bài viết của bạn";
  } else if (type == 6) {
    content = "đã đăng mark về bài viết của bạn";
  } else if (type == 7) {
    content = "đã phản hồi bình luận của bạn";
  } else if (type == 8) {
    content = "đã đăng một video mới";
  } else if (type == 9) {
    content = "đã bình luận về bài viết của bạn";
  }

  const handlePress = async () => {
    if (type == 1) {
      navigation.navigate("AllRequest");
    } else if (type != 1 && type != 2) {
      const res = await post.getPost(object_id);
      navigation.navigate("PostDetailScreen", { postData: res.data.data });
    }
  };
  return (
    <View style={{ backgroundColor: read == 0 ? "#e7f3ff" : "#fff" }}>
      <ExTouchableOpacity style={{ ...styles.container }} onPress={handlePress}>
        <ImageBackground
          imageStyle={{ borderRadius: 64 }}
          style={styles.avatar}
          source={
            user.avatar
              ? { uri: user.avatar }
              : require("../../assets/images/default-img.png")
          }
        >
          {/* {type == 1 && (
            <View style={{ ...styles.notificationIcon }}>
              <VectorIcon
                name="account-multiple"
                type="MaterialCommunityIcons"
                color="#666"
                size={28}
              />
            </View>
          )} */}
        </ImageBackground>
        <View style={styles.contentWrapper}>
          <Text style={{ fontSize: 15, fontWeight: "400" }}>
            <Text style={{ fontWeight: "500" }}>{user.username}</Text> {content}
          </Text>
          <Text style={{ color: "#333" }}>{formatTime(created)}</Text>
        </View>
        <ExTouchableOpacity
          style={styles.btnOptions}
          onPress={() => setNotificationOptionVisible(true)}
        >
          <VectorIcon
            name="dots-horizontal"
            type="MaterialCommunityIcons"
            color="#666"
            size={28}
          />
        </ExTouchableOpacity>
      </ExTouchableOpacity>
      <BottomModal
        isVisible={notificationOptionVisible}
        closeModal={() => setNotificationOptionVisible(false)}
      >
        <NotificationOption />
      </BottomModal>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  avatar: {
    height: 54,
    width: 54,
    position: "relative",
    borderRadius: 54,
    borderColor: "#ddd",
    borderWidth: 0.5,
  },
  contentWrapper: {
    width: SCREEN_WIDTH - 40 - 30 - 64,
    paddingHorizontal: 10,
  },
  mainContent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btnOptions: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  pureTxt: {
    fontSize: 16,
  },
  hightlightTxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
  notificationIcon: {
    position: "absolute",
    bottom: -5,
    right: -5,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
