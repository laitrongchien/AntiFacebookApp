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
} from "react-native";
import { useState, useEffect } from "react";
import VectorIcon from "../utils/VectorIcon";
import { pickImage } from "../utils/PickImage";
import DefaultImage from "../assets/images/default-img.png";
import * as navigation from "../rootNavigation";
import BottomModal from "../components/BottomModal";
import DiscardPostOption from "../components/DiscardPostOption";
import PreviewImage from "../components/PreviewImage";

const CreatePost = () => {
  const [showDefaultOptions, setShowDefaultOptions] = useState(true);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);

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
    if (text.trim() !== "" || images.length !== 0) {
      setShowModal(true); // Show the modal if there is text in TextInput
    } else {
      navigation.goBack();
    }
  };

  const handlePickImage = async () => {
    const result = await pickImage();
    // console.log(result);
    if (!result.canceled) {
      const selectedImageURIs = result.assets.map((asset) => asset.uri);
      setImages([...images, ...selectedImageURIs]);
    }
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
          <Text style={styles.navigationTitle}>Tạo bài viết</Text>
          <TouchableOpacity
            style={
              text || images.length > 0
                ? { ...styles.btnPost, backgroundColor: "#1877f2" }
                : styles.btnPost
            }
            disabled={!(text || images.length > 0)}
          >
            <Text
              style={{
                fontSize: 16,
                color: text || images.length > 0 ? "#fff" : "#333",
              }}
            >
              ĐĂNG
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.infoWrapper}>
            <Image style={styles.avatar} source={DefaultImage}></Image>
            <View>
              <Text style={styles.name}>Lại Chiến</Text>
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
            placeholder="Bạn đang nghĩ gì?"
            placeholderTextColor="#888"
            selectionColor="#888"
            multiline
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
          <PreviewImage images={images} setImages={setImages} />
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
                  style={{ flex: 1, alignItems: "center" }}
                  onPress={handlePickImage}
                >
                  <Image
                    style={styles.optionImage}
                    source={require("../assets/icons/cameraroll.png")}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
                  <Image
                    style={styles.optionImage}
                    source={require("../assets/icons/emoji.png")}
                  ></Image>
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
                  <Text style={{ fontSize: 16 }}>Ảnh/Video</Text>
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
        <BottomModal
          isVisible={showModal}
          closeModal={() => setShowModal(false)}
        >
          <DiscardPostOption setShowModal={setShowModal} />
        </BottomModal>
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
  // editorWrapper: {
  //   overflow: "hidden",
  //   paddingHorizontal: 12,
  // },
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
    // paddingBottom: 90,
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
    height: 25,
    resizeMode: "contain",
  },
});

export default CreatePost;
