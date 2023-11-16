import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import DarkBackGroundVideos from "../../components/Watch/DarkBackgroundVideos";

const WatchDetailList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            name="arrow-left"
            type="MaterialCommunityIcons"
            color="#fff"
            size={32}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
          Video khác
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <VectorIcon
            name="magnify"
            type="MaterialCommunityIcons"
            color="#fff"
            size={32}
          />
        </TouchableOpacity>
      </View>
      <DarkBackGroundVideos />
    </View>
  );
};

export default WatchDetailList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "relative",
  },
  navigationBar: {
    backgroundColor: "#424345",
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
});
