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

const EditProfile = () => {
  const { avatar } = useSelector((state) => state.auth);
  const { cover_image, city, country, address } = useSelector(
    (state) => state.user
  );

  const handlePickAvatarImage = async () => {
    const result = await pickOneImage();
    if (!result.canceled) {
      navigation.navigate("CreateAvatar", { image: result.assets[0] });
    }
  };

  const handlePickCoverImage = async () => {
    const result = await pickOneImage();
    if (!result.canceled) {
      navigation.navigate("CreateCover", { image: result.assets[0] });
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

          <Image source={{ uri: avatar }} style={styles.avatar} />
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

          <Image
            source={
              cover_image
                ? { uri: cover_image }
                : require("../../assets/images/cover_img.jpg")
            }
            style={styles.cover}
          />
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
            {/* <View style={styles.introLine}>
              <VectorIcon
                name="home"
                type="MaterialCommunityIcons"
                color="#333"
                size={28}
              />
              {address ? (
                <Text style={styles.introLineText}>
                  Sống tại <Text style={styles.introHightLight}>{address}</Text>
                </Text>
              ) : (
                <Text style={styles.introLineText}>
                  Thêm thông tin địa chỉ của bạn
                </Text>
              )}
            </View> */}
            <View style={styles.introLine}>
              <VectorIcon
                name="map-marker"
                type="MaterialCommunityIcons"
                color="#333"
                size={28}
              />
              {city ? (
                <Text style={styles.introLineText}>
                  Đến từ <Text style={styles.introHightLight}>{city}</Text>
                  {country && (
                    <Text style={styles.introHightLight}>
                      {"," + " " + country}
                    </Text>
                  )}
                </Text>
              ) : (
                <Text style={styles.introLineText}>
                  Thêm thông tin thành phố, quốc gia của bạn
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* <View
          activeOpacity={0.9}
          style={{ ...styles.detail, ...styles.lastDetail }}
        >
          <TouchableOpacity style={styles.btnModifyMore}>
            <Text style={{ color: "#1877f2", fontSize: 18, fontWeight: "500" }}>
              Lưu thông tin
            </Text>
          </TouchableOpacity>
        </View> */}
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
    marginLeft: 8,
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
