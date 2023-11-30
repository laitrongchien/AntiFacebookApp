const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_INFO":
      return action.payload;
    case "SET_USER_INFO":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
