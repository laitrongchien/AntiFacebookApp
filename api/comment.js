import axios from "./axios";

const getMarkComment = async (id, index, count) => {
  return await axios.post("/get_mark_comment", { id, index, count });
};

export const comment = { getMarkComment };
