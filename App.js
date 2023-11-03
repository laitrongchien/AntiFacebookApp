import * as React from "react";
import { StatusBar, SafeAreaView } from "react-native";
// import { Provider } from "react-redux";
// import store from "./redux/store";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./rootNavigation";
import LoginScreen from "./screens/LoginScreen";
import StartRegisterScreen from "./screens/Register/StartRegisterScreen";
import MainScreen from "./screens/MainScreen";
import CreatePost from "./screens/CreatePost";
import Search from "./screens/Search";
import ProfileScreen from "./screens/ProfileTab";
import FullNameScreen from "./screens/Register/FullNameScreen";
import DateOfBirthScreen from "./screens/Register/DateOfBirthScreen";
import GenderScreen from "./screens/Register/GenderScreen";
import EmailScreen from "./screens/Register/EmailScreen";
import PasswordScreen from "./screens/Register/PasswordScreen";
import PolicyScreen from "./screens/Register/PolicyScreen";
import AvatarOptions from "./screens/ProfileTab/AvartarOptions";

const Stack = createStackNavigator();

export default function App() {
  const navigationOptions = {
    headerShown: false,
    gestureResponseDistance: 800,
  };

  const user = {
    email: "laichien2002@gmail.com",
    password: "jfdfdjfdjf",
  };
  // const user = null;

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Navigator screenOptions={navigationOptions}>
        {user ? (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
              options={{ cardStyle: { backgroundColor: "transparent" } }}
              name="AvatarOptions"
              component={AvatarOptions}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="StartRegisterScreen"
              component={StartRegisterScreen}
            />
            <Stack.Screen name="FullNameScreen" component={FullNameScreen} />
            <Stack.Screen
              name="DateOfBirthScreen"
              component={DateOfBirthScreen}
            />
            <Stack.Screen name="GenderScreen" component={GenderScreen} />
            <Stack.Screen name="EmailScreen" component={EmailScreen} />
            <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
            <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
