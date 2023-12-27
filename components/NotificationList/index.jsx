import { FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { getNotifications } from "../../redux/actions/notification";
import { useSelector, useDispatch } from "react-redux";

const NotificationList = () => {
  const defaultIndex = 0;
  const defaultCount = 20;

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.notification);

  const renderItem = ({ item }) => {
    return <NotificationItem notificationData={item} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch({
      type: "RESET_NOTIFICATIONS",
    });
    dispatch(getNotifications(defaultIndex, defaultCount));
    setRefreshing(false);
  };

  useEffect(() => {
    const handleGetListNotification = async () => {
      dispatch({
        type: "RESET_NOTIFICATIONS",
      });
      console.log("mount Noti");
      dispatch(getNotifications(defaultIndex, defaultCount));
    };
    handleGetListNotification();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.notification_id}
      renderItem={renderItem}
      bounces={false}
      showsVerticalScrollIndicator={false}
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

export default NotificationList;
