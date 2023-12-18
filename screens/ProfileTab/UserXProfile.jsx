import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { navigation } from "../../rootNavigation";
import { SCREEN_WIDTH } from "../../constants";
import FriendGallery from "../../components/FriendGallery";
import VectorIcon from "../../utils/VectorIcon";
import { useRoute } from "@react-navigation/native";
import { user as userApi } from "../../api/user";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../../components/PostItem";
import { getListUserPosts } from "../../redux/actions/postAction";
import { getUserFriends } from "../../redux/actions/userAction";

const UserXProfileScreen = () => {
  const route = useRoute();
  const { userXId } = route.params;
  const [userX, setUserX] = useState({});
  const [loadingUserX, setLoadingUserX] = useState(false);
  const { post } = useSelector((state) => state.userPost);
  const { friends, total } = useSelector((state) => state.userFriend);
  const dispatch = useDispatch();

  const defaultInCampaign = 1;
  const defaultCampaignId = 1;
  const latitude = 20.0;
  const longitude = 105.0;
  const defaultLastId = 0;
  const defaultIndex = 0;
  const defaultCount = 6;

  useEffect(() => {
    const handleGetUserXInfo = async () => {
      try {
        setLoadingUserX(true);
        const res = await userApi.getUserInfo(userXId);
        setUserX(res.data.data);

        dispatch({
          type: "RESET_USER_POSTS",
        });
        await dispatch(
          getListUserPosts(
            userXId,
            defaultInCampaign,
            defaultCampaignId,
            latitude,
            longitude,
            defaultLastId,
            defaultIndex,
            defaultCount
          )
        );
        dispatch({
          type: "RESET_USER_FRIENDS",
        });
        await dispatch(getUserFriends(userXId, defaultIndex, defaultCount));
        setLoadingUserX(false);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    handleGetUserXInfo();
  }, []);

  if (loadingUserX)
    return (
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 300 }} />
    );

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
            <View>
              <Image
                style={styles.cover}
                source={
                  userX.cover_image
                    ? { uri: userX.cover_image }
                    : require("../../assets/images/cover_img.jpg")
                }
              />
            </View>
            <View style={styles.avatarWrapper}>
              <View>
                <Image
                  style={styles.avatar}
                  source={
                    userX.avatar
                      ? { uri: userX.avatar }
                      : require("../../assets/images/default-img.png")
                  }
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.name}>{userX.username || "Username"}</Text>
            <View style={styles.buttonWrapper}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#000",
                      marginLeft: 5,
                    }}
                  >
                    {userX.is_friend == 1
                      ? "Bạn bè"
                      : userX.is_friend == 2
                      ? "Đã gửi lời mời"
                      : userX.is_friend == 3
                      ? "Chấp nhận lời mời"
                      : "Thêm bạn bè"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.btn,
                    marginLeft: 8,
                    backgroundColor: "#1877f2",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#fff",
                      marginLeft: 5,
                    }}
                  >
                    Nhắn tin
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.btnOption}>
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
            {userX.city ? (
              <Text style={styles.introLineText}>
                Đến từ <Text style={styles.introHightLight}>{userX.city}</Text>
              </Text>
            ) : (
              <Text style={styles.introLineText}>
                Chưa có thông tin thành phố
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
            {userX.country ? (
              <Text style={styles.introLineText}>
                Quốc gia{" "}
                <Text style={styles.introHightLight}>{userX.country}</Text>
              </Text>
            ) : (
              <Text style={styles.introLineText}>
                Chưa có thông tin quốc gia
              </Text>
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
              <Text style={styles.introLineText}>
                Xem thông tin giới thiệu của userX
              </Text>
            </TouchableOpacity>
          </View>
          <FriendGallery friends={friends} total={total} userXId={userXId} />
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
    </View>
  );
};

export default UserXProfileScreen;

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
  btn: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    width: SCREEN_WIDTH / 2.6,
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
  noPost: {
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
