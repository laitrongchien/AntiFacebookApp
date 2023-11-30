const postReducer = (
  state = { post: [], last_id: undefined, new_items: undefined },
  action
) => {
  switch (action.type) {
    case "GET_LIST_POSTS":
      const { post, last_id, new_items } = action.payload;
      return {
        post: [...state.post, ...post],
        last_id: last_id,
        new_items: new_items,
      };
    case "REMOVE_LIST_POSTS":
      return action.payload;
    default:
      return state;
  }
};

export default postReducer;
