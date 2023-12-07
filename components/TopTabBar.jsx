import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import FriendScreen from "../screens/FriendTab";
import WatchScreen from "../screens/WatchTab";
import NotificationScreen from "../screens/NotificationTab";
import MenuScreen from "../screens/MenuTab";
import VectorIcon from "../utils/VectorIcon";

const Tab = createMaterialTopTabNavigator();

const TabData = [
  {
    id: 1,
    route: HomeScreen,
    name: "Home",
    activeIconName: "home-variant",
    activeIconType: "MaterialCommunityIcons",
    inactiveIconName: "home-variant-outline",
    inactiveIconType: "MaterialCommunityIcons",
    size: 28,
    unFocusSize: 28,
  },
  {
    id: 2,
    route: FriendScreen,
    name: "Friend",
    activeIconName: "account-multiple",
    activeIconType: "MaterialCommunityIcons",
    inactiveIconName: "account-multiple-outline",
    inactiveIconType: "MaterialCommunityIcons",
    size: 28,
    unFocusSize: 28,
  },
  {
    id: 3,
    route: WatchScreen,
    name: "Watch",
    activeIconName: "youtube-tv",
    activeIconType: "MaterialCommunityIcons",
    inactiveIconName: "television-play",
    inactiveIconType: "MaterialCommunityIcons",
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 4,
    route: NotificationScreen,
    name: "Notification",
    activeIconName: "bell",
    activeIconType: "MaterialCommunityIcons",
    inactiveIconName: "bell-outline",
    inactiveIconType: "MaterialCommunityIcons",
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 5,
    route: MenuScreen,
    name: "Menu",
    activeIconName: "menu",
    activeIconType: "MaterialCommunityIcons",
    inactiveIconName: "menu",
    inactiveIconType: "MaterialCommunityIcons",
    size: 25,
    unFocusSize: 25,
  },
];

const TopTabBar = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarShowIcon: true,
          tabBarActiveTintColor: "#1877F2",
          tabBarInactiveTintColor: "#888",
          tabBarPressColor: "#ccc",
          tabBarItemStyle: {
            padding: 8,
          },
          tabBarAndroidRipple: { borderless: false },
          tabBarStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            zIndex: 2,
          },
        })}
      >
        {TabData.map((tab) => (
          <Tab.Screen
            key={tab.id}
            name={tab.name}
            component={tab.route}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <VectorIcon
                  type={focused ? tab.activeIconType : tab.inactiveIconType}
                  name={focused ? tab.activeIconName : tab.inactiveIconName}
                  size={focused ? tab.size : tab.unFocusSize}
                  color={color}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default TopTabBar;
