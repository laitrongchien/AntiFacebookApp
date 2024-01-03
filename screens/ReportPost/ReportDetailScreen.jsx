import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const ReportDetailScreen = () => {
  const route = useRoute();
  const { postId, reportSubject } = route.params;

  const navigateToReportConfirm = (reportDetail) => {
    navigation.navigate("ReportConfirmScreen", { postId, reportSubject, reportDetail });
    // navigation.navigate("ReportResultScreen", { postId, reportSubject, reportDetail });
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
      {reportSubject === "Ảnh khỏa thân" ? (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Đó là loại ảnh khỏa thân nào?</Text>
          <Text style={{ fontSize: 16, color: "#666" }}>Vui lòng chọn mục phù hợp nhất</Text>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Ảnh khỏa thân người lớn")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Ảnh khỏa thân người lớn</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Gợi dục")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Gợi dục</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Hoạt động tình dục")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Hoạt động tình dục</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
        </View>
      ) : reportSubject === "Bạo lực" ? (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Đó là loại bạo lực nào?</Text>
          <Text style={{ fontSize: 16, color: "#666" }}>Vui lòng chọn mục phù hợp nhất</Text>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Hình ảnh bạo lực")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Hình ảnh bạo lực</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Mối đe dọa bạo lực")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Mối đe dọa bạo lực</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Bạo lực tình dục")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Bạo lực tình dục</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
        </View>
      ) : reportSubject === "Quấy rối" ? (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Ai đang bị quấy rối?</Text>
          <Text style={{ fontSize: 16, color: "#666" }}>Vui lòng chọn mục phù hợp nhất</Text>
          <TouchableOpacity style={styles.btnOption} onPress={() => navigateToReportConfirm("Tôi")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Tôi</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Một người bạn")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Một người bạn</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
        </View>
      ) : reportSubject === "Thông tin sai sự thật" ? (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Đó là thông tin sai sự thật nào?</Text>
          <Text style={{ fontSize: 16, color: "#666" }}>Vui lòng chọn mục phù hợp nhất</Text>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Sức khỏe")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Sức khỏe</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Chính trị")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Chính trị</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Vấn đề xã hội")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Vấn đề xã hội</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
        </View>
      ) : reportSubject === "Bán hàng trái phép" ? (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Đó là loại bán hàng trái phép nào?</Text>
          <Text style={{ fontSize: 16, color: "#666" }}>Vui lòng chọn mục phù hợp nhất</Text>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Chất cấm, chất gây nghiện")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Chất cấm, chất gây nghiện</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Vũ khí")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Vũ khí</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Động vật có nguy cơ tuyệt chủng")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Động vật có nguy cơ tuyệt chủng</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>
            Đó là loại ngôn từ gây thù ghét nào?
          </Text>
          <Text style={{ fontSize: 16, color: "#666" }}>Vui lòng chọn mục phù hợp nhất</Text>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Chủng tộc hoặc sắc tộc")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Chủng tộc hoặc sắc tộc</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Nguồn gốc quốc gia")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Nguồn gốc quốc gia</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Thành phần tôn giáo")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Thành phần tôn giáo</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOption}
            onPress={() => navigateToReportConfirm("Phân chia giai cấp")}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Phân chia giai cấp</Text>
            <VectorIcon name="chevron-right" type="MaterialCommunityIcons" color="#666" size={32} />
          </TouchableOpacity>
        </View>
      )}
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

export default ReportDetailScreen;
