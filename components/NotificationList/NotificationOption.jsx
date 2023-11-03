import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import VectorIcon from "../../utils/VectorIcon";

const NotificationOption = () => {
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 8, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/default-img.png")}
          style={styles.avatar}
        />
        <Text>... đã đăng trong nhóm</Text>
      </View>
      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="close-box"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <Text style={styles.postOptionTitle}>Gỡ thông báo này</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  postOptionsWrapper: {
    zIndex: 2,
    backgroundColor: "#fff",
    marginTop: 12,
  },
  postOptionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    backgroundColor: "#ccc",
  },
  postOptionTitle: {
    fontSize: 18,
  },
});

export default NotificationOption;
