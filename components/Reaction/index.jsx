import { Audio } from "expo-av";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../constants";
import { getComments, createMark, createCommentMark } from "../../redux/actions/commentAction";
import { feelPost, deleteFeel } from "../../redux/actions/postAction";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";
import BottomModal from "../BottomModal";
import Comment from "../Comment";
import ExTouchableOpacity from "../ExTouchableOpacity";
import LoadingCommentSkeleton from "../Loading/LoadingCommentSkeleton";

const Reaction = ({ isDark, numFeel, numMark, isFelt, postId }) => {
  const [commentVisible, setCommentVisible] = useState(false);
  const [content, setContent] = useState("");
  const [markId, setMarkId] = useState();
  const [reactionBarVisible, setReactionBarVisible] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isReact, setIsReact] = useState();
  const [numReact, setNumReact] = useState();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const defaultIndex = 0;
  const defaultCount = 10;
  const defaultMarkType = 1;

  const commentInputRef = useRef(null);

  const openComment = async () => {
    setCommentVisible(true);
    setLoadingComments(true);
    await dispatch(getComments(postId, defaultIndex, defaultCount));
    setLoadingComments(false);
  };

  const closeComment = () => {
    setCommentVisible(false);
  };

  const createComment = () => {
    if (markId) {
      // console.log(markId);
      dispatch(createCommentMark(postId, content, defaultIndex, defaultCount, markId));
    } else {
      dispatch(createMark(postId, content, defaultIndex, defaultCount, defaultMarkType));
    }
    setContent("");
    Keyboard.dismiss();
  };

  const openReactionBar = () => {
    setReactionBarVisible(true);
  };

  const renderItem = ({ item }) => (
    <Comment item={item} commentInputRef={commentInputRef} setMarkId={setMarkId} />
  );

  useEffect(() => {
    setIsReact(isFelt);
  }, [isFelt]);

  useEffect(() => {
    setNumReact(parseInt(numFeel, 10));
  }, [numFeel]);

  // useEffect(() => {
  //   Audio.Sound.createAsync(require("../../assets/sounds/like_sound.mp3"), {
  //     shouldPlay: false,
  //   });
  // }, []);

  // const playLikeSound = async () => {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("../../assets/sounds/like_sound.mp3"),
  //     { shouldPlay: true }
  //   );
  // };

  const handleClickLike = async () => {
    if (isReact == 1 || isReact == 0) {
      setIsReact(-1);

      setNumReact(numReact - 1);
      dispatch(deleteFeel(postId));
    }

    if (isReact == -1) {
      setIsReact(1);
      setNumReact(numReact + 1);
      // playLikeSound();
      dispatch(feelPost(postId, "1"));
    }
  };

  const handleClickLikeBar = async () => {
    setReactionBarVisible(false);
    if (isReact == -1) setNumReact(numReact + 1);
    if (isReact == 0 || isReact == -1) {
      setIsReact(1);
      dispatch(feelPost(postId, "1"));
    }
  };

  const handleClickSadBar = async () => {
    setReactionBarVisible(false);
    if (isReact == -1) setNumReact(numReact + 1);
    if (isReact == 1 || isReact == -1) {
      setIsReact(0);
      dispatch(feelPost(postId, "0"));
    }
  };

  return (
    <View>
      <ExTouchableOpacity style={styles.reactStatis} onPress={openComment}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/icons/like_icon.png")}
            style={{ width: 20, height: 20 }}
          />
          <Image
            source={require("../../assets/icons/sad.png")}
            style={{ width: 18, height: 18, marginRight: 4, marginLeft: -4 }}
          />
          <Text style={{ color: isDark ? "#fff" : "#666" }}>{numReact || 0}</Text>
        </View>
        <Text style={{ color: isDark ? "#fff" : "#666" }}>
          {numMark && numMark != 0 ? `${numMark} bình luận` : "Chưa có bình luận"}
        </Text>
      </ExTouchableOpacity>

      <View style={styles.reactHandle}>
        {reactionBarVisible && (
          <View style={styles.reactionToolBar}>
            <ExTouchableOpacity onPress={handleClickLikeBar}>
              <Image
                source={require("../../assets/icons/like_icon.png")}
                style={{ width: 40, height: 40 }}
              />
            </ExTouchableOpacity>
            <ExTouchableOpacity onPress={handleClickSadBar}>
              <Image
                source={require("../../assets/icons/sad.png")}
                style={{ width: 36, height: 36 }}
              />
            </ExTouchableOpacity>
          </View>
        )}
        <ExTouchableOpacity
          style={styles.btnOption}
          onPress={handleClickLike}
          onLongPress={openReactionBar}>
          <VectorIcon
            name={isReact == 1 ? "thumb-up" : isReact == 0 ? "emoticon-sad" : "thumb-up-outline"}
            type="MaterialCommunityIcons"
            color={isReact == 1 ? "#1877f2" : isReact == 0 ? "#ebcc34" : isDark ? "#fff" : "#666"}
            size={22}
          />
          <Text
            style={{
              color: isReact == 1 ? "#1877f2" : isReact == 0 ? "#ebcc34" : isDark ? "#fff" : "#666",
              marginLeft: 4,
            }}>
            {isReact == 0 ? "Thất vọng" : "Thích"}
          </Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.btnOption} onPress={openComment}>
          <VectorIcon
            name="chat-outline"
            type="MaterialCommunityIcons"
            color={isDark ? "#fff" : "#666"}
            size={22}
          />
          <Text style={{ color: isDark ? "#fff" : "#666", marginLeft: 4 }}>Bình luận</Text>
        </ExTouchableOpacity>
      </View>
      <BottomModal isVisible={commentVisible} closeModal={closeComment}>
        <KeyboardAvoidingView behavior="height">
          <View style={styles.reactBar}>
            <ExTouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                setCommentVisible(false);
                navigation.navigate("AllFeel", {
                  postId,
                  numReact,
                });
              }}>
              <Image
                source={require("../../assets/icons/like_icon.png")}
                style={{ width: 20, height: 20 }}
              />
              <Image
                source={require("../../assets/icons/sad.png")}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 4,
                  marginLeft: -4,
                }}
              />
              <Text style={{ color: isDark ? "#fff" : "#666" }}>{numReact}</Text>
              <VectorIcon
                name="chevron-right"
                type="MaterialCommunityIcons"
                color="#666"
                size={30}
              />
            </ExTouchableOpacity>
          </View>
          {!loadingComments ? (
            comments.length != 0 ? (
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 24,
                  backgroundColor: "#fff",
                  height: SCREEN_HEIGHT - 100,
                }}
              />
            ) : (
              <View
                style={{
                  height: SCREEN_HEIGHT - 100,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                }}>
                <Text style={{ fontSize: 18, color: "#333" }}>Chưa có bình luận nào</Text>
                <Text style={{ fontSize: 16, color: "#333" }}>Hãy là người đầu tiên bình luận</Text>
              </View>
            )
          ) : (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 24,
                backgroundColor: "#fff",
                height: SCREEN_HEIGHT - 100,
              }}>
              <LoadingCommentSkeleton />
              <LoadingCommentSkeleton />
            </View>
          )}

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
            <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
              <ExTouchableOpacity onPress={createComment}>
                <VectorIcon name="send" type="MaterialCommunityIcons" color="#666" size={28} />
              </ExTouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  reactStatis: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  reactHandle: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
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
    width: SCREEN_WIDTH,
    position: "absolute",
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
  reactBar: {
    paddingHorizontal: 12,
    width: SCREEN_WIDTH,
    height: 50,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
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
});

export default Reaction;
