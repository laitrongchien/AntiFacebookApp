import { useState } from "react";
import { SCREEN_WIDTH } from "../../constants";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import * as navigation from "../../rootNavigation";
import CameraRoll from "../../assets/images/cameraroll.png";

const PostTool = () => {
  const { avatar } = useSelector((state) => state.auth);

  const [inputBgColor, setInputBgColor] = useState("#fff");

  const onNavigateCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  return (
    <View style={styles.postToolWrapper}>
      <TouchableOpacity activeOpacity={0.5} style={styles.userAvatarWrapper}>
        <Image source={{ uri: avatar }} style={styles.userAvatar} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNavigateCreatePost}>
        <View style={{ ...styles.postInput, backgroundColor: inputBgColor }}>
          <Text style={styles.inputStyle}>Bạn đang nghĩ gì?</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={CameraRoll} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postToolWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  postInput: {
    borderWidth: 1,
    borderColor: "#bebebe",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    width: SCREEN_WIDTH - 120,
    marginLeft: 8,
    marginRight: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  inputStyle: {
    fontSize: 16,
    color: "#3a3a3a",
  },
});

export default PostTool;
