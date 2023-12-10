const initialState = { post: [], last_id: undefined, new_items: undefined };

const userPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_USER_POSTS":
      const { post, last_id, new_items } = action.payload;
      return {
        post: post,
        last_id: last_id,
        new_items: new_items,
      };
    case "RESET_USER_POSTS":
      return initialState;
    case "CREATE_USER_POST":
      return {
        ...state,
        post: [action.payload, ...state.post],
      };
    case "EDIT_USER_POST":
      return {
        ...state,
        post: state.post.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "DELETE_USER_POST":
      return {
        ...state,
        post: state.post.filter((item) => item.id !== action.payload),
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default userPostReducer;
