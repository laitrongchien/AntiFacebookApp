import { combineReducers } from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import post from "./postReducer";
import alert from "./alertReducer";
import comments from "./commentReducer";
import friend from "./friendReducer";
import userPost from "./userPostReducer";
import userFriend from "./userFriendReducer";
import userXFriend from "./userXFriendReducer";
import watchVideos from "./watchVideosReducer";
import videoControl from "./videoControlReducer";
import notification from "./notificationReducer";
import newItems from "./newItemsReducer";

export default combineReducers({
  auth,
  user,
  post,
  alert,
  comments,
  friend,
  userPost,
  userFriend,
  userXFriend,
  watchVideos,
  videoControl,
  notification,
  newItems,
});
