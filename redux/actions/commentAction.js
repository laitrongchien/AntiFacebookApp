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
