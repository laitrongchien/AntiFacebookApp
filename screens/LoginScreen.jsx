import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Logo from "../assets/images/logo.png";
import MetaLogo from "../assets/images/meta-logo.png";
import VectorIcon from "../utils/VectorIcon";
import { navigation } from "../rootNavigation";
import { SCREEN_HEIGHT } from "../constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
// import {
//   registerForPushNotificationsAsync,
//   sendPushNotification,
// } from "../firebase/notification";
// import * as Notifications from "expo-notifications";

// getToken(messaging, {
//   vapidKey:
//     "BGPK8nt44TNJVmIKeRS6tIBOYVxEuWDQdTf1PvoJzQUhWOIt712Oudyy37IJ0uCGcOBD1t9jf5IiMUklUJR5q4c",
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log(currentToken);
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

const LoginScreen = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const onCreateAccount = () => {
    navigation.navigate("StartRegisterScreen");
  };

  const onLoginPress = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // const expoPushToken = await registerForPushNotificationsAsync();
      // console.log(expoPushToken);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(async () => {
  //   const token = await registerForPushNotificationsAsync();
  //   setExpoPushToken(token);

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  // useEffect(() => {
  //   const subscription1 = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log("NOTIFICATION RECEIVED");
  //       console.log(notification);
  //       const userName = notification.request.content.data.userName;
  //       console.log(userName);
  //     }
  //   );

  //   const subscription2 = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log("NOTIFICATION RESPONSE RECEIVED");
  //       console.log(response);
  //       const userName = response.notification.request.content.data.userName;
  //       console.log(userName);
  //     }
  //   );

  //   return () => {
  //     subscription1.remove();
  //     subscription2.remove();
  //   };
  // }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification.",
        data: { userName: "Max" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  return (
    <View style={styles.container}>
      {/* <VectorIcon
        name="arrow-back"
        type="Ionicons"
        color="#000"
        size={20}
        onPress={() => navigation.navigate("RegisterScreen")}
      /> */}
      <View style={styles.subContainer}>
        {/* <View style={styles.language}>
          <Text>Tiếng Việt</Text>
          <Image source={ArrowDown} style={styles.arrowDown} />
        </View> */}
        <Image source={Logo} style={styles.logoStyle} />
        <View
          style={{
            width: "100%",
            height: SCREEN_HEIGHT - 340,
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Số di động hoặc email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={{
              ...styles.inputBox,
              borderColor: isEmailFocused ? "#000" : "#bebebe",
            }}
            selectionColor="#666"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
          <TextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={(value) => setPassword(value)}
            style={{
              ...styles.inputBox,
              borderColor: isPasswordFocused ? "#000" : "#bebebe",
            }}
            selectionColor="#666"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
            <Text style={styles.login}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Text style={styles.forgotPass}>Bạn quên mật khẩu ư?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.newAccount} onPress={onCreateAccount}>
          <Text style={styles.newAccountText}>Tạo tài khoản mới</Text>
        </TouchableOpacity>
        <Image source={MetaLogo} style={styles.metaLogoStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    height: 60,
    width: 60,
    marginVertical: 80,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  subContainer: {
    alignItems: "center",
  },
  language: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowDown: {
    width: 18,
    height: 18,
    marginLeft: 4,
  },
  backArrow: {
    width: 30,
    height: 30,
    marginLeft: 12,
    marginVertical: 18,
  },
  inputBox: {
    color: "black",
    fontSize: 15,
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    width: "96%",
    marginTop: 12,
  },
  loginButton: {
    padding: 10,
    backgroundColor: "#1877f2",
    borderRadius: 20,
    width: "96%",
    alignItems: "center",
    marginTop: 12,
  },
  login: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  forgotPass: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 15,
  },
  newAccount: {
    borderWidth: 2,
    borderColor: "#3d77ad",
    padding: 10,
    borderRadius: 24,
    width: "96%",
    alignItems: "center",
  },
  newAccountText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3d77ad",
  },
  metaLogoStyle: {
    height: 18,
    width: 72,
    marginTop: 15,
  },
});

export default LoginScreen;
