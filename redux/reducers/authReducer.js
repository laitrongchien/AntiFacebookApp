const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;
    case "CHANGE_PROFILE_AFTER_SIGNUP":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default authReducer;
