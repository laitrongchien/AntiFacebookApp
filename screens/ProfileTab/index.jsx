import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import AvatarOptions from "./AvartarOptions";
import CoverOptions from "./CoverOptions";
import BottomModal from "../../components/BottomModal";
import FriendGallery from "../../components/FriendGallery";
import PostItem from "../../components/PostItem";
import PostTool from "../../components/PostTool";
import { SCREEN_WIDTH } from "../../constants";
import { getListUserPosts } from "../../redux/actions/postAction";
import { getUserFriends } from "../../redux/actions/userAction";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const ProfileScreen = () => {
  const [isAvatarOptionsVisible, setIsAvatarOptionsVisible] = useState("false");
  const [isCoverOptionsVisible, setIsCoverOptionsVisible] = useState("false");
  const { username, avatar, id } = useSelector((state) => state.auth);
  const { cover_image, city, country } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.userPost);
  const { friends, total } = useSelector((state) => state.userFriend);
  const dispatch = useDispatch();

  const defaultInCampaign = 1;
  const defaultCampaignId = 1;
  const latitude = 20.0;
  const longitude = 105.0;
  const defaultLastId = 0;
  const defaultIndex = 0;
  const defaultCount = 20;

  useEffect(() => {
    dispatch(
      getListUserPosts(
        id,
        defaultInCampaign,
        defaultCampaignId,
        latitude,
        longitude,
        defaultLastId,
        defaultIndex,
        defaultCount,
      ),
    );
    dispatch(getUserFriends(id, defaultIndex, defaultCount));
  }, []);

  return (
    <View style={{ position: "relative" }}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon name="arrow-left" type="MaterialCommunityIcons" color="#000" size={32} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{username}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <VectorIcon name="magnify" type="MaterialCommunityIcons" color="#000" size={32} />
        </TouchableOpacity>
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.infoWrapper}>
          <View style={styles.avatarCoverWrapper}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIsCoverOptionsVisible(true)}>
              <Image
                style={styles.cover}
                source={
                  cover_image ? { uri: cover_image } : require("../../assets/images/cover_img.jpg")
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnChangeCover}
              onPress={() => setIsCoverOptionsVisible(true)}>
              <VectorIcon name="camera" type="FontAwesome5" size={18} color="#3a3a3a" />
            </TouchableOpacity>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => setIsAvatarOptionsVisible(true)}>
                <Image style={styles.avatar} source={{ uri: avatar }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnChangeAvatar}
                onPress={() => setIsAvatarOptionsVisible(true)}>
                <VectorIcon name="camera" type="FontAwesome5" size={18} color="#3a3a3a" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.name}>{username}</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity activeOpacity={0.8} style={styles.btnAddStory}>
                <VectorIcon name="plus" type="MaterialCommunityIcons" size={18} color="#fff" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#fff",
                    marginLeft: 5,
                  }}>
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
                  onPress={() => navigation.navigate("EditProfile")}>
                  <VectorIcon name="pencil" type="MaterialCommunityIcons" size={22} color="#000" />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#000",
                      marginLeft: 5,
                    }}>
                    Chỉnh sửa trang cá nhân
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnOption}
                  onPress={() => navigation.navigate("ProfileSetting")}>
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
          <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 12 }}>Chi tiết</Text>
          <View style={styles.introLine}>
            <VectorIcon name="map-marker" type="MaterialCommunityIcons" color="#333" size={28} />
            {city ? (
              <Text style={styles.introLineText}>
                Đến từ <Text style={styles.introHightLight}>{city}</Text>
                {country && <Text style={styles.introHightLight}>{"," + " " + country}</Text>}
              </Text>
            ) : (
              <Text style={styles.introLineText}>Thêm thông tin thành phố, quốc gia</Text>
            )}
          </View>
          <View style={styles.introLine}>
            <VectorIcon
              name="dots-horizontal"
              type="MaterialCommunityIcons"
              color="#333"
              size={28}
            />
            <TouchableOpacity>
              <Text style={styles.introLineText}>Xem thông tin giới thiệu của bạn</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnEditPublicInfo}
              onPress={() => navigation.navigate("EditProfile")}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
                Chỉnh sửa chi tiết công khai
              </Text>
            </TouchableOpacity>
          </View>
          <FriendGallery friends={friends} total={total} userXId={id} />
        </View>
        <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              paddingLeft: 15,
              paddingVertical: 8,
            }}>
            Bài viết
          </Text>
          <PostTool />
        </View>
        {post.length == 0 ? (
          <View style={styles.noPost}>
            <Text style={{ fontSize: 16 }}>Chưa có bài post nào!</Text>
          </View>
        ) : (
          <View>
            {post.map((item) => {
              return <PostItem postData={item} key={item.id} />;
            })}
          </View>
        )}
      </ScrollView>
      <BottomModal
        isVisible={isCoverOptionsVisible}
        closeModal={() => setIsCoverOptionsVisible(false)}>
        <CoverOptions />
      </BottomModal>
      <BottomModal
        isVisible={isAvatarOptionsVisible}
        closeModal={() => setIsAvatarOptionsVisible(false)}>
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
    backgroundColor: "#1877f2",
    width: "100%",
    height: 40,
    borderRadius: 5,
  },
  noPost: {
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
