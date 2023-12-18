import { post } from "../../api/post";

export const getListPosts =
  (inCampaign, campaignId, latitude, longitude, lastId, index, count) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "ALERT",
        payload: { loadingPosts: true },
      });
      const res = await post.getListPosts(
        inCampaign,
        campaignId,
        latitude,
        longitude,
        lastId,
        index,
        count
      );
      dispatch({
        type: "GET_LIST_POSTS",
        payload: res?.data?.data,
      });
      dispatch({
        type: "ALERT",
        payload: { loadingPosts: false },
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

export const createPost = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "ALERT",
      payload: { loadingPostCreated: true },
    });

    const res = await post.createPost(formData);

    const newPost = await post.getPost(res?.data?.data?.id);
    console.log(newPost);
    dispatch({
      type: "CREATE_POST",
      payload: newPost?.data?.data,
    });
    dispatch({
      type: "CREATE_USER_POST",
      payload: newPost?.data?.data,
    });
    dispatch({
      type: "SET_USER_COINS",
      payload: res?.data?.data,
    });
    dispatch({
      type: "ALERT",
      payload: { loadingPostCreated: false },
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const editPost = (formData) => async (dispatch) => {
  try {
    const res = await post.editPost(formData);

    const editPost = await post.getPost(res?.data?.data?.id);
    dispatch({
      type: "EDIT_POST",
      payload: editPost?.data?.data,
    });
    dispatch({
      type: "EDIT_USER_POST",
      payload: editPost?.data?.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await post.deletePost(postId);
    dispatch({
      type: "DELETE_POST",
      payload: postId,
    });
    dispatch({
      type: "DELETE_USER_POST",
      payload: postId,
    });
    dispatch({
      type: "SET_USER_COINS",
      payload: res?.data?.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getListUserPosts =
  (userId, inCampaign, campaignId, latitude, longitude, lastId, index, count) =>
  async (dispatch) => {
    try {
      const res = await post.getListUserPosts(
        userId,
        inCampaign,
        campaignId,
        latitude,
        longitude,
        lastId,
        index,
        count
      );
      dispatch({
        type: "GET_LIST_USER_POSTS",
        payload: res?.data?.data,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

export const feelPost = (postId, type) => async (dispatch) => {
  try {
    const res = await post.feelPost(postId, type);

    dispatch({
      type: "FEEL_POST",
      payload: postId,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const deleteFeel = (postId) => async (dispatch) => {
  try {
    const res = await post.deleteFeel(postId);

    dispatch({
      type: "DELETE_FEEL",
      payload: postId,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};
