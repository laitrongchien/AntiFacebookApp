import { View, Text, StyleSheet, ScrollView } from "react-native";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";
import AddFriendRequest from "../../components/Friend/AddFriendRequest";
import RecommendFriend from "../../components/Friend/RecommendFriend";
import { useDispatch, useSelector } from "react-redux";
import { getRequestedFriend } from "../../redux/actions/userAction";
import { getSuggestedFriend } from "../../redux/actions/userAction";
import { useEffect } from "react";

const FriendScreen = () => {
  const dispatch = useDispatch();
  const { requestedFriends, recommendFriends } = useSelector(
    (state) => state.friend
  );
  const defaultIndex = 0;
  const defaultCount = 10;

  useEffect(() => {
    dispatch(getRequestedFriend(defaultIndex, defaultCount));
    dispatch(getSuggestedFriend(defaultIndex, defaultCount));
  }, []);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
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
});

export default FriendScreen;
