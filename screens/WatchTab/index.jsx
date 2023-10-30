import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import WatchList from "../../components/Watch";

const WatchScreen = () => {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Video</Text>
        <View style={styles.iconWrap}>
          <ExTouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={{ ...styles.btnSearch, marginRight: 8 }}
          >
            <VectorIcon
              name="user-alt"
              type="FontAwesome5"
              size={19}
              color="#000"
            />
          </ExTouchableOpacity>
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
      <WatchList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  iconWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userWrapper: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 12,
  },
  allShortcut: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
  },
  shortcut: {
    backgroundColor: "#fff",
    height: 80,
    paddingHorizontal: 15,
    flexBasis: "48%",
    justifyContent: "center",
    borderRadius: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  btnOption: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
});

export default WatchScreen;
