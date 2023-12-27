import { setting } from "../../api/setting";
import { user } from "../../api/user";

export const getNotifications = (index, count) => async (dispatch) => {
  try {
    const res = await user.getNotification(index, count);
    dispatch({
      type: "GET_NOTIFICATIONS",
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const checkNewFriendItems = (lastId, categoryId) => async (dispatch) => {
  try {
    const res = await setting.checkNewItems(lastId, categoryId);
    dispatch({
      type: "GET_NEW_FRIEND_ITEMS",
      payload: res.data.data.new_items,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const checkNewVideoItems = (lastId, categoryId) => async (dispatch) => {
  try {
    const res = await setting.checkNewItems(lastId, categoryId);
    dispatch({
      type: "GET_NEW_VIDEO_ITEMS",
      payload: res.data.data.new_items,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};
