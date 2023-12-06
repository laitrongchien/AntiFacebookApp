import { post } from "../../api/post";

export const getListPosts =
  (inCampaign, campaignId, latitude, longitude, lastId, index, count) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "ALERT",
        payload: { loading: true },
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
        payload: { loading: false },
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
