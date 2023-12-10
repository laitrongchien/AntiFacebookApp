import { video } from "../../api/video";

export const getListVideos =
  (inCampaign, campaignId, latitude, longitude, lastId, index, count) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "ALERT",
        payload: { loadingVideos: true },
      });
      const res = await video.getListVideos(
        inCampaign,
        campaignId,
        latitude,
        longitude,
        lastId,
        index,
        count
      );
      dispatch({
        type: "GET_LIST_VIDEOS",
        payload: res?.data?.data,
      });
      dispatch({
        type: "ALERT",
        payload: { loadingVideos: false },
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
