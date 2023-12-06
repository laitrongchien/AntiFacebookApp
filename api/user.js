import axios from "./axios";

const getUserInfo = async (userId) => {
  try {
    return await axios.post("/get_user_info", {
      user_id: userId,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const setUserInfo = async (formData) => {
  try {
    const res = await axios.post("/set_user_info", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const getRequestedFriend = async (index, count) => {
  return await axios.post("/get_requested_friends", {
    index,
    count,
  });
};

const getSuggestedFriend = async (index, count) => {
  return await axios.post("/get_suggested_friends", {
    index,
    count,
  });
};

export const user = {
  getUserInfo,
  setUserInfo,
  getRequestedFriend,
  getSuggestedFriend,
};
