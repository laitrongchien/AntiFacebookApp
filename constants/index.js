import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
export const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
export const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
export const STATUSBAR_HEIGHT = getStatusBarHeight();
// export const BASE_URL = "http://192.168.1.3:3000";

export const FIXED_STATUSBAR_HEIGHT = 44;
