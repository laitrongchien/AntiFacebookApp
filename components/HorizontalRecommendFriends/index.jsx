import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ExTouchableOpacity from "../ExTouchableOpacity";
import HorizontalRecommendItem from "./HorizontalRecommendItem";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";

const HorizontalRecommendFriends = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>
          Những người bạn có thể biết
        </Text>
        <TouchableOpacity style={styles.btnOptions}>
          <VectorIcon
            name="dots-horizontal"
            type="MaterialCommunityIcons"
            size={28}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        decelerationRate={0.5}
        scrollEventThrottle={30}
        showsHorizontalScrollIndicator={false}
        style={styles.recommendsWrapper}
        bounces={false}
        horizontal={true}
      >
        <HorizontalRecommendItem />
        <HorizontalRecommendItem />
        <HorizontalRecommendItem />
        <HorizontalRecommendItem />
      </ScrollView>
      <View>
        <ExTouchableOpacity
          style={styles.btnSeeAll}
          onPress={() => navigation.navigate("Friend")}
        >
          <Text style={{ fontSize: 15, color: "#888" }}>Xem tất cả</Text>
          <VectorIcon
            name="chevron-right"
            type="MaterialCommunityIcons"
            size={28}
            color="#888"
            style={styles.seeAllIcon}
          />
        </ExTouchableOpacity>
      </View>
    </View>
  );
};

export default HorizontalRecommendFriends;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  headerWrapper: {
    paddingLeft: 5,
    position: "relative",
    paddingBottom: 10,
  },
  btnOptions: {
    position: "absolute",
    right: 10,
    top: 0,
  },
  recommendsWrapper: {
    marginBottom: 10,
  },
  btnSeeAll: {
    paddingVertical: 3,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  seeAllIcon: {
    fontWeight: "100",
  },
});
