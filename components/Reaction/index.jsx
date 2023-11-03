import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import ExTouchableOpacity from "../ExTouchableOpacity";
import VectorIcon from "../../utils/VectorIcon";
import { useState } from "react";
import BottomModal from "../BottomModal";
import Comment from "../Comment";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../constants";

const Reaction = () => {
  const [liked, setLiked] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  const openComment = () => {
    setCommentVisible(true);
  };

  const closeComment = () => {
    setCommentVisible(false);
  };

  return (
    <View>
      <ExTouchableOpacity style={styles.reactStatis} onPress={openComment}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/icons/like.jpeg")}
            style={{ width: 20, height: 20, marginRight: 4 }}
          />
          <Text style={{ color: "#666" }}>200</Text>
        </View>
        <Text style={{ color: "#666" }}>100 bình luận</Text>
      </ExTouchableOpacity>
      <View style={styles.reactHandle}>
        <ExTouchableOpacity
          style={styles.btnOption}
          onPress={() => setLiked(!liked)}
          onLongPress={() => console.log("press")}
        >
          <VectorIcon
            name={liked ? "thumb-up" : "thumb-up-outline"}
            type="MaterialCommunityIcons"
            color={liked ? "#1877f2" : "#666"}
            size={22}
          />
          <Text style={{ color: liked ? "#1877f2" : "#666", marginLeft: 4 }}>
            Thích
          </Text>
        </ExTouchableOpacity>
        <ExTouchableOpacity style={styles.btnOption} onPress={openComment}>
          <VectorIcon
            name="chat-outline"
            type="MaterialCommunityIcons"
            color="#666"
            size={22}
          />
          <Text style={{ color: "#666", marginLeft: 4 }}>Bình luận</Text>
        </ExTouchableOpacity>
      </View>
      <BottomModal isVisible={commentVisible} closeModal={closeComment}>
        <ScrollView
          bounces={true}
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 24,
            height: SCREEN_HEIGHT - 64,
            backgroundColor: "#fff",
          }}
        >
          <Comment />
        </ScrollView>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor="#333"
            selectionColor="#333"
            underlineColorAndroid="transparent"
          />
        </View>
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
    // borderTopColor: "#ccc",
    // borderTopWidth: 1,
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
    position: "absolute",
    width: SCREEN_WIDTH,
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
});

export default Reaction;
