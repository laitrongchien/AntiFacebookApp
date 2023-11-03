import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import VectorIcon from "../../utils/VectorIcon";

const PostOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="bookmark"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Lưu bài viết</Text>
            <Text style={styles.postOptionSubtitle}>
              Thêm vào danh sách các mục đã lưu
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="close-box"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Ẩn bài viết</Text>
            <Text style={styles.postOptionSubtitle}>
              Ẩn các bài viết tương tự
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="message-alert"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Báo cáo bài viết</Text>
            <Text style={styles.postOptionSubtitle}>
              Chúng tôi sẽ không cho biết ai đã báo cáo
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="bell"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>
              Bật thông báo về bài viết này
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="link-variant"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Sao chép liên kết</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },

  postOptionsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 2,
    padding: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  postOptionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  optionIcon: {
    width: 35,
    alignItems: "center",
    marginRight: 8,
  },
  postOptionTitle: {
    fontSize: 18,
  },
  postOptionSubtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default PostOptions;
