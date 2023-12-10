import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import VectorIcon from "../utils/VectorIcon";
import Comment from "../components/Comment";
import PostImage from "../components/PostImage";
import { navigation } from "../rootNavigation";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { post as postApi } from "../api/post";
import { getTimeFromCreatePost } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../redux/actions/commentAction";
import LoadingCommentSkeleton from "../components/Loading/LoadingCommentSkeleton";

const PostDetailScreen = () => {
  const route = useRoute();
  const { postData } = route.params;
  const dispatch = useDispatch();
  const [postDetail, setPostDetail] = useState(postData);
  const [loadingComments, setLoadingComments] = useState(false);
  const comments = useSelector((state) => state.comments);
  const defaultIndex = 0;
  const defaultCount = 10;

  useEffect(() => {
    console.log("mounted");
    const handleGetPost = async () => {
      try {
        const res = await postApi.getPost(postData.id);
        setPostDetail(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    handleGetPost();
  }, []);

  useEffect(() => {
    const getPostComments = async () => {
      setLoadingComments(true);
      await dispatch(getComments(postData.id, defaultIndex, defaultCount));
      setLoadingComments(false);
    };
    getPostComments();
  }, [postData.id]);

  const { image, described, created, author, is_felt } = postDetail;

  return (
    <View
      style={{ position: "relative", backgroundColor: "#fff", height: "100%" }}
    >
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            name="arrow-left"
            type="MaterialCommunityIcons"
            color="#000"
            size={32}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {author.name || "Username"}
        </Text>
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
        style={styles.item}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <View style={styles.postHeaderInfo}>
              <Image
                style={styles.avatar}
                source={
                  author.avatar
                    ? { uri: author.avatar }
                    : require("../assets/images/default-img.png")
                }
              />
              <View style={styles.infoWrapper}>
                <View style={styles.nameWrapper}>
                  <TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      {author.name || "Username"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.extraInfoWrapper}>
                  <Text style={{ color: "#333", fontSize: 12 }}>
                    {getTimeFromCreatePost(created)}
                  </Text>
                  <Text style={{ fontSize: 16, marginHorizontal: 5 }}>·</Text>
                  <VectorIcon
                    name="earth"
                    type="MaterialCommunityIcons"
                    size={19}
                    color="#666"
                  />
                </View>
              </View>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <VectorIcon
                  name="dots-horizontal"
                  type="MaterialCommunityIcons"
                  size={30}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.postContent}>
            <Text style={styles.paragraph}>{described}</Text>
          </View>
          {image.length !== 0 && <PostImage images={image} />}
        </View>
        <View style={styles.reactHandle}>
          <TouchableOpacity
            style={styles.btnOption}
            // onPress={handleLikeButtonClick}
            onLongPress={() => console.log("press")}
          >
            <VectorIcon
              name={is_felt == 0 ? "thumb-up" : "thumb-up-outline"}
              type="MaterialCommunityIcons"
              color={is_felt == 0 ? "#1877f2" : "#666"}
              size={22}
            />
            <Text
              style={{
                color: is_felt == 0 ? "#1877f2" : "#666",
                marginLeft: 4,
              }}
            >
              Thích
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}>
            <VectorIcon
              name="chat-outline"
              type="MaterialCommunityIcons"
              color="#666"
              size={22}
            />
            <Text style={{ color: "#666", marginLeft: 4 }}>Bình luận</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            marginBottom: 12,
          }}
        >
          <Image
            source={require("../assets/icons/like_icon.png")}
            style={{ width: 20, height: 20 }}
          />
          <Image
            source={require("../assets/icons/sad.png")}
            style={{
              width: 18,
              height: 18,
              marginRight: 4,
              marginLeft: -4,
            }}
          />
          <Text style={{ color: "#666" }}>{postData.feel}</Text>
        </TouchableOpacity>
        {!loadingComments ? (
          comments.length != 0 ? (
            <View style={{ paddingHorizontal: 10 }}>
              {comments.map((item) => {
                return <Comment item={item} key={item.id} />;
              })}
            </View>
          ) : (
            <View
              style={{
                height: 300,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 18, color: "#333" }}>
                Chưa có bình luận nào
              </Text>
              <Text style={{ fontSize: 16, color: "#333" }}>
                Hãy là người đầu tiên bình luận
              </Text>
            </View>
          )
        ) : (
          <>
            <LoadingCommentSkeleton />
            <LoadingCommentSkeleton />
          </>
        )}
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Nhập bình luận..."
          placeholderTextColor="#333"
          selectionColor="#333"
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

    zIndex: 2,
  },
  item: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    marginTop: 50,
    marginBottom: 68,
  },
  postHeaderInfo: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  infoWrapper: {
    marginLeft: 8,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  extraInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 18,
  },

  paragraph: {
    marginBottom: 8,
    fontSize: 16,
  },
  postContent: {
    paddingHorizontal: 16,
  },
  reactHandle: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  btnOption: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    flex: 1,
  },
  commentInputContainer: {
    padding: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
  },
  commentInput: {
    height: 44,
    borderRadius: 30,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
  },
});

export default PostDetailScreen;
