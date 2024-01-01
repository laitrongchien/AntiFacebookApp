import { useRoute } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Comment from "../components/Comment";
import LoadingCommentSkeleton from "../components/Loading/LoadingCommentSkeleton";
import PostImage from "../components/PostImage";
import { SCREEN_WIDTH } from "../constants";
import { getComments, createMark, createCommentMark } from "../redux/actions/commentAction";
import { feelPost, deleteFeel } from "../redux/actions/postAction";
import { navigation } from "../rootNavigation";
import VectorIcon from "../utils/VectorIcon";
import { getTimeFromCreatePost } from "../utils/helper";

const PostDetailScreen = () => {
  const route = useRoute();
  const { postData } = route.params;
  const { image, described, created, author, feel, is_felt, kudos, disappointed, video } = postData;
  const dispatch = useDispatch();
  const [loadingComments, setLoadingComments] = useState(false);
  const [content, setContent] = useState("");
  const [markId, setMarkId] = useState();
  const [isReact, setIsReact] = useState(is_felt);
  const [numReact, setNumReact] = useState(
    parseInt(feel, 10) || parseInt(kudos, 10) + parseInt(disappointed, 10),
  );
  const [reactionBarVisible, setReactionBarVisible] = useState(false);
  const comments = useSelector((state) => state.comments);
  const defaultIndex = 0;
  const defaultCount = 10;
  const defaultMarkType = 1;

  const commentInputRef = useRef(null);

  const createComment = () => {
    if (markId) {
      // console.log(markId);
      dispatch(createCommentMark(postData.id, content, defaultIndex, defaultCount, markId));
    } else {
      dispatch(createMark(postData.id, content, defaultIndex, defaultCount, defaultMarkType));
    }
    setContent("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    const getPostComments = async () => {
      setLoadingComments(true);
      await dispatch(getComments(postData.id, defaultIndex, defaultCount));
      setLoadingComments(false);
    };
    getPostComments();
  }, [postData.id]);

  const handleClickLike = async () => {
    if (isReact == 1 || isReact == 0) {
      setIsReact(-1);

      setNumReact(numReact - 1);
      dispatch(deleteFeel(postData.id));
    }

    if (isReact == -1) {
      setIsReact(1);
      setNumReact(numReact + 1);
      // playLikeSound();
      dispatch(feelPost(postData.id, "1"));
    }
  };

  const handleClickLikeBar = async () => {
    setReactionBarVisible(false);
    if (isReact == -1) setNumReact(numReact + 1);
    if (isReact == 0 || isReact == -1) {
      setIsReact(1);
      dispatch(feelPost(postData.id, "1"));
    }
  };

  const handleClickSadBar = async () => {
    setReactionBarVisible(false);
    if (isReact == -1) setNumReact(numReact + 1);
    if (isReact == 1 || isReact == -1) {
      setIsReact(0);
      dispatch(feelPost(postData.id, "0"));
    }
  };

  const openReactionBar = () => {
    setReactionBarVisible(true);
  };

  return (
    <View style={{ position: "relative", backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon name="arrow-left" type="MaterialCommunityIcons" color="#000" size={32} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{author?.name || "Username"}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <VectorIcon name="magnify" type="MaterialCommunityIcons" color="#000" size={32} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.item} bounces={false} showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}>
            <View style={styles.postHeaderInfo}>
              <Image
                style={styles.avatar}
                source={
                  author?.avatar
                    ? { uri: author?.avatar }
                    : require("../assets/images/default-img.png")
                }
              />
              <View style={styles.infoWrapper}>
                <View style={styles.nameWrapper}>
                  <TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      {author?.name || "Username"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.extraInfoWrapper}>
                  <Text style={{ color: "#333", fontSize: 12 }}>
                    {getTimeFromCreatePost(created)}
                  </Text>
                  <Text style={{ fontSize: 16, marginHorizontal: 5 }}>·</Text>
                  <VectorIcon name="earth" type="MaterialCommunityIcons" size={19} color="#666" />
                </View>
              </View>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <VectorIcon
                  name="dots-horizontal"
                  type="MaterialCommunityIcons"
                  size={30}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.postContent}>
            <Text style={styles.paragraph}>{described}</Text>
          </View>
          {image?.length !== 0 && <PostImage images={image} postData={postData} />}
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
        </View>
        <View style={styles.reactHandle}>
          {reactionBarVisible && (
            <View style={styles.reactionToolBar}>
              <TouchableOpacity onPress={handleClickLikeBar}>
                <Image
                  source={require("../assets/icons/like_icon.png")}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClickSadBar}>
                <Image
                  source={require("../assets/icons/sad.png")}
                  style={{ width: 36, height: 36 }}
                />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={styles.btnOption}
            onPress={handleClickLike}
            onLongPress={openReactionBar}>
            <VectorIcon
              name={isReact == 1 ? "thumb-up" : isReact == 0 ? "emoticon-sad" : "thumb-up-outline"}
              type="MaterialCommunityIcons"
              color={isReact == 1 ? "#1877f2" : isReact == 0 ? "#ebcc34" : "#666"}
              size={22}
            />
            <Text
              style={{
                color: isReact == 1 ? "#1877f2" : isReact == 0 ? "#ebcc34" : "#666",
                marginLeft: 4,
              }}>
              {isReact == 0 ? "Thất vọng" : "Thích"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}>
            <VectorIcon name="chat-outline" type="MaterialCommunityIcons" color="#666" size={22} />
            <Text style={{ color: "#666", marginLeft: 4 }}>Bình luận</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            marginBottom: 12,
          }}
          onPress={() => navigation.navigate("AllFeel", { postId: postData.id, numReact })}>
          <Image
            source={require("../assets/icons/like_icon.png")}
            style={{ width: 20, height: 20 }}
          />
          <Image
            source={require("../assets/icons/sad.png")}
            style={{
              width: 18,
              height: 18,
              marginRight: 4,
              marginLeft: -4,
            }}
          />
          <Text style={{ color: "#666" }}>
            {numReact !== undefined ? numReact : parseInt(kudos) + parseInt(disappointed)}
          </Text>
        </TouchableOpacity>
        {!loadingComments ? (
          comments?.length !== 0 ? (
            <View style={{ paddingHorizontal: 10 }}>
              {comments.map((item) => {
                return (
                  <Comment
                    item={item}
                    key={item.id}
                    commentInputRef={commentInputRef}
                    setMarkId={setMarkId}
                  />
                );
              })}
            </View>
          ) : (
            <View
              style={{
                height: 300,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text style={{ fontSize: 18, color: "#333" }}>Chưa có bình luận nào</Text>
              <Text style={{ fontSize: 16, color: "#333" }}>Hãy là người đầu tiên bình luận</Text>
            </View>
          )
        ) : (
          <>
            <LoadingCommentSkeleton />
            <LoadingCommentSkeleton />
          </>
        )}
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          ref={commentInputRef}
          style={styles.commentInput}
          placeholder="Nhập bình luận..."
          placeholderTextColor="#333"
          selectionColor="#333"
          underlineColorAndroid="transparent"
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <TouchableOpacity onPress={createComment}>
          <VectorIcon name="send" type="MaterialCommunityIcons" color="#666" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,

    zIndex: 2,
  },
  item: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    marginTop: 50,
    marginBottom: 68,
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
  reactHandle: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    position: "relative",
  },
  btnOption: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    flex: 1,
  },
  commentInputContainer: {
    padding: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  commentInput: {
    height: 44,
    borderRadius: 30,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
    width: SCREEN_WIDTH * 0.84,
    marginRight: 4,
  },
  reactionToolBar: {
    position: "absolute",
    top: -50,
    left: 60,
    zIndex: 10,
    width: 90,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 6,
  },
  video: {
    width: "100%",
    height: 400,
    backgroundColor: "#000",
  },
});

export default PostDetailScreen;
