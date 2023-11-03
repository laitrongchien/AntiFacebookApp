import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import ExTouchableOpacity from "../ExTouchableOpacity";
import ScaleImage from "../ScaleImage";
import Reaction from "../Reaction";
import { SCREEN_WIDTH } from "../../constants";
import { useState } from "react";
import BottomModal from "../BottomModal";
import PostOptions from "./PostOption";

const PostItem = () => {
  const [postOptionVisible, setPostOptionVisible] = useState("false");
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
            source={require("../../assets/images/default-img.png")}
          />
          <View style={styles.infoWrapper}>
            <View style={styles.nameWrapper}>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  HUST Confessions
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.extraInfoWrapper}>
              <Text style={{ color: "#333", fontSize: 12 }}>37p</Text>
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
        <Text style={styles.paragraph}>
          Quên giai thoại “Ông Anh Sinh Năm 96” đi, bây giờ “Ông em Sinh năm
          2k1” mới là văn mẫu! Ngành IT Việt Nam hiện nay ở đầu của sự phát
          triển. Có thể nói IT là vua của các nghề. Vừa có tiền, có quyền. Vừa
          kiếm được nhiều $ lại được xã hội trọng vọng.
        </Text>
      </View>
      <ExTouchableOpacity>
        <View style={styles.imageContainer}>
          <ScaleImage
            source="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            width={SCREEN_WIDTH}
          />
        </View>
      </ExTouchableOpacity>
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
    marginBottom: 10,
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

export default PostItem;
