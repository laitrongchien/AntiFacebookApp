import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import VectorIcon from "../../utils/VectorIcon";

const CoverOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.optionsWrapper}>
        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="image-area"
              type="MaterialCommunityIcons"
              size={24}
              color="#000"
            />
          </View>
          <Text style={styles.optionTitle}>Xem ảnh bìa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionIcon}>
            <VectorIcon
              name="upload"
              type="MaterialCommunityIcons"
              size={24}
              color="#000"
            />
          </View>
          <Text style={styles.optionTitle}>Tải ảnh lên</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CoverOptions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
  },
  optionsWrapper: {
    zIndex: 2,
    backgroundColor: "#fff",
    marginTop: 12,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    backgroundColor: "#ccc",
  },
  optionTitle: {
    fontSize: 16,
  },
});
