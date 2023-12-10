import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { SCREEN_WIDTH } from "../../constants";
import ExTouchableOpacity from "../ExTouchableOpacity";

const FriendGallery = ({ friends, total }) => {
  return (
    <View style={styles.friendsWrapper}>
      <View>
        <TouchableOpacity style={styles.friendsBar}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bạn bè</Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>
              {total} người bạn
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.btnFindFriends}>
            <Text style={{ fontSize: 16, color: "#1877f2", fontWeight: "500" }}>
              Tìm bạn bè
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.friendGallery}>
        {friends.slice(0, 6).map((friend) => (
          <View style={styles.friendItem} key={friend.id}>
            <ExTouchableOpacity activeOpacity={0.8}>
              <Image
                source={
                  friend.avatar
                    ? { uri: friend.avatar }
                    : require("../../assets/images/default-img.png")
                }
                style={styles.friendAvatar}
              />
            </ExTouchableOpacity>
            <ExTouchableOpacity style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {friend.username}
              </Text>
            </ExTouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.btnViewAllFriends}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Xem tất cả bạn bè
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendGallery;

const styles = StyleSheet.create({
  friendsWrapper: {
    paddingVertical: 15,
  },
  friendsBar: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnFindFriends: {
    paddingHorizontal: 11,
  },
  friendGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  friendItem: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    marginBottom: 15,
  },
  friendAvatar: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    height: (SCREEN_WIDTH - 30 - 20) / 3,
    borderRadius: 10,
  },
  btnViewAllFriends: {
    width: "100%",
    borderRadius: 5,
    height: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
});
