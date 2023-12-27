const initialState = { post: [], last_id: undefined, new_items: undefined };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_POSTS":
      const { post, last_id, new_items } = action.payload;
      return {
        post: [...state.post, ...post],
        // post: post,
        last_id,
        new_items,
      };
    case "CREATE_POST":
      return {
        post: [action.payload, ...state.post],
        last_id: state.last_id,
        new_items: state.new_items,
      };
    case "EDIT_POST":
      return {
        ...state,
        post: state.post.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case "DELETE_POST":
      return {
        ...state,
        post: state.post.filter((item) => item.id !== action.payload),
      };
    case "FEEL_POST":
      return {
        ...state,
        post: state.post.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case "DELETE_FEEL":
      return {
        ...state,
        post: state.post.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case "COMMENT_POST":
      return {
        ...state,
        post: state.post.map((item) =>
          item.id === action.payload
            ? { ...item, comment_mark: parseInt(item.comment_mark) + 1 }
            : item,
        ),
      };
    case "RESET_LIST_POSTS":
      return initialState;
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default postReducer;
