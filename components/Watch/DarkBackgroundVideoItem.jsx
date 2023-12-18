import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import { SCREEN_WIDTH } from "../../constants";
import Reaction from "../Reaction";
import BottomModal from "../BottomModal";
import WatchOptions from "./WatchOption";
import { getTimeFromCreatePost } from "../../utils/helper";
import { Video, ResizeMode } from "expo-av";

const DarkBackgroundVideoItem = ({ watchData }) => {
  const [watchOptionVisible, setWatchOptionVisible] = useState(false);
  const { id, video, described, created, feel, author, comment_mark, is_felt } =
    watchData;
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.watchHeaderInfo}>
          <Image
            style={styles.avatar}
            source={
              author.avatar
                ? { uri: author.avatar }
                : require("../../assets/images/default-img.png")
            }
          />
          <View style={styles.infoWrapper}>
            <View style={styles.nameWrapper}>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}
                >
                  {author.name || "Username"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.extraInfoWrapper}>
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {getTimeFromCreatePost(created)}
              </Text>
              <Text
                style={{ fontSize: 16, marginHorizontal: 5, color: "#fff" }}
              >
                ·
              </Text>
              <VectorIcon
                name="earth"
                type="MaterialCommunityIcons"
                size={19}
                color="#fff"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ width: 25, alignItems: "center" }}
          onPress={() => setWatchOptionVisible(true)}
        >
          <VectorIcon
            name="dots-horizontal"
            type="MaterialCommunityIcons"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.watchContent}>
        <Text style={styles.paragraph}>{described}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.videoContainer}>
          <Video
            source={{
              uri: video.url,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.COVER}
            useNativeControls={true}
            style={styles.video}
          />
        </View>
      </TouchableOpacity>
      <Reaction
        isDark={true}
        numFeel={feel}
        numMark={comment_mark}
        isFelt={is_felt}
        postId={id}
      />
      <BottomModal
        isVisible={watchOptionVisible}
        closeModal={() => setWatchOptionVisible(false)}
      >
        <WatchOptions />
      </BottomModal>
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
    backgroundColor: "#5a5a5c",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    marginBottom: 6,
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 16,
    color: "#fff",
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
  video: {
    width: "100%",
    height: 300,
    backgroundColor: "#000",
  },
});

export default DarkBackgroundVideoItem;
