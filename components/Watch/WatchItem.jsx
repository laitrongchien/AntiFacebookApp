import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import { SCREEN_WIDTH } from "../../constants";
import VideoControl from "./Video";

const WatchItem = () => {
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.watchHeaderInfo}>
          <Image
            style={styles.avatar}
            source={require("../../assets/images/default-img.png")}
          />
          <View style={styles.infoWrapper}>
            <View style={styles.nameWrapper}>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  GTV Plus
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.extraInfoWrapper}>
              <Text style={{ color: "#333", fontSize: 12 }}>28 Th7</Text>
              <Text style={{ fontSize: 16, marginHorizontal: 5 }}>·</Text>
              <VectorIcon
                name="earth"
                type="MaterialCommunityIcons"
                size={19}
                color="#666"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ width: 25, alignItems: "center" }}>
          <VectorIcon
            name="dots-horizontal"
            type="MaterialCommunityIcons"
            size={30}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.watchContent}>
        <Text style={styles.paragraph}>Tham gia minigame ngay</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.videoContainer}>
          <VideoControl />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  watchHeaderInfo: {
    padding: 16,
    width: SCREEN_WIDTH - 40,
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  infoWrapper: {
    marginLeft: 8,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  extraInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 16,
  },
  watchContent: {
    paddingHorizontal: 16,
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    marginTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WatchItem;
