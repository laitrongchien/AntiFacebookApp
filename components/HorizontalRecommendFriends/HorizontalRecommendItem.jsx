import { Text, StyleSheet, View, Image, Animated } from "react-native";
import ExTouchableOpacity from "../ExTouchableOpacity";
import { SCREEN_WIDTH } from "../../constants";
import VectorIcon from "../../utils/VectorIcon";

const HorizontalRecommendItem = () => {
  return (
    <Animated.View style={{ ...styles.container }}>
      <View style={styles.itemWrapper}>
        <ExTouchableOpacity activeOpacity={0.5}>
          <Image
            style={styles.avatar}
            source={require("../../assets/images/default-img.png")}
          ></Image>
        </ExTouchableOpacity>
        <View>
          <View style={styles.infoWrapper}>
            <ExTouchableOpacity activeOpacity={0.5}>
              <Text style={styles.name}>Cristiano Ronaldo</Text>
            </ExTouchableOpacity>
            <Text style={styles.mutualCount}>2 bạn chung</Text>
          </View>
          <View style={styles.btnWrapper}>
            <ExTouchableOpacity style={styles.btnAddFr}>
              <VectorIcon
                name="user-plus"
                type="FontAwesome5"
                size={22}
                color="#fff"
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#fff",
                  marginLeft: 4,
                }}
              >
                Thêm bạn bè
              </Text>
            </ExTouchableOpacity>
            <ExTouchableOpacity style={styles.btnHide}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>Gỡ</Text>
            </ExTouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default HorizontalRecommendItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  itemWrapper: {
    borderRadius: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    overflow: "hidden",
    width: SCREEN_WIDTH * 0.66,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  avatar: {
    width: SCREEN_WIDTH * 0.66,
    height: 280,
  },
  infoWrapper: {
    paddingVertical: 10,
    paddingLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  mutualCount: {
    fontSize: 16,
    color: "#333",
  },
  btnAddFr: {
    flex: 3,
    backgroundColor: "#1877f2",
    height: 38,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  btnHide: {
    flex: 1,
    height: 38,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginLeft: 10,
  },
});
