import axios from "./axios";

const getListVideos = async (
  inCampaign,
  campaignId,
  latitude,
  longitude,
  lastId,
  index,
  count
) => {
  return await axios.post("/get_list_videos", {
    in_campaign: inCampaign,
    campaign_id: campaignId,
    latitude,
    longitude,
    last_id: lastId,
    index,
    count,
  });
};

export const video = { getListVideos };
