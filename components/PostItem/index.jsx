import { Video, ResizeMode } from "expo-av";
import { useState, memo } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import PostOptions from "./PostOption";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";
import { getTimeFromCreatePost } from "../../utils/helper";
import BottomModal from "../BottomModal";
import ExTouchableOpacity from "../ExTouchableOpacity";
import PostImage from "../PostImage";
import Reaction from "../Reaction";

const PostItem = ({ postData }) => {
  const {
    id,
    image,
    described,
    created,
    feel,
    author,
    comment_mark,
    is_felt,
    video,
    disappointed,
    kudos,
  } = postData;
  // console.log(postData);
  const [postOptionVisible, setPostOptionVisible] = useState(false);
  const [showFullParagraph, setShowFullParagraph] = useState(false);
  const auth = useSelector((state) => state.auth);

  const paragraph = described;

  const truncatedParagraph = showFullParagraph
    ? paragraph
    : paragraph.slice(0, 100) + (paragraph.length > 100 ? "... " : "");

  const toggleParagraph = () => {
    setShowFullParagraph(!showFullParagraph);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate("PostDetailScreen", {
            postData,
          })
        }>
        <View style={styles.postHeaderInfo}>
          <TouchableOpacity
            onPress={() => {
              if (auth.id === author.id) navigation.navigate("ProfileScreen");
              else
                navigation.navigate("UserXProfileScreen", {
                  userXId: author.id,
                });
            }}>
            <Image
              style={styles.avatar}
              source={
                author.avatar
                  ? { uri: author.avatar }
                  : require("../../assets/images/default-img.png")
              }
            />
          </TouchableOpacity>
          <View style={styles.infoWrapper}>
            <View style={styles.nameWrapper}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserXProfileScreen", {
                    userXId: author.id,
                  })
                }>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>{author.name || "Username"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.extraInfoWrapper}>
              <Text style={{ color: "#333", fontSize: 12 }}>{getTimeFromCreatePost(created)}</Text>
              <Text style={{ fontSize: 16, marginHorizontal: 5 }}>·</Text>
              <VectorIcon name="earth" type="MaterialCommunityIcons" size={19} color="#666" />
            </View>
          </View>
        </View>
        <View style={styles.iconWrapper}>
          <ExTouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => setPostOptionVisible(true)}>
            <VectorIcon
              name="dots-horizontal"
              type="MaterialCommunityIcons"
              size={30}
              color="#666"
            />
          </ExTouchableOpacity>
          <ExTouchableOpacity>
            <VectorIcon name="close" type="MaterialCommunityIcons" size={30} color="#666" />
          </ExTouchableOpacity>
        </View>
      </TouchableOpacity>
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
      {image.length !== 0 && <PostImage images={image} postData={postData} />}
      {video && (
        <Video
          source={{
            uri: video.url,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.COVER}
          useNativeControls
          style={styles.video}
        />
      )}
      <Reaction
        numFeel={parseInt(kudos) + parseInt(disappointed) || feel}
        numMark={comment_mark}
        isFelt={is_felt}
        postId={id}
      />
      <BottomModal isVisible={postOptionVisible} closeModal={() => setPostOptionVisible(false)}>
        <PostOptions
          authorId={author.id}
          setPostOptionVisible={setPostOptionVisible}
          postId={id}
          postData={postData}
        />
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
  video: {
    width: "100%",
    height: 400,
    backgroundColor: "#000",
  },
});

export default memo(PostItem);
