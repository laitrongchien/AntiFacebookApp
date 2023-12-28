import * as Notifications from "expo-notifications";
import { doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setting } from "../api/setting";
import Logo from "../assets/images/logo.png";
import MetaLogo from "../assets/images/meta-logo.png";
import { SCREEN_HEIGHT } from "../constants";
import { registerForPushNotificationsAsync } from "../firebase/notification";
import { login } from "../redux/actions/authAction";
import { navigation } from "../rootNavigation";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      priority: "high",
    };
  },
});

const LoginScreen = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [loading, setLoading] = useState(false);
  const device_id = "string";
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.alert);
  const defaultDevType = "1"; //android

  const onCreateAccount = () => {
    navigation.navigate("StartRegisterScreen");
  };

  // const associateDeviceTokenWithUser = async (user, deviceToken) => {
  //   try {
  //     const userDocRef = doc(db, "users", user.uid);

  //     await setDoc(userDocRef, { deviceTokens: arrayUnion(deviceToken) }, { merge: true });

  //     const userDocSnapshot = await getDoc(userDocRef);
  //     const devices = userDocSnapshot.data().deviceTokens;

  //     return devices;
  //   } catch (error) {
  //     console.error("Error associating device token:", error);
  //   }
  // };

  const onLoginPress = async () => {
    try {
      setLoading(true);
      // const response = await signInWithEmailAndPassword(auth, email, password);
      // const user = response.user;
      // const devices = await associateDeviceTokenWithUser(user, expoPushToken);
      // if (devices.length > 1) {
      //   devices
      //     .slice(0, devices.length - 1)
      //     .forEach((device) => sendPushNotification(device));
      // }
      await dispatch(login(email, password, device_id));
      await setting.setDevToken(defaultDevType, expoPushToken);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
        <Image source={Logo} style={styles.logoStyle} />
        <View
          style={{
            width: "100%",
            height: SCREEN_HEIGHT - 340,
            alignItems: "center",
          }}>
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
          {error && (
            <Text style={{ marginTop: 8, color: "#a81414" }}>
              {error === "Email or password is not correct" && "Tài khoản hoặc mật khẩu không đúng"}
            </Text>
          )}
          <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.login}>Đăng nhập</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate("EmailResetScreen")}>
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
