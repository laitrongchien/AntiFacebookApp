const initialState = {
  recommendFriends: [],
  requestedFriends: { requests: [], total: 0 },
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_REQUESTED_FRIENDS":
      return {
        ...state,
        requestedFriends: {
          requests: action.payload.requests,
          total: action.payload.total,
        },
      };
    case "GET_RECOMMEND_FRIENDS":
      return { ...state, recommendFriends: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default friendReducer;
