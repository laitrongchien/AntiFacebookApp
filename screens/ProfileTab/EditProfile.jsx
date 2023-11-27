import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SCREEN_HEIGHT } from "../../constants";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { pickOneImage } from "../../utils/PickImage";
import { useSelector } from "react-redux";
import { useState } from "react";

const EditProfile = () => {
  const { avatar } = useSelector((state) => state.auth);
  const { cover_image, city, country } = useSelector((state) => state.user);
  const [avatarImage, setAvatarImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handlePickAvatarImage = async () => {
    const result = await pickOneImage();
    if (!result.canceled) {
      setAvatarImage(result.assets[0].uri);
    }
  };

  const handlePickCoverImage = async () => {
    const result = await pickOneImage();
    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const handleGetFormData = () => {
    const formData = new FormData();

    if (avatarImage) {
      const avatarImageFile = {
        uri: avatarImage,
        type: "image/jpeg",
        name: "avatar.jpg",
      };
      formData.append("avatar", avatarImageFile);
    }
    if (coverImage) {
      const coverImageFile = {
        uri: coverImage,
        type: "image/jpeg",
        name: "cover.jpg",
      };
      formData.append("cover_image", coverImageFile);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnBack}
        >
          <VectorIcon
            name="arrow-left"
            type="MaterialCommunityIcons"
            color="#000"
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.navigationTitle}>Chỉnh sửa trang cá nhân</Text>
      </View>
      <ScrollView
        bounces={false}
        style={styles.detailsWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ ...styles.detail, paddingTop: 0 }}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Ảnh đại diện</Text>
            <TouchableOpacity onPress={handlePickAvatarImage}>
              <Text style={{ fontSize: 16, color: "#318bfb" }}>
                {avatar ? "Chỉnh sửa" : "Thêm"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={{ uri: avatarImage ? avatarImage : avatar }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Ảnh bìa</Text>
            <TouchableOpacity onPress={handlePickCoverImage}>
              <Text style={{ fontSize: 16, color: "#318bfb" }}>
                {cover_image ? "Chỉnh sửa" : "Thêm"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
              }}
              style={styles.cover}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Tiểu sử</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 16, color: "#318bfb" }}>Thêm</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.introTxt}>Thêm tiểu sử tại đây...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Chi tiết</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditDetailInfo")}
            >
              <Text style={{ fontSize: 16, color: "#318bfb" }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.introListWrapper}>
            <View style={styles.introLine}>
              <VectorIcon
                name="home"
                type="MaterialCommunityIcons"
                color="#333"
                size={28}
              />
              {city ? (
                <Text style={styles.introLineText}>
                  Đến từ <Text style={styles.introHightLight}>{city}</Text>
                </Text>
              ) : (
                <Text style={styles.introLineText}>
                  Thêm thông tin nơi ở/ thành phố của bạn
                </Text>
              )}
            </View>
            <View style={styles.introLine}>
              <VectorIcon
                name="map-marker"
                type="MaterialCommunityIcons"
                color="#333"
                size={28}
              />
              {country ? (
                <Text style={styles.introLineText}>
                  Quốc gia <Text style={styles.introHightLight}>{country}</Text>
                </Text>
              ) : (
                <Text style={styles.introLineText}>
                  Thêm thông tin quốc gia của bạn
                </Text>
              )}
            </View>
          </View>
        </View>

        <View
          activeOpacity={0.9}
          style={{ ...styles.detail, ...styles.lastDetail }}
        >
          <TouchableOpacity style={styles.btnModifyMore}>
            <Text style={{ color: "#1877f2", fontSize: 18, fontWeight: "500" }}>
              Lưu thông tin
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  navigationBar: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  btnBack: {
    width: 50,
    alignItems: "center",
  },
  navigationTitle: {
    fontSize: 18,
  },
  detailsWrapper: {
    paddingHorizontal: 15,
    height: SCREEN_HEIGHT - 50,
  },
  detail: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  detailTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  avatar: {
    width: 140,
    height: 140,
    alignSelf: "center",
    borderRadius: 140,
  },
  cover: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  introTxt: {
    fontSize: 16,
    color: "#333",
    alignSelf: "center",
    marginVertical: 10,
  },
  introListWrapper: {
    paddingVertical: 10,
  },
  introLine: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  introIcon: {
    width: 30,
  },
  introLineText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 12,
  },
  introHightLight: {
    fontWeight: "bold",
    fontSize: 16,
  },
  highlightGallery: {
    marginVertical: 10,
  },
  lastDetail: {
    borderBottomWidth: 0,
  },
  btnModifyMore: {
    height: 50,
    width: "100%",
    backgroundColor: "#d0f5f5",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
});
