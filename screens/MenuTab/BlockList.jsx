import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import VectorIcon from "../../utils/VectorIcon";
import blockApi from "../../api/block";

const BlockList = () => {
  const [blockList, setBlockList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Get navigation prop using useNavigation hook

  useEffect(() => {
    const fetchBlockList = async () => {
      try {
        setIsLoading(true);
        const response = await blockApi.get_list_blocks(0, 20);
        setBlockList(response.data || []);
      } catch (error) {
        console.error("Error fetching block list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlockList();
  }, []);

  const handleUnblock = async (id) => {
    try {
      // Call the unblock API
      await blockApi.unblock(id);

      // Update the blockList state to reflect the changes
      setBlockList((prevBlockList) => prevBlockList.filter((user) => user.id !== id));

      console.log("User unblocked successfully");
    } catch (error) {
      console.error("Error unblocking user:", error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.blockListItem}>
      <Image source={{ uri: item.avatar || "default_avatar_url" }} style={styles.avatar} />
      <Text style={styles.blockListItemText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleUnblock(item.id)}>
        <Text style={styles.unblockText}>Hủy chặn</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return <Text>Loading...</Text>; // Or any loading indicator
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
          <VectorIcon name="arrow-left" type="MaterialCommunityIcons" color="#000" size={32} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Danh sách chặn</Text>
      </View>
      <View>
        <View style={styles.contentText}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Người bị chặn</Text>
          <Text style={{ fontSize: 14 }}>
            Một khi bạn đã chặn ai đó, họ sẽ không thể xem được nội dung bạn tự đăng trên dòng thời
            gian mình, gắn thẻ bạn, mời bạn tham gia sự kiện hoặc nhóm, bắt đầu cuộc trò chuyện với
            bạn hoặc thêm bạn làm bạn bè. Điều này không bao gồm các ứng dụng, trò chơi hay nhóm mà
            cả bạn và người này đều tham gia
          </Text>
        </View>
        <FlatList
          data={blockList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blockListItem: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#fff",
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  blockListItemText: {
    fontSize: 18,
    flex: 1,
  },
  unblockText: {
    color: "blue",
    fontWeight: "bold",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  contentText: {
    padding: 12,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  btnBack: {
    zIndex: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    marginLeft: 5,
  },
});

export default BlockList;
