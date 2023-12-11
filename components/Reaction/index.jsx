import { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { Audio } from "expo-av";
import ExTouchableOpacity from "../ExTouchableOpacity";
import VectorIcon from "../../utils/VectorIcon";
import BottomModal from "../BottomModal";
import Comment from "../Comment";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../constants";
import { getComments } from "../../redux/actions/commentAction";
import { useSelector, useDispatch } from "react-redux";
import LoadingCommentSkeleton from "../Loading/LoadingCommentSkeleton";

const Reaction = ({ isDark, numFeel, numMark, isFelt, postId }) => {
  const [commentVisible, setCommentVisible] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isReact, setIsReact] = useState(isFelt);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const defaultIndex = 0;
  const defaultCount = 10;

  const openComment = async () => {
    setCommentVisible(true);
    setLoadingComments(true);
    await dispatch(getComments(postId, defaultIndex, defaultCount));
    setLoadingComments(false);
  };

  const closeComment = () => {
    setCommentVisible(false);
  };

  const renderItem = ({ item }) => <Comment item={item} />;

  useEffect(() => {
    Audio.Sound.createAsync(require("../../assets/sounds/like_sound.mp3"), {
      shouldPlay: false,
    });
  }, []);

  const playLikeSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/like_sound.mp3"),
      { shouldPlay: true }
    );
  };

  const handleLikeButtonClick = async () => {
    if (isReact == 1) setIsReact(-1);
    if (isReact === -1) {
      setIsReact(1);
      playLikeSound();
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
          <Text style={{ color: isDark ? "#fff" : "#666" }}>
            {numFeel || 0}
          </Text>
        </View>
        <Text style={{ color: isDark ? "#fff" : "#666" }}>
          {numMark && numMark != 0
            ? `${numMark} bình luận`
            : "Chưa có bình luận"}
        </Text>
      </ExTouchableOpacity>
      <View style={styles.reactHandle}>
        <ExTouchableOpacity
          style={styles.btnOption}
          onPress={handleLikeButtonClick}
          onLongPress={() => console.log("press")}
        >
          <VectorIcon
            name={isReact == 1 ? "thumb-up" : "thumb-up-outline"}
            type="MaterialCommunityIcons"
            color={isReact == 1 ? "#1877f2" : isDark ? "#fff" : "#666"}
            size={22}
          />
          <Text
            style={{
              color: isReact == 1 ? "#1877f2" : isDark ? "#fff" : "#666",
              marginLeft: 4,
            }}
          >
            Thích
          </Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.btnOption} onPress={openComment}>
          <VectorIcon
            name="chat-outline"
            type="MaterialCommunityIcons"
            color={isDark ? "#fff" : "#666"}
            size={22}
          />
          <Text style={{ color: isDark ? "#fff" : "#666", marginLeft: 4 }}>
            Bình luận
          </Text>
        </ExTouchableOpacity>
      </View>
      <BottomModal isVisible={commentVisible} closeModal={closeComment}>
        <KeyboardAvoidingView behavior="height">
          <View style={styles.reactBar}>
            <ExTouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
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
              <Text style={{ color: isDark ? "#fff" : "#666" }}>{numFeel}</Text>
              <VectorIcon
                name="chevron-right"
                type="MaterialCommunityIcons"
                color="#666"
                size={30}
              />
            </ExTouchableOpacity>
          </View>
          {/* <ScrollView
            bounces={true}
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 24,
              backgroundColor: "#fff",
              height: SCREEN_HEIGHT - 50 - 50,
            }}
          >
            <Comment />
            <Comment />
            <Comment />
          </ScrollView> */}
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
                }}
              >
                <Text style={{ fontSize: 18, color: "#333" }}>
                  Chưa có bình luận nào
                </Text>
                <Text style={{ fontSize: 16, color: "#333" }}>
                  Hãy là người đầu tiên bình luận
                </Text>
              </View>
            )
          ) : (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 24,
                backgroundColor: "#fff",
                height: SCREEN_HEIGHT - 100,
              }}
            >
              <LoadingCommentSkeleton />
              <LoadingCommentSkeleton />
            </View>
          )}

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Nhập bình luận..."
              placeholderTextColor="#333"
              selectionColor="#333"
              underlineColorAndroid="transparent"
            />
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
  },
  commentInput: {
    height: 44,
    borderRadius: 30,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
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
});

export default Reaction;
