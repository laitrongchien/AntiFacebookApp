import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { navigation } from "../../rootNavigation";
import { SCREEN_WIDTH } from "../../constants";
import FriendGallery from "../../components/FriendGallery";
import VectorIcon from "../../utils/VectorIcon";
import { useState } from "react";
import AvatarOptions from "./AvartarOptions";
import CoverOptions from "./CoverOptions";
import BottomModal from "../../components/BottomModal";
import PostTool from "../../components/PostTool";
import PostItem from "../../components/PostItem";

const ProfileScreen = () => {
  const [isAvatarOptionsVisible, setIsAvatarOptionsVisible] = useState("false");
  const [isCoverOptionsVisible, setIsCoverOptionsVisible] = useState("false");

  return (
    <View style={{ position: "relative" }}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            name="arrow-left"
            type="MaterialCommunityIcons"
            color="#000"
            size={32}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Lại Chiến</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <VectorIcon
            name="magnify"
            type="MaterialCommunityIcons"
            color="#000"
            size={32}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.infoWrapper}>
          <View style={styles.avatarCoverWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsCoverOptionsVisible(true)}
            >
              <Image
                style={styles.cover}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnChangeCover}
              onPress={() => setIsCoverOptionsVisible(true)}
            >
              <VectorIcon
                name="camera"
                type="FontAwesome5"
                size={18}
                color="#3a3a3a"
              />
            </TouchableOpacity>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setIsAvatarOptionsVisible(true)}
              >
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/default-img.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnChangeAvatar}
                onPress={() => setIsAvatarOptionsVisible(true)}
              >
                <VectorIcon
                  name="camera"
                  type="FontAwesome5"
                  size={18}
                  color="#3a3a3a"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.name}>Lại Chiến</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity activeOpacity={0.8} style={styles.btnAddStory}>
                <VectorIcon
                  name="plus"
                  type="MaterialCommunityIcons"
                  size={18}
                  color="#fff"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#fff",
                    marginLeft: 5,
                  }}
                >
                  Thêm vào tin
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.btnAddStory,
                    width: SCREEN_WIDTH - 90,
                    backgroundColor: "#ddd",
                  }}
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  <VectorIcon
                    name="pencil"
                    type="MaterialCommunityIcons"
                    size={22}
                    color="#000"
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#000",
                      marginLeft: 5,
                    }}
                  >
                    Chỉnh sửa trang cá nhân
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnOption}
                  onPress={() => navigation.navigate("ProfileSetting")}
                >
                  <VectorIcon
                    name="dots-horizontal"
                    type="MaterialCommunityIcons"
                    color="#000"
                    size={28}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.introListWrapper}>
          <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 12 }}>
            Chi tiết
          </Text>
          <View style={styles.introLine}>
            <VectorIcon
              name="home"
              type="MaterialCommunityIcons"
              color="#333"
              size={28}
            />
            <Text style={styles.introLineText}>
              Sống tại <Text style={styles.introHightLight}>Thái Bình</Text>
            </Text>
          </View>
          <View style={styles.introLine}>
            <VectorIcon
              name="map-marker"
              type="MaterialCommunityIcons"
              color="#333"
              size={28}
            />
            <Text style={styles.introLineText}>
              Đến từ <Text style={styles.introHightLight}>Thái Bình</Text>
            </Text>
          </View>
          <View style={styles.introLine}>
            <VectorIcon
              name="dots-horizontal"
              type="MaterialCommunityIcons"
              color="#333"
              size={28}
            />
            <TouchableOpacity>
              <Text style={styles.introLineText}>
                Xem thông tin giới thiệu của bạn
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnEditPublicInfo}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text
                style={{ color: "#1877f2", fontSize: 16, fontWeight: "500" }}
              >
                Chỉnh sửa chi tiết công khai
              </Text>
            </TouchableOpacity>
          </View>
          <FriendGallery />
        </View>
        <View style={{ backgroundColor: "#fff", marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              paddingLeft: 15,
              paddingVertical: 8,
            }}
          >
            Bài viết
          </Text>
          <PostTool />
        </View>
        <PostItem />
        <PostItem />
        <PostItem />
      </ScrollView>
      <BottomModal
        isVisible={isCoverOptionsVisible}
        closeModal={() => setIsCoverOptionsVisible(false)}
      >
        <CoverOptions />
      </BottomModal>
      <BottomModal
        isVisible={isAvatarOptionsVisible}
        closeModal={() => setIsAvatarOptionsVisible(false)}
      >
        <AvatarOptions />
      </BottomModal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
  },
  navigationBar: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    zIndex: 2,
  },
  infoWrapper: {
    backgroundColor: "#fff",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginTop: 40,
  },
  avatarCoverWrapper: {
    paddingBottom: 90,
    position: "relative",
  },
  cover: {
    width: "100%",
    height: 240,
  },
  avatarWrapper: {
    backgroundColor: "#000",
    position: "absolute",
    borderRadius: 2000,
    left: (SCREEN_WIDTH - 150) / 2, //paddingHorizontal - avatarWidth
    bottom: 0,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 2000,
    borderColor: "#fff",
    borderWidth: 5,
  },
  btnChangeCover: {
    backgroundColor: "#fff",
    position: "absolute",
    width: 45,
    height: 45,
    borderRadius: 50,
    bottom: 90 + 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnChangeAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 50,
    width: 45,
    height: 45,
    borderWidth: 2.5,
    borderColor: "#fff",
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  subName: {
    fontSize: 20,
    fontWeight: "500",
  },
  introTxt: {
    color: "rgba(0,0,0,0.7)",
    marginTop: 10,
  },
  buttonWrapper: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  btnAddStory: {
    backgroundColor: "#1877f2",
    borderRadius: 5,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 30,
    marginBottom: 12,
  },
  btnOption: {
    marginLeft: 10,
    borderRadius: 5,
    height: 40,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
  introListWrapper: {
    marginTop: 12,
    padding: 15,
    backgroundColor: "#fff",
  },
  introLine: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  introLineText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "400",
  },
  introHightLight: {
    fontWeight: "bold",
    fontSize: 16,
  },
  photo: {
    width: (SCREEN_WIDTH - 42) / 3,
    height: (SCREEN_WIDTH - 42) / 3,
  },
  btnEditPublicInfo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d0f5f5",
    width: "100%",
    height: 40,
    borderRadius: 5,
  },
  friendsWrapper: {
    paddingVertical: 15,
  },
  friendsBar: {
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnFindFriends: {
    paddingHorizontal: 10,
  },
  friendGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  friendItem: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    marginBottom: 15,
  },
  friendAvatar: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    height: (SCREEN_WIDTH - 30 - 20) / 3,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "#333",
  },
  btnViewAllFriends: {
    width: "100%",
    borderRadius: 5,
    height: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationsWrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 15,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    height: 100,
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
  },
  navigation: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#ddd",
    borderRadius: 48,
    marginHorizontal: 5,
  },
  lastNavigation: {
    marginRight: 25,
  },
  navigationIcon: {
    width: 30,
    alignItems: "center",
  },
});
