import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";
import { SCREEN_WIDTH } from "../../constants";

const Search = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchToolWrapper}>
        <ExTouchableOpacity style={styles.btnBack}>
          <VectorIcon
            name="arrow-back"
            type="Ionicons"
            color="#000"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </ExTouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#333"
          selectionColor="#333"
          underlineColorAndroid="transparent"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.titleWrapper}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Gần đây</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 16, color: "#1877f2" }}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentSearchWrapper}>
          <ExTouchableOpacity style={styles.recentSearchItem}>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/default-img.png")}
            />
            <Text style={styles.resultSearch}>Lại Trọng Chiến</Text>
            <TouchableOpacity>
              <VectorIcon
                name="dots-horizontal"
                type="MaterialCommunityIcons"
                color="#666"
                size={28}
              />
            </TouchableOpacity>
          </ExTouchableOpacity>
          <ExTouchableOpacity style={styles.recentSearchItem}>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/default-img.png")}
            />
            <Text style={styles.resultSearch}>Nguyen The Duyet</Text>
            <TouchableOpacity>
              <VectorIcon
                name="dots-horizontal"
                type="MaterialCommunityIcons"
                color="#666"
                size={28}
              />
            </TouchableOpacity>
          </ExTouchableOpacity>
          <ExTouchableOpacity style={styles.recentSearchItem}>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/default-img.png")}
            />
            <Text style={styles.resultSearch}>Iniative</Text>
            <TouchableOpacity>
              <VectorIcon
                name="dots-horizontal"
                type="MaterialCommunityIcons"
                color="#666"
                size={28}
              />
            </TouchableOpacity>
          </ExTouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  searchToolWrapper: {
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 54,
  },
  btnBack: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: SCREEN_WIDTH - 40 - 16,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    fontSize: 16,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 48,
    alignItems: "center",
  },
  recentSearchWrapper: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  recentSearchItem: {
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    // justifyContent: "space-between"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 24,
    borderColor: "#333",
    borderWidth: 0.2,
  },
  resultSearch: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
    width: 300,
  },
});
