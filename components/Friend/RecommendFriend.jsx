import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FriendRequestItem from "./FriendRequestItem";
import RecommendFriendItem from "./RecommendFriendItem";

const RecommendFriend = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>Những người bạn có thể biết</Text>
      <RecommendFriendItem />
      <RecommendFriendItem />
      <RecommendFriendItem />
      <RecommendFriendItem />
      <RecommendFriendItem />
      <RecommendFriendItem />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RecommendFriend;
