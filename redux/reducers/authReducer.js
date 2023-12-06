const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;
    case "CHANGE_PROFILE_AFTER_SIGNUP":
      return { ...state, ...action.payload };
    case "RESET_STATE":
      return {};
    default:
      return state;
  }
};

export default authReducer;
