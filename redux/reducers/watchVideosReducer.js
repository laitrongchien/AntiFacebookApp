const initialState = {
  watchVideos: [],
  last_id: undefined,
  new_items: undefined,
};

const watchVideosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_VIDEOS":
      const { post, last_id, new_items } = action.payload;
      return {
        watchVideos: [...state.watchVideos, ...post],
        last_id: last_id,
        new_items: new_items,
      };
    case "RESET_LIST_VIDEOS":
      return initialState;
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default watchVideosReducer;
