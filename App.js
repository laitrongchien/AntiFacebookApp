import * as React from "react";
import { StatusBar, SafeAreaView } from "react-native";
// import { Provider } from "react-redux";
// import store from "./redux/store";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./rootNavigation";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import CreatePost from "./screens/CreatePost";
import { Colors } from "./utils/Colors";

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

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={navigationOptions}>
        {user ? (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
