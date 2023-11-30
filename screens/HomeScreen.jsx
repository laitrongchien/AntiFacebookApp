import { StyleSheet, ScrollView, FlatList, Text } from "react-native";
import { useState, useEffect, useCallback } from "react";
import PostTool from "../components/PostTool";
import Stories from "../components/Stories";
import PostItem from "../components/PostItem";
import HorizontalRecommendFriends from "../components/HorizontalRecommendFriends";
import { useDispatch, useSelector } from "react-redux";
import { getListPosts } from "../redux/actions/postAction";
import { SCREEN_WIDTH } from "../constants";
import LoadingSkeleton from "../components/Loading/Skeleton";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  const { post, last_id, new_items } = useSelector((state) => state.post);
  const { loading } = useSelector((state) => state.alert);

  const defaultInCampaign = 1;
  const defaultCampaignId = 1;
  const latitude = 20.0;
  const longitude = 105.0;
  const defaultLastId = 0;
  const defaultIndex = 0;
  const defaultCount = 20;

  // const [postList, setPostList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const flatListHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    // console.log(contentHeight - scrollY - flatListHeight);
    if (contentHeight - scrollY - flatListHeight <= 1000) {
      if (new_items !== 0 && !loading) {
        // console.log(loading, last_id);
        dispatch(
          getListPosts(
            id,
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

  const renderItem = ({ item }) => <PostItem postData={item} />;

  useEffect(() => {
    const handleGetListPost = async () => {
      setLoadingSkeleton(true);
      await dispatch(
        getListPosts(
          id,
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
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onScroll={handleScroll}
      ListHeaderComponent={() => (
        <>
          <PostTool />
          <Stories />
        </>
      )}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export default HomeScreen;
