import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  PanResponder,
} from "react-native";
import { useState, useRef } from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import VectorIcon from "../utils/VectorIcon";
import { useRoute } from "@react-navigation/native";
import { getTimeFromCreatePost } from "../utils/helper";
import Reaction from "../components/Reaction";
import ScaleImage from "../components/ScaleImage";
import { SCREEN_WIDTH } from "../constants";

const PostListViewScreen = () => {
  const route = useRoute();
  const { postData } = route.params;
  const { id, image, described, created, author, is_felt, feel, comment_mark } =
    postData;

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  // const modalRef = useRef(null);

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onMoveShouldSetPanResponder: () => true,
  //   onPanResponderMove: (evt, gestureState) => {
  //     if (gestureState.dy > 50) {
  //       closeImageViewer();
  //     }
  //   },
  // });

  return (
    <View style={{ backgroundColor: "rgba(0,0,0,0.1)", height: "100%" }}>
      <ScrollView
        style={styles.item}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.postHeaderInfo}>
            <Image
              style={styles.avatar}
              source={
                author.avatar
                  ? { uri: author.avatar }
                  : equire("../assets/images/default-img.png")
              }
            />
            <View style={styles.infoWrapper}>
              <View style={styles.nameWrapper}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {author.name || "Username"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.extraInfoWrapper}>
                <Text style={{ color: "#333", fontSize: 12 }}>
                  {getTimeFromCreatePost(created)}
                </Text>
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
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.postContent}>
            <Text style={styles.paragraph}>{described}</Text>
          </View>
          <Reaction
            numFeel={feel}
            numMark={comment_mark}
            isFelt={is_felt}
            postId={id}
          />
        </View>
        {image.map((item, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={item.id}
            onPress={() => openImageViewer(index)}
          >
            <ScaleImage
              key={item.id}
              source={item.url}
              width={SCREEN_WIDTH}
              style={{ marginTop: 12 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal visible={selectedImageIndex !== null} transparent={true}>
        <ImageViewer
          imageUrls={image}
          index={selectedImageIndex}
          onCancel={closeImageViewer}
          enableSwipeDown={true}
          saveToLocalByLongPress={false}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{author.name || "Username"}</Text>
          <View style={styles.extraInfoWrapper}>
            <Text style={{ color: "#fff", fontSize: 12 }}>
              {getTimeFromCreatePost(created)}
            </Text>
            <Text style={{ fontSize: 16, marginHorizontal: 5 }}>·</Text>
            <VectorIcon
              name="earth"
              type="MaterialCommunityIcons"
              size={19}
              color="#fff"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
  },
  postHeaderInfo: {
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

  paragraph: {
    marginBottom: 8,
    fontSize: 16,
  },
  postContent: {
    paddingHorizontal: 16,
    marginTop: 12,
  },

  btnOption: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    flex: 1,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "16%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 15,
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PostListViewScreen;
