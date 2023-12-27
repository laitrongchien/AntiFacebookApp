import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";
import AddFriendRequest from "../../components/Friend/AddFriendRequest";
import RecommendFriend from "../../components/Friend/RecommendFriend";
import { useDispatch, useSelector } from "react-redux";
import { getRequestedFriend } from "../../redux/actions/userAction";
import { getSuggestedFriend } from "../../redux/actions/userAction";
import { useEffect, useState } from "react";
import { checkNewFriendItems } from "../../redux/actions/notification";

const FriendScreen = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { requestedFriends, recommendFriends } = useSelector(
    (state) => state.friend
  );
  const defaultIndex = 0;
  const defaultCount = 20;

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getRequestedFriend(defaultIndex, defaultCount));
    await dispatch(getSuggestedFriend(defaultIndex, defaultCount));
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(checkNewFriendItems(0, 1));
  }, []);

  useEffect(() => {
    dispatch(getRequestedFriend(defaultIndex, defaultCount));
    dispatch(getSuggestedFriend(defaultIndex, defaultCount));
  }, []);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#1877f2"]}
        />
      }
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Bạn bè</Text>
        <View style={styles.iconWrap}>
          <ExTouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={styles.btnSearch}
          >
            <VectorIcon
              name="search"
              type="FontAwesome5"
              size={19}
              color="#000"
            />
          </ExTouchableOpacity>
        </View>
      </View>
      <View style={styles.navigateBtnWrap}>
        <ExTouchableOpacity style={styles.navigateBtn}>
          <Text
            style={{ fontSize: 16, fontWeight: "500" }}
            onPress={() => navigation.navigate("AllRecommend")}
          >
            Gợi ý
          </Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity
          style={{ ...styles.navigateBtn, marginLeft: 8 }}
          onPress={() => navigation.navigate("AllFriend")}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Bạn bè</Text>
        </ExTouchableOpacity>
      </View>
      <AddFriendRequest requestedFriends={requestedFriends} />
      <RecommendFriend recommendFriends={recommendFriends} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBlockColor: "#ddd",
  },
  iconWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnSearch: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  navigateBtn: {
    width: 80,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dedede",
  },
  navigateBtnWrap: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 12,
  },
});

export default FriendScreen;
