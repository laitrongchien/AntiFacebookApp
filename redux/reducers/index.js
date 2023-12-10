import { combineReducers } from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import post from "./postReducer";
import alert from "./alertReducer";
import comments from "./commentReducer";
import friend from "./friendReducer";
import userPost from "./userPostReducer";
import userFriend from "./userFriendReducer";
import watchVideos from "./watchVideosReducer";
import videoControl from "./videoControlReducer";

export default combineReducers({
  auth,
  user,
  post,
  alert,
  comments,
  friend,
  userPost,
  userFriend,
  watchVideos,
  videoControl,
});
