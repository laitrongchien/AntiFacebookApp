import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import VectorIcon from "../utils/VectorIcon";
import { pickImage, pickVideo } from "../utils/PickImage";
import * as navigation from "../rootNavigation";
import EditImage from "../components/EditImage";
import { Video, ResizeMode } from "expo-av";
import { useRoute } from "@react-navigation/native";
import { editPost } from "../redux/actions/postAction";

const EditPost = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { postData } = route.params;
  const { image, described, id } = postData;
  const textExisted = described;
  const imageExisted = image;

  const [showDefaultOptions, setShowDefaultOptions] = useState(true);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [text, setText] = useState(described);
  const [images, setImages] = useState(image);
  const [imagesAdd, setImagesAdd] = useState(null);
  const [video, setVideo] = useState(null);
  const [imageDel, setImageDel] = useState([]);
  const { username, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowDefaultOptions(false);
        setKeyboardIsOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardIsOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleGoBack = () => {
    if (text != textExisted || images != imageExisted) {
      Alert.alert(
        "Bỏ thay đổi ?",
        "Nếu bạn bỏ bây giờ những thay đổi sẽ không được lưu.",
        [
          { text: "Tiếp tục chỉnh sửa", style: "cancel" },
          {
            text: "Bỏ",
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handlePickImage = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset);
      setImages((prevImages) => [...prevImages, ...selectedImages]);
      setImagesAdd(selectedImages);
    }
  };

  const handlePickVideo = async () => {
    const result = await pickVideo();
    if (!result.canceled) {
      setVideo(result.assets[0]);
    }
  };

  const handleRemoveImage = (removedId) => {
    console.log(removedId);
    setImageDel((prevImageDel) => [...prevImageDel, removedId]);
  };

  const handleEditPost = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("described", text);
    formData.append("image_del", imageDel.join(","));
    formData.append("status", "Hyped");
    formData.append("auto_accept", "1");

    // if (images != imageExisted && images.length > 0) {
    imagesAdd?.forEach((image) => {
      const uriParts = image.uri.split("/");
      const fileNameWithType = uriParts[uriParts.length - 1];
      const [fileName, fileType] = fileNameWithType.split(".");
      // console.log(fileName, fileType);

      const imageData = {
        uri:
          Platform.OS === "android"
            ? image.uri
            : image.uri.replace("file://", ""),
        type: "image/" + fileType,
        name: fileName,
      };
      formData.append("image", imageData);
    });
    // }

    // Append video if available
    if (video) {
      videoUri = video.uri.split("/");
      const fileNameWithType = videoUri[videoUri.length - 1];
      const [fileName, fileType] = fileNameWithType.split(".");
      formData.append("video", {
        name: fileName,
        uri: video.uri,
        type: "video/" + fileType,
      });
    }

    console.log(formData);

    dispatch(editPost(formData));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.parentContainer}
      enabled
      behavior="height"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.navigationBar}>
          <VectorIcon
            name="arrow-back"
            type="Ionicons"
            color="#000"
            size={30}
            onPress={handleGoBack}
          />
          <Text style={styles.navigationTitle}>Chỉnh sửa bài viết</Text>
          <TouchableOpacity
            onPress={handleEditPost}
            style={
              text != textExisted || images != imageExisted
                ? { ...styles.btnPost, backgroundColor: "#1877f2" }
                : styles.btnPost
            }
            disabled={text == textExisted && images == imageExisted}
          >
            <Text
              style={{
                fontSize: 16,
                color:
                  text != textExisted || images != imageExisted
                    ? "#fff"
                    : "#333",
              }}
            >
              LƯU
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.infoWrapper}>
            <Image style={styles.avatar} source={{ uri: avatar }}></Image>
            <View>
              <Text style={styles.name}>{username}</Text>
              <View style={styles.postOption}>
                <TouchableOpacity style={styles.statusOption}>
                  <VectorIcon
                    name="earth"
                    type="MaterialCommunityIcons"
                    size={20}
                    color="#1877F2"
                  />
                  <Text style={styles.statusOptionText}>Công khai</Text>
                  <VectorIcon
                    name="menu-down"
                    type="MaterialCommunityIcons"
                    size={20}
                    color="#1877F2"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TextInput
            placeholderTextColor="#888"
            selectionColor="#888"
            multiline
            defaultValue={described}
            style={{
              ...styles.editor,
              fontSize: 26,
              color: "#000",
              fontWeight: "300",
              maxHeight: 300,
              textAlignVertical: "top",
            }}
            underlineColorAndroid="transparent"
            onFocus={() => {
              setShowDefaultOptions(false);
            }}
            onChangeText={(text) => setText(text)}
          ></TextInput>
          <EditImage
            images={images}
            setImages={setImages}
            imagesAdd={imagesAdd}
            setImagesAdd={setImagesAdd}
            onRemoveImage={handleRemoveImage}
          />
          {video && (
            <View>
              <Video
                source={{
                  uri: video.uri,
                }}
                rate={1.0}
                volume={1.0}
                resizeMode={ResizeMode.COVER}
                style={styles.video}
              />
            </View>
          )}
        </ScrollView>

        <Animated.View style={styles.toolOptionsWrapper}>
          {!showDefaultOptions ? (
            <Animated.View
              style={{
                ...styles.optionsWrapper,
                bottom: keyboardIsOpen ? 40 : 0,
              }}
            >
              <View style={styles.optionWrapper}>
                <TouchableOpacity
                  style={{ alignItems: "center", flexBasis: "32%" }}
                  onPress={handlePickImage}
                >
                  <Image
                    style={styles.optionImage}
                    source={require("../assets/icons/cameraroll.png")}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ alignItems: "center", flexBasis: "32%" }}
                  onPress={handlePickVideo}
                >
                  <Image
                    style={{ ...styles.optionImage, height: 40 }}
                    source={require("../assets/icons/video.png")}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ alignItems: "center", flexBasis: "32%" }}
                >
                  <Image
                    style={styles.optionImage}
                    source={require("../assets/icons/emoji.png")}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : (
            <Animated.View style={styles.optionsWrapper}>
              <TouchableOpacity onPress={handlePickImage}>
                <View
                  style={{
                    ...styles.optionWrapper,
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    style={{
                      ...styles.optionImage,
                      width: 30,
                      marginRight: 15,
                    }}
                    source={require("../assets/icons/cameraroll.png")}
                  ></Image>
                  <Text style={{ fontSize: 16 }}>Ảnh</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePickVideo}>
                <View
                  style={{
                    ...styles.optionWrapper,
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    style={{
                      ...styles.optionImage,
                      width: 40,
                      height: 50,
                      marginRight: 8,
                      marginLeft: -4,
                    }}
                    source={require("../assets/icons/video.png")}
                  ></Image>
                  <Text style={{ fontSize: 16 }}>Video</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("do not thing")}>
                <View
                  style={{
                    ...styles.optionWrapper,
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    style={{
                      ...styles.optionImage,
                      width: 30,
                      marginRight: 15,
                    }}
                    source={require("../assets/icons/emoji.png")}
                  ></Image>
                  <Text style={{ fontSize: 16 }}>Cảm xúc/Hoạt động</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  parentContainer: {
    height: screenHeight,
    position: "relative",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    height: 50,
    paddingHorizontal: 12,
  },
  navigationTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
  btnPost: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  infoWrapper: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  postOption: {
    flexDirection: "row",
  },
  statusOption: {
    marginRight: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edfcfc",
  },
  statusOptionText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#1877F2",
  },
  avatar: {
    marginRight: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  editor: {
    width: "100%",
    paddingHorizontal: 12,
  },
  toolOptionsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  optionsWrapper: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 0,
    zIndex: 999999,
  },
  optionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    height: 55,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },

  optionImage: {
    width: "100%",
    height: 25,
    resizeMode: "contain",
  },
  video: {
    height: 300,
    backgroundColor: "#000",
  },
});

export default EditPost;
