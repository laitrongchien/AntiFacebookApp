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
import { getUserXFriends } from "../../redux/actions/userAction";
import { useRoute } from "@react-navigation/native";

const AllXFriend = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { userXId } = route.params;
  const { friends, total } = useSelector((state) => state.userXFriend);
  const [loadingFriends, setLoadingFriends] = useState();

  const defaultIndex = 0;
  const defaultCount = 20;

  useEffect(() => {
    console.log("mount friends");
    const handleGetFriendList = async () => {
      setLoadingFriends(true);
      await dispatch(getUserXFriends(userXId, defaultIndex, defaultCount));

      setLoadingFriends(false);
    };
    handleGetFriendList();
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserXProfileScreen", { userXId: item.id })
              }
            >
              <Text style={{ fontSize: 18, fontWeight: 500 }}>
                {item.username}
              </Text>
            </TouchableOpacity>
            {item.same_friends != 0 && (
              <Text style={{ fontSize: 16, color: "#666" }}>
                {item.same_friends} bạn chung
              </Text>
            )}
          </View>
        </View>
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
      {!loadingFriends && (
        <>
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
            data={friends}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </>
      )}
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
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
});

export default AllXFriend;
