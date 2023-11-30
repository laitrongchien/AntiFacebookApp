import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
export const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
export const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
export const STATUSBAR_HEIGHT = getStatusBarHeight();
export const BASE_URL = "https://it4788.catan.io.vn";

export const FIXED_STATUSBAR_HEIGHT = 44;
