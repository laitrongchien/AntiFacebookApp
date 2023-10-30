import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";

const MenuScreen = () => {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.iconWrap}>
          <ExTouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={{ ...styles.btnSearch, marginRight: 8 }}
          >
            <VectorIcon
              name="search"
              type="FontAwesome5"
              size={19}
              color="#000"
            />
          </ExTouchableOpacity>
          <ExTouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={styles.btnSearch}
          >
            <VectorIcon name="cog" type="FontAwesome5" size={19} color="#000" />
          </ExTouchableOpacity>
        </View>
      </View>
      <ExTouchableOpacity style={styles.userWrapper}>
        <Image
          source={require("../../assets/images/default-img.png")}
          style={styles.userAvatar}
        />
        <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 12 }}>
          Lại Chiến
        </Text>
      </ExTouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 10,
          marginHorizontal: 20,
        }}
      >
        Tất cả lối tắt
      </Text>
      <View style={styles.allShortcut}>
        <ExTouchableOpacity
          onPress={() => navigation.navigate("Watch")}
          style={styles.shortcut}
        >
          <VectorIcon
            name="youtube-tv"
            type="MaterialCommunityIcons"
            size={24}
            color="#666"
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Video</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity
          onPress={() => navigation.navigate("Friend")}
          style={styles.shortcut}
        >
          <VectorIcon
            name="account-multiple"
            type="MaterialCommunityIcons"
            size={24}
            color="#666"
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Bạn bè</Text>
        </ExTouchableOpacity>
      </View>
      <ExTouchableOpacity style={styles.btnOption}>
        <VectorIcon
          name="help-circle"
          type="MaterialCommunityIcons"
          size={24}
          color="#666"
        />
        <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 8 }}>
          Trợ giúp & Hỗ trợ
        </Text>
      </ExTouchableOpacity>
      <ExTouchableOpacity style={styles.btnOption}>
        <VectorIcon
          name="cog"
          type="MaterialCommunityIcons"
          size={24}
          color="#666"
        />
        <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 8 }}>
          Cài đặt thông báo đẩy
        </Text>
      </ExTouchableOpacity>
      <ExTouchableOpacity
        style={{
          ...styles.userWrapper,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 16 }}>Đăng xuất</Text>
      </ExTouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.001)",
    width: "100%",
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

export default MenuScreen;
