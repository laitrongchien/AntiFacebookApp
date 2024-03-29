import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";

import AllFeel from "./AllFeel";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import AllFriend from "./FriendTab/AllFriend";
import AllRecommend from "./FriendTab/AllRecommend";
import AllRequest from "./FriendTab/AllRequest";
import AllXFriend from "./FriendTab/AllXFriend";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen";
import BlockList from "./MenuTab/BlockList";
import PostDetailScreen from "./PostDetailScreen";
import PostListViewScreen from "./PostListViewScreen";
import ProfileScreen from "./ProfileTab";
import AvatarOptions from "./ProfileTab/AvartarOptions";
import CreateAvatar from "./ProfileTab/CreateAvatar";
import CreateCover from "./ProfileTab/CreateCover";
import EditDetailInfo from "./ProfileTab/EditDetailInfo";
import EditProfile from "./ProfileTab/EditProfile";
import ProfileSetting from "./ProfileTab/ProfileSetting";
import UserXProfileScreen from "./ProfileTab/UserXProfile";
import UserXProfileSetting from "./ProfileTab/UserXProfileSetting";
import ChangeAvatarScreen from "./Register/ChangeAvatarScreen";
import DateOfBirthScreen from "./Register/DateOfBirthScreen";
import EmailScreen from "./Register/EmailScreen";
import FullNameScreen from "./Register/FullNameScreen";
import GenderScreen from "./Register/GenderScreen";
import PasswordScreen from "./Register/PasswordScreen";
import PolicyScreen from "./Register/PolicyScreen";
import StartRegisterScreen from "./Register/StartRegisterScreen";
import VerifyScreen from "./Register/VerifyScreen";
import ReportConfirmScreen from "./ReportPost/ReportConfirmScreen";
import ReportDetailScreen from "./ReportPost/ReportDetailScreen";
import ReportPostScreen from "./ReportPost/ReportPostScreen";
import ReportResultScreen from "./ReportPost/ReportResultScreen";
import EmailResetScreen from "./ResetPassword/EmailResetScreen";
import NewPasswordScreen from "./ResetPassword/NewPasswordScreen";
import VerifyCodeResetScreen from "./ResetPassword/VerifyCodeResetScreen";
import Search from "./Search";
import AllSavedSearch from "./Search/AllSavedSearch";
import SearchResult from "./Search/SearchResult";
import ViewAllUserItem from "./Search/ViewAllUserItem";
import BuyCoinScreen from "./Setting/BuyCoinScreen";
import ChangePassScreen from "./Setting/ChangePassScreen";
import ConfirmRestoreScreen from "./Setting/ConfirmRestoreScreen";
import RestoreEmailScreen from "./Setting/RestoreEmailScreen";
import SettingScreen from "./Setting/SettingScreen";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase/config";
import WatchDetailList from "./WatchTab/WatchDetailList";
import AddFriendRequest from "../components/Friend/AddFriendRequest";
import { navigationRef } from "../rootNavigation";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { id, token, username, avatar } = useSelector((state) => state.auth);

  const navigationOptions = {
    headerShown: false,
    gestureResponseDistance: 800,
  };

  // useEffect(() => {
  //   const getCacheToken = async () => {
  //     const cacheToken = await getCacheStorage("access-token");
  //     setCacheToken(cacheToken);
  //   };
  //   getCacheToken();
  // }, []);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setUser(user);
  //   } else {
  //     setUser(null);
  //   }
  // });

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Navigator screenOptions={navigationOptions}>
        {token ? (
          <>
            {!username && <Stack.Screen name="FullNameScreen" component={FullNameScreen} />}
            {!avatar && <Stack.Screen name="ChangeAvatarScreen" component={ChangeAvatarScreen} />}

            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
            <Stack.Screen name="EditPost" component={EditPost} />
            <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
            <Stack.Screen name="PostListViewScreen" component={PostListViewScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SearchResult" component={SearchResult} />
            <Stack.Screen name="ViewAllUserItem" component={ViewAllUserItem} />
            <Stack.Screen name="AllSavedSearch" component={AllSavedSearch} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="UserXProfileScreen" component={UserXProfileScreen} />
            <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
            <Stack.Screen name="UserXProfileSetting" component={UserXProfileSetting} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="EditDetailInfo" component={EditDetailInfo} />
            <Stack.Screen name="CreateAvatar" component={CreateAvatar} />
            <Stack.Screen name="CreateCover" component={CreateCover} />
            <Stack.Screen name="ReportPostScreen" component={ReportPostScreen} />
            <Stack.Screen name="ReportDetailScreen" component={ReportDetailScreen} />
            <Stack.Screen name="ReportConfirmScreen" component={ReportConfirmScreen} />
            <Stack.Screen name="ReportResultScreen" component={ReportResultScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
            <Stack.Screen name="BuyCoinScreen" component={BuyCoinScreen} />
            <Stack.Screen name="RestoreEmailScreen" component={RestoreEmailScreen} />
            <Stack.Screen name="ConfirmRestoreScreen" component={ConfirmRestoreScreen} />
            <Stack.Screen
              options={{ cardStyle: { backgroundColor: "transparent" } }}
              name="AvatarOptions"
              component={AvatarOptions}
            />
            <Stack.Screen name="AddFriendRequest" component={AddFriendRequest} />
            <Stack.Screen name="AllRequest" component={AllRequest} />
            <Stack.Screen name="AllRecommend" component={AllRecommend} />
            <Stack.Screen name="AllFriend" component={AllFriend} />
            <Stack.Screen name="AllXFriend" component={AllXFriend} />
            <Stack.Screen name="AllFeel" component={AllFeel} />
            <Stack.Screen name="WatchDetailList" component={WatchDetailList} />
            <Stack.Screen name="BlockList" component={BlockList} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="StartRegisterScreen" component={StartRegisterScreen} />
            <Stack.Screen name="DateOfBirthScreen" component={DateOfBirthScreen} />
            <Stack.Screen name="GenderScreen" component={GenderScreen} />
            <Stack.Screen name="EmailScreen" component={EmailScreen} />
            <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
            <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
            <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
            <Stack.Screen name="EmailResetScreen" component={EmailResetScreen} />
            <Stack.Screen name="VerifyCodeResetScreen" component={VerifyCodeResetScreen} />
            <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
