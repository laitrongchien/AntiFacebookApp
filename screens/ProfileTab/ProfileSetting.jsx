import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";

const ProfileSetting = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <VectorIcon
            name="arrow-left"
            type="MaterialCommunityIcons"
            color="#000"
            size={32}
          />
        </TouchableOpacity>
        <View style={styles.navigationTitle}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Cài đặt trang cá nhân
          </Text>
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
          <TouchableOpacity style={styles.settingCategory}>
            <View style={styles.settingIcon}>
              <VectorIcon
                name="eye-outline"
                type="MaterialCommunityIcons"
                color="#000"
                size={24}
              />
            </View>
            <Text style={styles.settingTxt}>Chế độ xem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingCategory}>
            <View style={styles.settingIcon}>
              <VectorIcon
                name="format-list-bulleted"
                type="MaterialCommunityIcons"
                color="#000"
                size={24}
              />
            </View>
            <Text style={styles.settingTxt}>Nhật kí hoạt động</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingCategory}>
            <View style={styles.settingIcon}>
              <VectorIcon
                name="lock-outline"
                type="MaterialCommunityIcons"
                color="#000"
                size={24}
              />
            </View>
            <Text style={styles.settingTxt}>Trung tâm quyền riêng tư</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingCategory}>
            <View style={styles.settingIcon}>
              <VectorIcon
                name="magnify"
                type="MaterialCommunityIcons"
                color="#000"
                size={24}
              />
            </View>
            <Text style={styles.settingTxt}>Tìm kiếm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.settingCategory, borderBottomWidth: 0 }}
          >
            <View style={styles.settingIcon}>
              <VectorIcon
                name="plus-circle-outline"
                type="MaterialCommunityIcons"
                color="#000"
                size={24}
              />
            </View>
            <Text style={styles.settingTxt}>Tạo trang cá nhân mới</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.myProfile}>
          <View style={styles.topTitle}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Liên kết đến trang cá nhân của bạn
            </Text>
            <Text style={{ color: "#666", fontSize: 18 }}>
              Liên kết của riêng bạn trên Facebook
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 12 }}>
              https://www.facebook.com/profile/chienlai
            </Text>
            <TouchableOpacity style={styles.btnCopy}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                }}
              >
                Sao chép liên kết
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSetting;

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
