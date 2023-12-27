import { comment } from "../../api/comment";

export const getComments = (id, index, count) => async (dispatch) => {
  try {
    const res = await comment.getMarkComment(id, index, count);
    dispatch({
      type: "GET_COMMENTS",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const createMark =
  (id, content, index, count, type) => async (dispatch) => {
    try {
      const res = await comment.createMark(id, content, index, count, type);
      dispatch({
        type: "CREATE_MARK",
        payload: res.data.data,
      });
      dispatch({
        type: "SET_USER_COINS",
        payload: res?.data,
      });
      dispatch({
        type: "COMMENT_POST",
        payload: id,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

export const createCommentMark =
  (id, content, index, count, markId) => async (dispatch) => {
    try {
      console.log(markId);
      const res = await comment.createCommentMark(
        id,
        content,
        index,
        count,
        markId
      );
      // console.log(res);
      dispatch({
        type: "CREATE_MARK",
        payload: res.data.data,
      });
      dispatch({
        type: "COMMENT_POST",
        payload: id,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
