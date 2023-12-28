import { useScrollToTop } from "@react-navigation/native";
import { useState, useRef } from "react";
import { StyleSheet, RefreshControl, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DarkBackgroundVideoItem from "./DarkBackgroundVideoItem";
import { getListVideos } from "../../redux/actions/watchVideosAction";
import LoadingVideoSkeleton from "../Loading/LoadingVideoSkeleton";

const DarkBackGroundVideos = () => {
  const defaultInCampaign = 1;
  const defaultCampaignId = 1;
  const latitude = 20.0;
  const longitude = 105.0;
  const defaultLastId = 0;
  const defaultIndex = 0;
  const defaultCount = 20;
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  const dispatch = useDispatch();
  const { loadingVideos } = useSelector((state) => state.alert);
  const { watchVideos, last_id, new_items } = useSelector((state) => state.watchVideos);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setLoadingSkeleton(true);

    dispatch({
      type: "RESET_LIST_VIDEOS",
    });
    await dispatch(
      getListVideos(
        defaultInCampaign,
        defaultCampaignId,
        latitude,
        longitude,
        defaultLastId,
        defaultIndex,
        defaultCount,
      ),
    );
    setRefreshing(false);
    setLoadingSkeleton(false);
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const flatListHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (contentHeight - scrollY - flatListHeight <= 100) {
      if (new_items !== 0 && !loadingVideos) {
        dispatch(
          getListVideos(
            defaultInCampaign,
            defaultCampaignId,
            latitude,
            longitude,
            last_id,
            defaultIndex,
            defaultCount,
          ),
        );
      }
    }
  };

  const renderItem = ({ item }) => {
    return <DarkBackgroundVideoItem watchData={item} />;
  };

  if (loadingSkeleton)
    return (
      <View style={{ marginTop: 40 }}>
        <LoadingVideoSkeleton />
        <LoadingVideoSkeleton />
      </View>
    );

  return (
    <FlatList
      data={watchVideos}
      ref={flatListRef}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      initialNumToRender={5}
      maxToRenderPerBatch={2}
      windowSize={2}
      removeClippedSubviews={true}
      bounces={false}
      style={styles.videosWrapper}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#1877f2"]} />
      }
    />
  );
};

export default DarkBackGroundVideos;

const styles = StyleSheet.create({
  videosWrapper: {
    backgroundColor: "#424345",
    marginTop: 50,
  },
});
