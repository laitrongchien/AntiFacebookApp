import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { useSelector, useDispatch } from "react-redux";
import { getUserFriends } from "../../redux/actions/userAction";

const AllFriend = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { friends, total } = useSelector((state) => state.userFriend);
  const [friendList, setFriendList] = useState([]);

  const defaultIndex = 0;
  const defaultCount = 20;

  useEffect(() => {
    dispatch(getUserFriends(id, defaultIndex, defaultCount));
    setFriendList(friends);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.friendWrapper}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={
              item.avatar
                ? { uri: item.avatar }
                : require("../../assets/images/default-img.png")
            }
            style={styles.avatar}
          />
          <View style={{ marginLeft: 16 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>
                {item.username}
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: "#666" }}>
              {item.same_friends} bạn chung
            </Text>
          </View>
        </View>
        <VectorIcon
          name="dots-horizontal"
          type="MaterialCommunityIcons"
          color="#666"
          size={32}
        />
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
          <Text style={{ marginLeft: 8, fontSize: 18 }}>Bạn bè</Text>
        </View>
        <VectorIcon
          name="magnify"
          type="MaterialCommunityIcons"
          color="#000"
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
        <Text style={styles.titleText}>{total} người bạn</Text>
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
        data={friendList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // style={styles.friendRequestItem}
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
    backgroundColor: "white",
    height: "100%",
  },

  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
  friendWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
});

export default AllFriend;
