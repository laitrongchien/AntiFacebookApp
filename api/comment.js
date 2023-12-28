import axios from "./axios";

const getMarkComment = async (id, index, count) => {
  return await axios.post("/get_mark_comment", { id, index, count });
};

const createMark = async (id, content, index, count, type) => {
  return await axios.post("/set_mark_comment", {
    id,
    content,
    index,
    count,
    type,
  });
};

const createCommentMark = async (id, content, index, count, markId) => {
  return await axios.post("/set_mark_comment", {
    id,
    content,
    index,
    count,
    mark_id: markId,
  });
};

export const comment = { getMarkComment, createMark, createCommentMark };
