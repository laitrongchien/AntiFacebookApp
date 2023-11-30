import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LoadingSkeleton from "../Loading/Skeleton";
import VectorIcon from "../../utils/VectorIcon";
import ExTouchableOpacity from "../ExTouchableOpacity";
import Reaction from "../Reaction";
import { useState, memo } from "react";
import BottomModal from "../BottomModal";
import PostOptions from "./PostOption";
import PostImage from "../PostImage";
import { getTimeFromCreatePost } from "../../utils/helper";

const PostItem = ({ postData }) => {
  const [postOptionVisible, setPostOptionVisible] = useState(false);
  const [showFullParagraph, setShowFullParagraph] = useState(false);

  const { name, image, described, created, feel, author } = postData;

  const paragraph = described;

  const truncatedParagraph = showFullParagraph
    ? paragraph
    : paragraph.slice(0, 100) + (paragraph.length > 100 ? "... " : "");

  const toggleParagraph = () => {
    setShowFullParagraph(!showFullParagraph);
  };

  return (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <View style={styles.postHeaderInfo}>
          <Image
            style={styles.avatar}
            source={{
              uri: author.avatar
                ? author.avatar
                : "https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
            }}
          />
          <View style={styles.infoWrapper}>
            <View style={styles.nameWrapper}>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {author.name}
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
        <View style={styles.iconWrapper}>
          <ExTouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => setPostOptionVisible(true)}
          >
            <VectorIcon
              name="dots-horizontal"
              type="MaterialCommunityIcons"
              size={30}
              color="#666"
            />
          </ExTouchableOpacity>
          <ExTouchableOpacity>
            <VectorIcon
              name="close"
              type="MaterialCommunityIcons"
              size={30}
              color="#666"
            />
          </ExTouchableOpacity>
        </View>
      </View>
      <View style={styles.postContent}>
        <TouchableOpacity onPress={toggleParagraph} activeOpacity={0.8}>
          <Text style={styles.paragraph}>
            {showFullParagraph ? paragraph : truncatedParagraph}
            {paragraph.length > 100 && !showFullParagraph && (
              <Text style={{ fontSize: 16, color: "#666" }}>Xem thêm</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
      {image.length !== 0 && <PostImage images={image} />}
      <Reaction />
      <BottomModal
        isVisible={postOptionVisible}
        closeModal={() => setPostOptionVisible(false)}
      >
        <PostOptions />
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    marginTop: 8,
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
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 18,
  },

  paragraph: {
    marginBottom: 8,
    fontSize: 16,
  },
  postContent: {
    paddingHorizontal: 16,
  },
  imageContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default memo(PostItem);
