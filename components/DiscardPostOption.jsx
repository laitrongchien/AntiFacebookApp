import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import VectorIcon from "../utils/VectorIcon";
import { navigation } from "../rootNavigation";

const DiscardPostOption = ({ setShowModal }) => {
  const onGoBack = () => {
    setShowModal(false);
    navigation.goBack();
  };

  return (
    <View
      style={{
        padding: 12,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Bạn muốn hoàn thành bài viết của mình sau?
        </Text>
        <Text style={{ fontSize: 15, color: "#888" }}>
          Lưu làm bản nháp hoặc bạn có thể tiếp tục chỉnh sửa
        </Text>
        <TouchableOpacity style={styles.btnOption}>
          <VectorIcon
            name="bookmark-outline"
            type="MaterialCommunityIcons"
            size={26}
            color="#000"
          />
          <Text style={styles.btnOptionText}>Lưu làm bản nháp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOption} onPress={onGoBack}>
          <VectorIcon
            name="trash-can-outline"
            type="MaterialCommunityIcons"
            size={26}
            color="#000"
          />
          <Text style={styles.btnOptionText}>Bỏ bài viết</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOption}
          onPress={() => setShowModal(false)}
        >
          <VectorIcon
            name="check"
            type="MaterialCommunityIcons"
            size={26}
            color="#1877f2"
          />
          <Text style={{ ...styles.btnOptionText, color: "#1877f2" }}>
            Tiếp tục chỉnh sửa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnOption: {
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  btnOptionText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 16,
  },
});

export default DiscardPostOption;
