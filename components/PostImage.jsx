import { View, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import ScaleImage from "./ScaleImage";
import { SCREEN_WIDTH } from "../constants";
import { navigation } from "../rootNavigation";
import { useState } from "react";
import VectorIcon from "../utils/VectorIcon";
import { getTimeFromCreatePost } from "../utils/helper";

const PostImage = ({ images, postData }) => {
  let imageWidth =
    images.length === 1
      ? SCREEN_WIDTH
      : images.length === 2
      ? SCREEN_WIDTH / 2 - 2
      : images.length === 3
      ? SCREEN_WIDTH / 2 - 2
      : SCREEN_WIDTH / 2 - 2;

  let imageHeight =
    images.length === 1 ? null : images.length === 4 ? 200 : 400;

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showFullParagraph, setShowFullParagraph] = useState(false);
  const { author, created, described } = postData;

  const paragraph = described;

  const truncatedParagraph = showFullParagraph
    ? paragraph
    : paragraph.slice(0, 100) + (paragraph.length > 100 ? "... " : "");

  const toggleParagraph = () => {
    setShowFullParagraph(!showFullParagraph);
  };

  const handleNavigate = () => {
    if (images.length == 1) setSelectedImageIndex(0);
    else navigation.navigate("PostListViewScreen", { postData: postData });
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  if (images.length === 3)
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          key={images[0].id}
          onPress={handleNavigate}
          activeOpacity={1}
        >
          <ScaleImage
            source={images[0].url}
            width={imageWidth}
            height={imageHeight}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            key={images[1].id}
            onPress={handleNavigate}
            activeOpacity={1}
          >
            <ScaleImage
              source={images[1].url}
              width={imageWidth}
              height={imageHeight / 2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            key={images[2].id}
            onPress={handleNavigate}
            activeOpacity={1}
          >
            <ScaleImage
              source={images[2].url}
              width={imageWidth}
              height={imageHeight / 2}
            />
          </TouchableOpacity>
        </View>
      </View>
    );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 16,
      }}
    >
      {images.map((image) => (
        <TouchableOpacity
          key={image.id}
          onPress={handleNavigate}
          activeOpacity={1}
        >
          <ScaleImage
            source={image.url}
            style={{ marginBottom: 4 }}
            width={imageWidth}
            height={imageHeight}
          />
        </TouchableOpacity>
      ))}
      {images.length === 1 && (
        <Modal visible={selectedImageIndex !== null} transparent={true}>
          <ImageViewer
            imageUrls={images}
            index={selectedImageIndex}
            onCancel={closeImageViewer}
            enableSwipeDown={true}
          />
          <View style={styles.overlay}>
            <Text style={{ color: "#fff", fontSize: 14 }}>
              {author.name || "Username"}
            </Text>
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
            <TouchableOpacity onPress={toggleParagraph} activeOpacity={0.8}>
              <Text style={{ marginBottom: 8, fontSize: 14, color: "#fff" }}>
                {showFullParagraph ? paragraph : truncatedParagraph}
                {paragraph.length > 100 && !showFullParagraph && (
                  <Text style={{ fontSize: 14, color: "#fff" }}>Xem thêm</Text>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 15,
  },
  extraInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PostImage;
