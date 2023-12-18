import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useState, useEffect, useRef } from "react";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { getListVideos } from "../../redux/actions/watchVideosAction";
import WatchItem from "../../components/Watch/WatchItem";
import LoadingVideoSkeleton from "../../components/Loading/LoadingVideoSkeleton";
import { useScrollToTop, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setWatchingVideo } from "../../redux/actions/videoControlAction";

const ListHeaderComponent = () => {
  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>Video</Text>
      <View style={styles.iconWrap}>
        <ExTouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={{ ...styles.btnSearch, marginRight: 8 }}
        >
          <VectorIcon
            name="user-alt"
            type="FontAwesome5"
            size={19}
            color="#000"
          />
        </ExTouchableOpacity>
        <ExTouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.btnSearch}
        >
          <VectorIcon
            name="search"
            type="FontAwesome5"
            size={19}
            color="#000"
          />
        </ExTouchableOpacity>
      </View>
    </View>
  );
};

const WatchScreen = () => {
  const dispatch = useDispatch();
  const { watchVideos, last_id, new_items } = useSelector(
    (state) => state.watchVideos
  );
  const { loadingVideos } = useSelector((state) => state.alert);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialLoad, setInitialLoad] = useState(false);
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);
  const isFocused = useIsFocused();

  const defaultInCampaign = 1;
  const defaultCampaignId = 1;
  const latitude = 20.0;
  const longitude = 105.0;
  const defaultLastId = 0;
  const defaultIndex = 0;
  const defaultCount = 20;

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
        defaultCount
      )
    );
    setRefreshing(false);
    setLoadingSkeleton(false);
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const flatListHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (contentHeight - scrollY - flatListHeight <= 1000) {
      if (new_items != 0 && !loadingVideos) {
        dispatch(
          getListVideos(
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

    const index = scrollY - 72 < 0 ? 0 : Math.round((scrollY - 72) / 510);
    // console.log(index);
    if (index != currentIndex) {
      // console.log(watchVideos[index].id);
      dispatch(setWatchingVideo(watchVideos[index]?.id, true));
      setCurrentIndex(index);
    }
  };

  // const onViewableItemsChanged = useRef(({ viewableItems }) => {
  //   if (viewableItems.length > 0) {
  //     const newIndex = viewableItems[0].index;
  //     setCurrentIndex(newIndex);
  //     dispatch(setWatchingVideo(watchVideos[newIndex].id, isFocused));
  //   }
  // });

  const renderItem = ({ item }) => {
    return <WatchItem watchData={item} />;
  };

  useEffect(() => {
    console.log("mount");
    const handleGetListVideos = async () => {
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
          defaultCount
        )
      );
      setLoadingSkeleton(false);
      setInitialLoad(true);
    };
    handleGetListVideos();
  }, []);

  useEffect(() => {
    if (initialLoad)
      dispatch(setWatchingVideo(watchVideos[currentIndex]?.id, isFocused));
  }, [initialLoad, isFocused]);

  if (loadingSkeleton)
    return (
      <>
        <ListHeaderComponent />
        <LoadingVideoSkeleton />
        <LoadingVideoSkeleton />
      </>
    );

  return (
    <FlatList
      data={watchVideos}
      ref={flatListRef}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={2}
      bounces={false}
      ListHeaderComponent={() => (
        <>
          <ListHeaderComponent />
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
    width: "100%",
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBlockColor: "#ddd",
    backgroundColor: "#fff",
  },
  btnSearch: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userWrapper: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 12,
  },
  allShortcut: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
  },
  shortcut: {
    backgroundColor: "#fff",
    height: 80,
    paddingHorizontal: 15,
    flexBasis: "48%",
    justifyContent: "center",
    borderRadius: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  btnOption: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
});

export default WatchScreen;
