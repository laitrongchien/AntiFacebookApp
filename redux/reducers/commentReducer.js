const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return action.payload;
    case "RESET_STATE":
      return {};
    default:
      return state;
  }
};

export default commentReducer;
