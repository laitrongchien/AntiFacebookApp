import { Text, StyleSheet, View, Image, ImageBackground } from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import ExTouchableOpacity from "../ExTouchableOpacity";
import { navigation } from "../../rootNavigation";
import { SCREEN_WIDTH } from "../../constants";

const NotificationItem = () => {
  return (
    <View>
      <ExTouchableOpacity style={{ ...styles.container }}>
        <ImageBackground
          imageStyle={{ borderRadius: 64 }}
          style={styles.avatar}
          source={require("../../assets/images/default-img.png")}
        >
          <View style={{ ...styles.notificationIcon }}>
            <VectorIcon
              name="account-multiple"
              type="MaterialCommunityIcons"
              color="#666"
              size={28}
            />
          </View>
        </ImageBackground>
        <View style={styles.contentWrapper}>
          <Text>A vừa tải lên một tin mới, khám phá ngay</Text>
          <Text style={{ color: "#333" }}>26/10</Text>
        </View>
        <ExTouchableOpacity style={styles.btnOptions}>
          <VectorIcon
            name="dots-horizontal"
            type="MaterialCommunityIcons"
            color="#666"
            size={28}
          />
        </ExTouchableOpacity>
      </ExTouchableOpacity>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  avatar: {
    height: 54,
    width: 54,
    position: "relative",
    borderRadius: 54,
    borderColor: "#ddd",
    borderWidth: 0.5,
  },
  contentWrapper: {
    width: SCREEN_WIDTH - 40 - 30 - 64,
    paddingHorizontal: 10,
  },
  mainContent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btnOptions: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  pureTxt: {
    fontSize: 16,
  },
  hightlightTxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
  notificationIcon: {
    position: "absolute",
    bottom: -5,
    right: -5,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
