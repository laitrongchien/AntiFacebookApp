const initialState = {
  newFriends: undefined,
  newVideos: undefined,
};

const newItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NEW_FRIEND_ITEMS":
      return {
        ...state,
        newFriends: action.payload,
      };
    case "GET_NEW_VIDEO_ITEMS":
      return {
        ...state,
        newVideos: action.payload,
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default newItemsReducer;
