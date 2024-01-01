import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Clipboard,
  ToastAndroid,
} from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";
import { useRoute } from "@react-navigation/native";
import blockApi from "../../api/block";

const UserXProfileSetting = () => {
  const route = useRoute();
  const { userXId, userXName } = route.params;
  const copyToClipboard = (link) => {
    Clipboard.setString(link);
    // ToastAndroid.show("Đã sao chép vào bộ nhớ tạm", ToastAndroid.SHORT);
  };

  const blockUser = async () => {
    try {
      await blockApi.set_block(userXId);
      // Hiển thị Toast khi block thành công
      ToastAndroid.show("Bạn chặn người dùng thành công", ToastAndroid.SHORT);
      console.log("User blocked successfully");
    } catch (error) {
      // Hiển thị Toast khi xảy ra lỗi
      ToastAndroid.show("Bạn đã chặn người dùng này rồi", ToastAndroid.SHORT);
      console.error("Error blocking user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
          <VectorIcon name="arrow-left" type="MaterialCommunityIcons" color="#000" size={32} />
        </TouchableOpacity>
        <View style={styles.navigationTitle}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cài đặt trang cá nhân</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.groupSetting}>
          <TouchableOpacity style={styles.settingCategory}>
            <View style={styles.settingIcon}>
              <VectorIcon
                name="alert-outline"
                type="MaterialCommunityIcons"
                color="#000"
                size={24}
              />
            </View>
            <Text style={styles.settingTxt}>Trạng thái trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingCategory} onPress={blockUser}>
            <View style={styles.settingIcon}>
              <VectorIcon
                name="account-cancel-outline"
                type="MaterialCommunityIcons"
                color="#000"
                size={24}
              />
            </View>
            <Text style={styles.settingTxt}>Chặn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.settingCategory, borderBottomWidth: 0 }}>
            <View style={styles.settingIcon}>
              <VectorIcon name="magnify" type="MaterialCommunityIcons" color="#000" size={24} />
            </View>
            <Text style={styles.settingTxt}>Tìm kiếm trên trang cá nhân</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.myProfile}>
          <View style={styles.topTitle}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Liên kết đến trang cá nhân của {userXName}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 12 }}>
              https://www.facebook.com/profile/{userXName}
            </Text>
            <TouchableOpacity
              style={styles.btnCopy}
              onPress={() => copyToClipboard(`https://www.facebook.com/profile/${userXName}`)}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                }}>
                Sao chép liên kết
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserXProfileSetting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
  },
  navigationBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  btnBack: {
    zIndex: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationTitle: {
    position: "absolute",
    left: 0,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  groupSetting: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  settingCategory: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 10,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  settingIcon: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  settingTxt: {
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 8,
  },
  myProfile: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  topTitle: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
    height: 72,
  },
  btnCopy: {
    borderColor: "#ddd",
    borderRadius: 5,
    borderWidth: 0.5,
    height: 44,
    marginTop: 16,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dedede",
  },
});
