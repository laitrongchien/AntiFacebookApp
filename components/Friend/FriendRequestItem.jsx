import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const FriendRequestItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.avatarView}>Avatar</Text>
      <Text style={styles.infoView}>Info</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  avatarView: {
    flex: 3,
  },
  infoView: {
    flex: 7,
  },
});

export default FriendRequestItem;
