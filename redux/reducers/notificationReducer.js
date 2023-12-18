const initialState = {
  data: [],
  last_update: undefined,
  badge: 0,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS":
      const { data, last_update, badge } = action.payload;
      return {
        data: [...state.data, ...data],
        last_update: last_update,
        badge: badge,
      };
    case "RESET_NOTIFICATIONS":
      return initialState;
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
