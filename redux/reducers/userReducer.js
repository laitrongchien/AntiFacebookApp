const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_INFO":
      return action.payload;
    case "SET_USER_INFO":
      return { ...state, ...action.payload };
    case "RESET_STATE":
      return {};
    default:
      return state;
  }
};

export default userReducer;
