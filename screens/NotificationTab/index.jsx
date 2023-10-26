import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import NotificationList from "../../components/NotificationList";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";

const NotificationScreen = () => {
  const onNavigateSearch = () => {
    navigation.navigate("Search");
  };
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Thông báo</Text>
        <ExTouchableOpacity onPress={onNavigateSearch} style={styles.btnSearch}>
          <VectorIcon
            name="search"
            type="FontAwesome5"
            size={19}
            color="#3A3A3A"
          />
        </ExTouchableOpacity>
      </View>
      <Text style={styles.notiTitle}>Mới</Text>
      <NotificationList />
      <Text style={styles.notiTitle}>Trước đó</Text>
      <NotificationList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
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
  notiTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
    marginHorizontal: 20,
  },
});

export default NotificationScreen;
