import axios from "./axios";

const getListPosts = async (
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

const getListUserPosts = async (
  userId,
  inCampaign,
  campaignId,
  latitude,
  longitude,
  lastId,
  index,
  count
) => {
  return await axios.post("/get_list_posts", {
    user_id: userId,
    in_campaign: inCampaign,
    campaign_id: campaignId,
    latitude,
    longitude,
    last_id: lastId,
    index,
    count,
  });
};

const getPost = async (id) => {
  return await axios.post("/get_post", { id });
};

const createPost = async (formData) => {
  const res = await axios.post("/add_post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // console.log(res);
  return res;
};

const editPost = async (formData) => {
  const res = await axios.post("/edit_post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

const deletePost = async (id) => {
  return await axios.post("/delete_post", { id });
};

export const post = {
  getListPosts,
  getPost,
  createPost,
  deletePost,
  getListUserPosts,
  editPost,
};
