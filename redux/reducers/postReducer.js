const initialState = { post: [], last_id: undefined, new_items: undefined };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_POSTS":
      const { post, last_id, new_items } = action.payload;
      return {
        post: [...state.post, ...post],
        last_id: last_id,
        new_items: new_items,
      };
    case "REMOVE_LIST_POSTS":
      return initialState;
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default postReducer;
