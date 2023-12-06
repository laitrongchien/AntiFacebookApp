import { auth } from "../../api/auth";
import { getUserInfo } from "./userAction";
export const login = (email, password, device_id) => async (dispatch) => {
  try {
    dispatch({ type: "ALERT", payload: { loading: true } });
    const res = await auth.login(email, password, device_id);
    // console.log(res.data.data);

    dispatch({
      type: "AUTH",
      payload: res?.data?.data,
    });
    dispatch(getUserInfo(res?.data?.data?.id));
    dispatch({ type: "ALERT", payload: { loading: false } });
  } catch (err) {
    dispatch({ type: "ALERT", payload: { error: err.response.data.message } });
  }
};

export const changeProfileAfterSignup = (formData) => async (dispatch) => {
  try {
    const res = await auth.changeProfileAfterSignup(formData);
    dispatch({
      type: "CHANGE_PROFILE_AFTER_SIGNUP",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const logout = () => async (dispatch) => {
  await auth.logout();
  dispatch({
    type: "RESET_STATE",
  });
  // dispatch({
  //   type: "GET_USER_INFO",
  //   payload: {},
  // });
  // dispatch({
  //   type: "REMOVE_LIST_POSTS",
  //   payload: { post: [], last_id: undefined, new_items: undefined },
  // });
};
