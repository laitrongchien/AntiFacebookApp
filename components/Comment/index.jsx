import { memo } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

import { SCREEN_WIDTH } from "../../constants";
import { navigation } from "../../rootNavigation";
import { formatTime } from "../../utils/helper";

const Comment = ({ item, commentInputRef, setMarkId }) => {
  const handleReply = () => {
    commentInputRef.current && commentInputRef.current.focus();
    setMarkId(item.id);
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserXProfileScreen", {
              userXId: item.poster.id,
            })
          }>
          <Image
            style={styles.avatar}
            source={
              item.poster.avatar
                ? { uri: item.poster.avatar }
                : require("../../assets/images/default-img.png")
            }
          />
        </TouchableOpacity>
        <View style={styles.commentContainer}>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserXProfileScreen", {
                  userXId: item.poster.id,
                })
              }>
              <Text style={styles.name}>{item.poster.name || "Username"}</Text>
            </TouchableOpacity>
            <Text style={styles.content}>{item.mark_content}</Text>
          </View>
          <View style={styles.toolContainer}>
            <Text style={styles.createAt}>{formatTime(item.created)}</Text>
            <TouchableOpacity style={styles.replyBtn} onPress={handleReply}>
              <Text>Phản hồi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {item.comments != 0 &&
        item.comments.map((repComment, index) => {
          return (
            <View style={styles.repContainer} key={index}>
              <Image
                style={styles.repAvatar}
                source={
                  repComment.poster.avatar
                    ? { uri: repComment.poster.avatar }
                    : require("../../assets/images/default-img.png")
                }
              />
              <View style={styles.commentContainer}>
                <View style={styles.contentContainer}>
                  <TouchableOpacity>
                    <Text style={styles.name}>{repComment.poster.name || "Rep username"}</Text>
                  </TouchableOpacity>
                  <Text style={styles.content}>{repComment.content}</Text>
                </View>
                <View style={styles.toolContainer}>
                  <Text style={styles.createAt}>{formatTime(repComment.created)}</Text>
                  <TouchableOpacity style={styles.replyBtn} onPress={handleReply}>
                    <Text>Phản hồi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default memo(Comment);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
  },
  repContainer: {
    flexDirection: "row",
    marginLeft: 48,
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  repAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  commentContainer: {
    width: SCREEN_WIDTH * 0.7,
  },
  contentContainer: {
    padding: 10,
    paddingTop: 5,
    backgroundColor: "#e9ebee",
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
  },
  image: {
    borderRadius: 10,
  },
  toolContainer: {
    flexDirection: "row",
  },
  replyBtn: {
    textAlign: "center",
    flex: 1,
    marginLeft: 24,
  },
});
