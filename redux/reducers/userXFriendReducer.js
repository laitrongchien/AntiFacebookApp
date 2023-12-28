const initialState = { friends: [], total: undefined };

const userXFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_USERX_FRIENDS":
      const { friends, total } = action.payload;
      return {
        friends: friends,
        total: total,
      };
    case "RESET_USERX_FRIENDS":
      return initialState;
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default userXFriendReducer;
