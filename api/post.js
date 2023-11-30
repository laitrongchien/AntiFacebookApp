import axios from "./axios";

const getListPosts = async (
  userId,
  inCampaign,
  campaignId,
  latitude,
  longitude,
  lastId,
  index,
  count
) => {
  try {
    const res = await axios.post("/get_list_posts", {
      user_id: userId,
      in_campaign: inCampaign,
      campaign_id: campaignId,
      latitude,
      longitude,
      last_id: lastId,
      index,
      count,
    });
    // console.log(res.data.data);
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const post = { getListPosts };
