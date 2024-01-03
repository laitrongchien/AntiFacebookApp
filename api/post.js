import axios from "./axios";

const getListPosts = async (inCampaign, campaignId, latitude, longitude, lastId, index, count) => {
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
  count,
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

const reportPost = async (postId, reportSubject, reportDetail) => {
  return await axios.post("/report_post", {
    id: postId,
    subject: reportSubject,
    details: reportDetail,
  });
};

const feelPost = async (postId, type) => {
  return await axios.post("/feel", {
    id: postId,
    type: type,
  });
};

const deleteFeel = async (postId) => {
  return await axios.post("/delete_feel", {
    id: postId,
  });
};

const getListFeels = async (postId, index, count) => {
  return await axios.post("/get_list_feels", {
    id: postId,
    index,
    count,
  });
};

export const post = {
  getListPosts,
  getPost,
  createPost,
  deletePost,
  reportPost,
  getListUserPosts,
  editPost,
  feelPost,
  deleteFeel,
  getListFeels,
};
