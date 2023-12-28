import { setting } from "../../api/setting";
import { user } from "../../api/user";

export const getUserInfo = (userId) => async (dispatch) => {
  try {
    const res = await user.getUserInfo(userId);
    dispatch({
      type: "GET_USER_INFO",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const setUserInfo = (formData) => async (dispatch) => {
  try {
    const res = await user.setUserInfo(formData);
    dispatch({
      type: "SET_USER_INFO",
      payload: res.data.data,
    });
    dispatch({
      type: "CHANGE_PROFILE_AFTER_SIGNUP",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getRequestedFriend = (index, count) => async (dispatch) => {
  try {
    const res = await user.getRequestedFriend(index, count);
    dispatch({
      type: "GET_REQUESTED_FRIENDS",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getSuggestedFriend = (index, count) => async (dispatch) => {
  try {
    const res = await user.getSuggestedFriend(index, count);
    dispatch({
      type: "GET_RECOMMEND_FRIENDS",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getMoreSuggestedFriend = (index, count) => async (dispatch) => {
  try {
    dispatch({
      type: "ALERT",
      payload: { loadingSuggestFriends: true },
    });
    const res = await user.getSuggestedFriend(index, count);
    dispatch({
      type: "GET_MORE_RECOMMEND_FRIENDS",
      payload: res.data.data,
    });
    dispatch({
      type: "ALERT",
      payload: { loadingSuggestFriends: false },
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getUserFriends = (userId, index, count) => async (dispatch) => {
  try {
    const res = await user.getUserFriends(userId, index, count);
    dispatch({
      type: "GET_LIST_USER_FRIENDS",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getUserXFriends = (userId, index, count) => async (dispatch) => {
  try {
    const res = await user.getUserFriends(userId, index, count);
    dispatch({
      type: "GET_LIST_USERX_FRIENDS",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const buyCoins = (code, coins) => async (dispatch) => {
  try {
    const res = await setting.buyCoins(code, coins);
    dispatch({
      type: "SET_USER_COINS",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};
