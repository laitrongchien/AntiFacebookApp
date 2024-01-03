import { useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const ReportResultScreen = () => {
  const route = useRoute();
  const { reportSubject, reportDetail } = route.params;
  return (
    <View style={{ backgroundColor: "#fff", height: "100%", position: "relative" }}>
      <View style={{ alignItems: "center", borderBottomColor: "#ddd", borderBottomWidth: 1 }}>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: "green",
            borderRadius: 50,
            alignItems: "center",
            marginTop: 24,
          }}>
          <VectorIcon name="check" type="MaterialCommunityIcons" color="#fff" size={32} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 500, padding: 12 }}>
          Cảm ơn bạn đã cho chúng tôi biết
        </Text>
        <View style={{ backgroundColor: "#ededed", borderRadius: 6, padding: 6 }}>
          <Text style={{ fontSize: 15, color: "#1877f2", fontWeight: 600 }}>{reportSubject}</Text>
        </View>
        {reportDetail !== "Spam" && (
          <View style={{ backgroundColor: "#ededed", borderRadius: 6, padding: 6, marginTop: 12 }}>
            <Text style={{ fontSize: 15, color: "#1877f2", fontWeight: 600 }}>{reportDetail}</Text>
          </View>
        )}
        <Text style={{ fontSize: 16, color: "#666", marginTop: 8, marginBottom: 16 }}>
          Chúng tôi sử dụng các thông tin này để cải thiện quy trình của mình
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
          onPress={() => navigation.navigate("Home")}>
          <Text style={{ fontSize: 16, color: "#fff" }}>Xong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportResultScreen;
