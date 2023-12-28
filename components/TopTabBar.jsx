import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import FriendScreen from "../screens/FriendTab";
import WatchScreen from "../screens/WatchTab";
import NotificationScreen from "../screens/NotificationTab";
import MenuScreen from "../screens/MenuTab";
import VectorIcon from "../utils/VectorIcon";
import { useSelector } from "react-redux";

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
  const { badge } = useSelector((state) => state.notification);
  const { newFriends, newVideos } = useSelector((state) => state.newItems);
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
              tabBarBadge: () => {
                if (tab.name === "Friend" && newFriends > 0) {
                  return (
                    <View
                      style={{
                        position: "absolute",
                        right: 18,
                        top: 2,
                        backgroundColor: "violet",
                        width: 22,
                        height: 22,
                        borderRadius: 50,
                      }}
                    >
                      <Text style={{ color: "#fff", textAlign: "center" }}>
                        {newFriends}
                      </Text>
                    </View>
                  );
                } else if (tab.name === "Watch" && newVideos > 0) {
                  return (
                    <View
                      style={{
                        position: "absolute",
                        right: 18,
                        top: 2,
                        backgroundColor: "violet",
                        width: 22,
                        height: 22,
                        borderRadius: 50,
                      }}
                    >
                      <Text style={{ color: "#fff", textAlign: "center" }}>
                        {newVideos}
                      </Text>
                    </View>
                  );
                } else if (tab.name === "Notification" && badge > 0) {
                  return (
                    <View
                      style={{
                        position: "absolute",
                        right: 18,
                        top: 2,
                        backgroundColor: "violet",
                        width: 22,
                        height: 22,
                        borderRadius: 50,
                      }}
                    >
                      <Text style={{ color: "#fff", textAlign: "center" }}>
                        {badge}
                      </Text>
                    </View>
                  );
                }
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default TopTabBar;
