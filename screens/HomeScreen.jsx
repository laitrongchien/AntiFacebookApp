import {
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import PostTool from "../components/PostTool";
import Stories from "../components/Stories";
import PostItem from "../components/PostItem";
import HorizontalRecommendFriends from "../components/HorizontalRecommendFriends";
import { useDispatch, useSelector } from "react-redux";
import { getListPosts } from "../redux/actions/postAction";
import LoadingSkeleton from "../components/Loading/Skeleton";
import { useScrollToTop } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { post, last_id, new_items } = useSelector((state) => state.post);
  const { loadingPosts, loadingPostCreated } = useSelector(
    (state) => state.alert
  );
  const flatListRef = useRef(null);

  const defaultInCampaign = 1;
  const defaultCampaignId = 1;
  const latitude = 20.0;
  const longitude = 105.0;
  const defaultLastId = 0;
  const defaultIndex = 0;
  const defaultCount = 20;

  const [refreshing, setRefreshing] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  useScrollToTop(flatListRef);

  const onRefresh = async () => {
    if (isConnected) {
      setRefreshing(true);
      setLoadingSkeleton(true);
      dispatch({
        type: "RESET_LIST_POSTS",
      });

      await dispatch(
        getListPosts(
          defaultInCampaign,
          defaultCampaignId,
          latitude,
          longitude,
          defaultLastId,
          defaultIndex,
          defaultCount
        )
      );
      setRefreshing(false);
      setLoadingSkeleton(false);
    }
  };

  const handleScroll = async (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const flatListHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    // console.log(contentHeight - scrollY - flatListHeight);
    if (contentHeight - scrollY - flatListHeight <= 1000) {
      if (new_items != 0 && !loadingPosts) {
        dispatch(
          getListPosts(
            defaultInCampaign,
            defaultCampaignId,
            latitude,
            longitude,
            last_id,
            defaultIndex,
            defaultCount
          )
        );
      }
    }
  };

  const renderItem = ({ item }) => {
    return <PostItem postData={item} />;
  };

  useEffect(() => {
    const handleGetListPost = async () => {
      setLoadingSkeleton(true);
      dispatch({
        type: "RESET_LIST_POSTS",
      });
      await dispatch(
        getListPosts(
          defaultInCampaign,
          defaultCampaignId,
          latitude,
          longitude,
          defaultLastId,
          defaultIndex,
          defaultCount
        )
      );
      setLoadingSkeleton(false);
    };
    handleGetListPost();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "Expected indices:",
  //     Array.from({ length: post.length }, (_, i) => i + 1)
  //   );
  // }, [post]);

  if (loadingSkeleton)
    return (
      <>
        <PostTool />
        <Stories />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </>
    );

  return (
    <FlatList
      data={post}
      ref={flatListRef}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onScroll={handleScroll}
      bounces={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <>
          <PostTool />
          <Stories />
          {loadingPostCreated && (
            <View style={styles.loadingPostWrapper}>
              <Text style={{ fontSize: 16 }}>Đang đăng...</Text>
              <ActivityIndicator size="large" color="#1877f2" />
            </View>
          )}
        </>
      )}
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#1877f2"]}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  loadingPostWrapper: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
