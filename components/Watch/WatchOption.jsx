import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import VectorIcon from "../../utils/VectorIcon";

const WatchOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="account-cancel"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Chặn chủ của video</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="account-plus"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Kết bạn với chủ video</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="message-alert"
              type="MaterialCommunityIcons"
              size={28}
              color="#000"
            />
          </View>
          <View>
            <Text style={styles.postOptionTitle}>Báo cáo video</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },

  postOptionsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 2,
    padding: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  postOptionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  optionIcon: {
    width: 35,
    alignItems: "center",
    marginRight: 8,
  },
  postOptionTitle: {
    fontSize: 18,
  },
});

export default WatchOptions;
