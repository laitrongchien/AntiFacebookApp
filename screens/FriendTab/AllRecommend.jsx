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
import RecommendFriendItem from "../../components/Friend/RecommendFriendItem";
import { useSelector, useDispatch } from "react-redux";
import {
  getSuggestedFriend,
  getMoreSuggestedFriend,
} from "../../redux/actions/userAction";

const AllRecommend = () => {
  const dispatch = useDispatch();
  const { recommendFriends } = useSelector((state) => state.friend);
  const { loadingSuggestFriends } = useSelector((state) => state.alert);

  const defaultIndex = 0;
  const defaultCount = 20;

  const handleScroll = async (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const flatListHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (contentHeight - scrollY - flatListHeight <= 1000) {
      if (!loadingSuggestFriends) {
        dispatch(getMoreSuggestedFriend(recommendFriends.length, defaultCount));
      }
    }
  };

  useEffect(() => {
    dispatch(getSuggestedFriend(defaultIndex, defaultCount));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <RecommendFriendItem recommendItem={item} />
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
          <Text style={{ marginLeft: 8, fontSize: 18 }}>Gợi ý kết bạn</Text>
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
          <Text style={styles.titleText}>Gợi ý kết bạn</Text>
        </View>
      </View>

      <FlatList
        data={recommendFriends}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={handleScroll}
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

export default AllRecommend;
