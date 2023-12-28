const initialState = {
  playingId: undefined,
  isPlaying: false,
};

const videoControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WATCHING_VIDEO":
      const { playingId, isPlaying } = action.payload;
      return {
        playingId: playingId,
        isPlaying: isPlaying,
      };
    // case "SET_IS_WATCHING":
    //   const { isFocused } = action.payload;
    //   return {
    //     ...state,
    //     isPlaying: isFocused,
    //   };
    case "RESET_WATCHING_STATUS":
      return initialState;
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default videoControlReducer;
