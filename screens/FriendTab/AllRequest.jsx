import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import FriendRequestItem from "../../components/Friend/FriendRequestItem";

const AllRequest = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftItem}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 3 }}
          >
            <VectorIcon
              name="arrow-left"
              type="MaterialCommunityIcons"
              color="#000"
              size={32}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 8, fontSize: 18 }}>Lời mời kết bạn</Text>
        </View>
        <VectorIcon
          name="dots-horizontal"
          type="MaterialCommunityIcons"
          color="#666"
          size={28}
          style={{ marginRight: 6 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.requestWrapper}>
          <Text style={styles.titleText}>Lời mời kết bạn</Text>
          <Text style={styles.number}>3</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              color: "#0a7bff",
              marginRight: 10,
              marginTop: 16,
              fontSize: 16,
            }}
          >
            Sắp xếp
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.friendRequestItem}>
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  friendRequestItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 12,
  },
  requestWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBot: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  number: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default AllRequest;
