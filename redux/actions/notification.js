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
