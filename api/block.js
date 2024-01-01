import axios from "./axios";

const set_block = async (user_id) => {
  try {
    const response = await axios.post("/set_block", {
      user_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error in block API:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const unblock = async (user_id) => {
  try {
    const response = await axios.post("/unblock", {
      user_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error in Unblock API:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const get_list_blocks = async (index, count) => {
  try {
    const response = await axios.post("/get_list_blocks", {
      index: index,
      count: count,
    });
    return response.data;
  } catch (error) {
    console.log("Error in Get List Post API", error);
  }
};

const blockApi = {
  set_block,
  get_list_blocks,
  unblock,
};

export default blockApi;
