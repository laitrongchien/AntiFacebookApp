import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert, Clipboard } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { deletePost } from "../../redux/actions/postAction";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const PostOptions = ({ authorId, setPostOptionVisible, postId, postData }) => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeletePost = () => {
    setPostOptionVisible(false);
    Alert.alert(
      "Xóa bài viết",
      "Bạn có chắc muốn xóa bài viết này?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            dispatch(deletePost(postId));
            console.log("Bài viết đã bị xóa");
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleEditPost = () => {
    setPostOptionVisible(false);
    if (id === authorId) navigation.navigate("EditPost", { postData });
    else navigation.navigate("ReportPostScreen", { postId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon name="bookmark" type="MaterialCommunityIcons" size={28} color="#000" />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Lưu bài viết</Text>
            <Text style={styles.postOptionSubtitle}>Thêm vào danh sách các mục đã lưu</Text>
          </View>
        </TouchableOpacity>
        {id == authorId && (
          <TouchableOpacity style={styles.postOptionItem} onPress={handleDeletePost}>
            <View style={styles.optionIcon}>
              <VectorIcon name="close-box" type="MaterialCommunityIcons" size={28} color="#000" />
            </View>
            <View>
              <Text style={styles.postOptionTitle}>Xóa bài viết</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.postOptionItem} onPress={handleEditPost}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name={id == authorId ? "pencil" : "message-alert"}
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>
              {id == authorId ? "Chỉnh sửa bài viết" : "Báo cáo bài viết"}
            </Text>
            <Text style={styles.postOptionSubtitle}>
              {id == authorId
                ? "Chỉnh sửa bài viết của bạn"
                : "Chúng tôi sẽ không cho biết ai đã báo cáo"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon name="bell" type="MaterialCommunityIcons" size={28} color="#000" />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Bật thông báo về bài viết này</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon name="link-variant" type="MaterialCommunityIcons" size={28} color="#000" />
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
