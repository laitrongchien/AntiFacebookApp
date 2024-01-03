import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const ReportPostScreen = () => {
  const route = useRoute();
  const { postId } = route.params;
  const navigateToReportDetail = (reportSubject) => {
    navigation.navigate("ReportDetailScreen", { postId, reportSubject });
  };
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
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
        <Text style={{ fontSize: 20, fontWeight: 500 }}>Hãy chọn vấn đề</Text>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm sự giúp đỡ trước khi
          báo cáo với Facebook
        </Text>
        <TouchableOpacity
          style={styles.btnOption}
          onPress={() => navigateToReportDetail("Ảnh khỏa thân")}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Ảnh khỏa thân</Text>
          <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOption}
          onPress={() => navigateToReportDetail("Bạo lực")}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Bạo lực</Text>
          <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOption}
          onPress={() => navigateToReportDetail("Quấy rối")}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Quấy rối</Text>
          <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOption}
          onPress={() => navigateToReportDetail("Thông tin sai sự thật")}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Thông tin sai sự thật</Text>
          <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOption}
          onPress={() =>
            navigation.navigate("ReportConfirmScreen", {
              postId,
              reportSubject: "Spam",
              reportDetail: "Spam",
            })
          }>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Spam</Text>
          <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOption}>
          <Text
            style={{ fontSize: 16, fontWeight: 500 }}
            onPress={() => navigateToReportDetail("Bán hàng trái phép")}>
            Bán hàng trái phép
          </Text>
          <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOption}
          onPress={() => navigateToReportDetail("Ngôn từ thù ghét")}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Ngôn từ gây thù ghét</Text>
          <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
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
  btnOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default ReportPostScreen;
