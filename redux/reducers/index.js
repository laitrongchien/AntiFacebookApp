import { combineReducers } from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import post from "./postReducer";
import alert from "./alertReducer";

export default combineReducers({
  auth,
  user,
  post,
  alert,
});
