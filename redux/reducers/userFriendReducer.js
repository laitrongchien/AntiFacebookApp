const initialState = { friends: [], total: undefined };

const userFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_USER_FRIENDS":
      const { friends, total } = action.payload;
      return {
        friends: friends,
        total: total,
      };
    case "RESET_USER_FRIENDS":
      return initialState;
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default userFriendReducer;
