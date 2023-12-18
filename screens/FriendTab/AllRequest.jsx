import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import FriendRequestItem from "../../components/Friend/FriendRequestItem";
import { useSelector, useDispatch } from "react-redux";
import { getRequestedFriend } from "../../redux/actions/userAction";

const AllRequest = () => {
  const dispatch = useDispatch();
  const { requestedFriends } = useSelector((state) => state.friend);

  const defaultIndex = 0;
  const defaultCount = 10;

  useEffect(() => {
    dispatch(getRequestedFriend(defaultIndex, defaultCount));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <FriendRequestItem requestItem={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
          paddingVertical: 12,
        }}
      >
        <View style={styles.requestWrapper}>
          <Text style={styles.titleText}>Lời mời kết bạn</Text>
          <Text style={styles.number}>{requestedFriends.total}</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              color: "#0a7bff",
              marginRight: 10,
              fontSize: 16,
            }}
          >
            Sắp xếp
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={requestedFriends.requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
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
    flex: 1,
    backgroundColor: "#fff",
  },
  requestWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
