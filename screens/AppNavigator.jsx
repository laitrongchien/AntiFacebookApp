import { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { navigationRef } from "../rootNavigation";
import LoginScreen from "./LoginScreen";
import StartRegisterScreen from "./Register/StartRegisterScreen";
import MainScreen from "./MainScreen";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import PostDetailScreen from "./PostDetailScreen";
import Search from "./Search";
import ProfileScreen from "./ProfileTab";
import UserXProfileScreen from "./ProfileTab/UserXProfile";
import ProfileSetting from "./ProfileTab/ProfileSetting";
import EditProfile from "./ProfileTab/EditProfile";
import EditDetailInfo from "./ProfileTab/EditDetailInfo";
import FullNameScreen from "./Register/FullNameScreen";
import ChangeAvatarScreen from "./Register/ChangeAvatarScreen";
import DateOfBirthScreen from "./Register/DateOfBirthScreen";
import GenderScreen from "./Register/GenderScreen";
import EmailScreen from "./Register/EmailScreen";
import PasswordScreen from "./Register/PasswordScreen";
import PolicyScreen from "./Register/PolicyScreen";
import AvatarOptions from "./ProfileTab/AvartarOptions";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase/config";
import AllRequest from "./FriendTab/AllRequest";
import AllFriend from "./FriendTab/AllFriend";
import AddFriendRequest from "../components/Friend/AddFriendRequest";
import WatchDetailList from "./WatchTab/WatchDetailList";
import VerifyScreen from "./Register/VerifyScreen";
import EmailResetScreen from "./ResetPassword/EmailResetScreen";
import VerifyCodeResetScreen from "./ResetPassword/VerifyCodeResetScreen";
import NewPasswordScreen from "./ResetPassword/NewPasswordScreen";
// import { getUserInfo } from "../redux/actions/userAction";

const Stack = createStackNavigator();

const AppNavigator = () => {
  // const [user, setUser] = useState(null);
  const { id, token, username, avatar } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const navigationOptions = {
    headerShown: false,
    gestureResponseDistance: 800,
  };

  // useEffect(() => {
  //   dispatch(getUserInfo(id));
  // }, []);

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
            {!username && (
              <Stack.Screen name="FullNameScreen" component={FullNameScreen} />
            )}
            {!avatar && (
              <Stack.Screen
                name="ChangeAvatarScreen"
                component={ChangeAvatarScreen}
              />
            )}

            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
            <Stack.Screen name="EditPost" component={EditPost} />
            <Stack.Screen
              name="PostDetailScreen"
              component={PostDetailScreen}
            />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
              name="UserXProfileScreen"
              component={UserXProfileScreen}
            />
            <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="EditDetailInfo" component={EditDetailInfo} />
            <Stack.Screen
              options={{ cardStyle: { backgroundColor: "transparent" } }}
              name="AvatarOptions"
              component={AvatarOptions}
            />
            <Stack.Screen
              name="AddFriendRequest"
              component={AddFriendRequest}
            />
            <Stack.Screen name="AllRequest" component={AllRequest} />
            <Stack.Screen name="AllFriend" component={AllFriend} />
            <Stack.Screen name="WatchDetailList" component={WatchDetailList} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="StartRegisterScreen"
              component={StartRegisterScreen}
            />
            <Stack.Screen
              name="DateOfBirthScreen"
              component={DateOfBirthScreen}
            />
            <Stack.Screen name="GenderScreen" component={GenderScreen} />
            <Stack.Screen name="EmailScreen" component={EmailScreen} />
            <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
            <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
            <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
            <Stack.Screen
              name="EmailResetScreen"
              component={EmailResetScreen}
            />
            <Stack.Screen
              name="VerifyCodeResetScreen"
              component={VerifyCodeResetScreen}
            />
            <Stack.Screen
              name="NewPasswordScreen"
              component={NewPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
