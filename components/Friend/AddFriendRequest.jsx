import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import FriendRequestItem from "./FriendRequestItem";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../rootNavigation";

const AddFriendRequest = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.infoWrapper}>
        <View style={styles.requestWrapper}>
          <Text style={styles.titleText}>Lời mời kết bạn</Text>
          <Text style={styles.number}>3</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={styles.viewAllText}
            onPress={() => {
              navigation.navigate("AllRequest");
            }}
          >
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View>
      <FriendRequestItem />
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
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  requestWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  number: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: "#007bff",
  },
});

export default AddFriendRequest;
