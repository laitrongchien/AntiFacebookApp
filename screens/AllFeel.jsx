import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { post } from "../api/post";
import { navigation } from "../rootNavigation";
import VectorIcon from "../utils/VectorIcon";

const AllFeel = () => {
  const defaultIndex = 0;
  const defaultCount = 20;

  const route = useRoute();
  const { postId, numReact } = route.params;
  const [feelData, setFeelData] = useState([]);

  useEffect(() => {
    const handleGetListFeels = async () => {
      const res = await post.getListFeels(postId, defaultIndex, defaultCount);
      //   console.log(res.data.data);
      setFeelData(res.data.data);
    };
    handleGetListFeels();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftItem}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 3 }}>
            <VectorIcon name="arrow-left" type="MaterialCommunityIcons" color="#000" size={32} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 8, fontSize: 18 }}>Những người đã bày tỏ cảm xúc</Text>
        </View>
        <VectorIcon
          name="magnify"
          type="MaterialCommunityIcons"
          color="#000"
          size={28}
          style={{ marginRight: 6 }}
        />
      </View>
      <Text style={{ padding: 12, fontSize: 18, fontWeight: 500 }}>Tất cả {numReact}</Text>
      <ScrollView>
        {feelData.map((feelItem) => (
          <View
            key={feelItem.id}
            style={{
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <View style={{ position: "relative", width: 60, height: 60 }}>
              <Image
                style={styles.avatar}
                source={
                  feelItem.feel.user.avatar
                    ? { uri: feelItem.feel.user.avatar }
                    : require("../assets/images/default-img.png")
                }
              />
              <Image
                style={styles.feel}
                source={
                  feelItem.feel.type == 1
                    ? require("../assets/icons/like_icon.png")
                    : require("../assets/icons/sad.png")
                }
              />
            </View>
            <Text style={{ fontSize: 16, marginLeft: 12 }}>{feelItem.feel.user.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllFeel;

const styles = StyleSheet.create({
  header: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  feel: {
    height: 36,
    width: 36,
    borderRadius: 50,
    position: "absolute",
    bottom: -6,
    right: -6,
  },
});
