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
