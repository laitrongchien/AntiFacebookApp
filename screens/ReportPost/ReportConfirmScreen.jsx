import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { reportPost } from "../../redux/actions/postAction";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const ReportConfirmScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { postId, reportSubject, reportDetail } = route.params;
  // console.log(postId, reportSubject, reportDetail);
  const handleReportPost = () => {
    dispatch(reportPost(postId, reportSubject, reportDetail));
    navigation.navigate("ReportResultScreen", { reportSubject, reportDetail });
  };
  return (
    <View style={{ backgroundColor: "#fff", height: "100%", position: "relative" }}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon name="chevron-left" type="MaterialCommunityIcons" color="#000" size={32} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Báo cáo</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <VectorIcon name="close" type="MaterialCommunityIcons" color="#000" size={28} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>{reportSubject}</Text>
        <Text style={{ fontSize: 16, color: "#666", marginTop: 8 }}>
          Chúng tôi chỉ gỡ những nội dung vi phạm Tiêu chuẩn cộng đồng của mình
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 12,
          paddingVertical: 24,
          position: "absolute",
          bottom: 0,
          left: 0,
        }}>
        <TouchableOpacity
          style={{ backgroundColor: "#1877f2", padding: 8, alignItems: "center", borderRadius: 8 }}
          onPress={handleReportPost}>
          <Text style={{ fontSize: 16, color: "#fff" }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
});

export default ReportConfirmScreen;
