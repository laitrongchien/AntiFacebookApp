export const setWatchingVideo = (playingId, isPlaying) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_WATCHING_VIDEO",
      payload: { playingId, isPlaying },
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

// export const setIsWatching = (isFocused) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "SET_IS_WATCHING",
//       payload: { isFocused },
//     });
//   } catch (err) {
//     console.log(err.response.data.message);
//   }
// };
