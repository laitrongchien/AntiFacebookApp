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

const setRequestFriend = async (userId) => {
  return await axios.post("/set_request_friend", {
    user_id: userId,
  });
};

const delRequestFriend = async (userId) => {
  return await axios.post("/del_request_friend", {
    user_id: userId,
  });
};

const setAcceptFriend = async (userId, isAccept) => {
  try {
    const res = await axios.post("/set_accept_friend", {
      user_id: userId,
      is_accept: isAccept,
    });
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const getSuggestedFriend = async (index, count) => {
  return await axios.post("/get_suggested_friends", {
    index,
    count,
  });
};

const getUserFriends = async (userId, index, count) => {
  return await axios.post("/get_user_friends", {
    user_id: userId,
    index,
    count,
  });
};

export const user = {
  getUserInfo,
  setUserInfo,
  getRequestedFriend,
  getSuggestedFriend,
  setRequestFriend,
  setAcceptFriend,
  delRequestFriend,
  getUserFriends,
};
