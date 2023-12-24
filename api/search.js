import axios from "./axios";

const search = async (keyword, user_id, index, count) => {
  try {
    const response = await axios.post("/search", {
      keyword: keyword,
      user_id: user_id,
      index: index,
      count: count,
    });
    return response.data;
  } catch (error) {
    console.error("Error in search API:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const search_user = async (keyword, index, count) => {
  try {
    const response = await axios.post("/search_user", {
      keyword: keyword,
      index: index,
      count: count,
    });
    return response.data;
  } catch (error) {
    console.error("Error in search_user API:", error);
    throw error;
  }
};

const get_saved_search = async (index, count) => {
  try {
    const response = await axios.post("/get_saved_search", {
      index: index,
      count: count,
    });
    return response.data;
  } catch (error) {
    console.error("Error in get_saved_search API:", error);
    throw error;
  }
};

const del_saved_search = async (search_id, all) => {
  try {
    const response = await axios.post("/del_saved_search", {
      search_id: search_id,
      all: all,
    });
    return response.data;
  } catch (error) {
    console.error("Error in del_saved_search API:", error);
    throw error;
  }
};

const SearchApi = {
  search,
  search_user,
  get_saved_search,
  del_saved_search,
};

export default SearchApi;
