import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { registerForPushNotificationsAsync } from "../../firebase/notification";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const MenuScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState("");

  const onLogoutPress = async () => {
    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      // Get the current device tokens from the user document
      const currentDeviceTokens = userDocSnapshot.data().deviceTokens || [];
      const index = currentDeviceTokens.indexOf(expoPushToken);

      if (index !== -1) {
        currentDeviceTokens.splice(index, 1);

        await setDoc(userDocRef, { deviceTokens: currentDeviceTokens });
      }
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

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
      <ExTouchableOpacity
        style={styles.userWrapper}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
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
          <Image
            source={require("../../assets/images/video.png")}
            style={styles.iconImage}
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Video</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity
          onPress={() => navigation.navigate("Friend")}
          style={styles.shortcut}
        >
          <Image
            source={require("../../assets/images/friend.png")}
            style={styles.iconImage}
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Bạn bè</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.shortcut}>
          <Image
            source={require("../../assets/images/bookmark.png")}
            style={styles.iconImage}
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Đã lưu</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.shortcut}>
          <Image
            source={require("../../assets/images/memories.png")}
            style={styles.iconImage}
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Kỷ niệm</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.shortcut}>
          <Image
            source={require("../../assets/images/video-game.png")}
            style={styles.iconImage}
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Trò chơi</Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.shortcut}>
          <Image
            source={require("../../assets/images/messenger.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Messenger</Text>
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
        onPress={onLogoutPress}
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
    flexWrap: "wrap",
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
    marginBottom: 16,
  },
  iconImage: {
    width: 28,
    height: 28,
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
