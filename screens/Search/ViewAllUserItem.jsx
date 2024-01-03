import React from "react";
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import UserItem from "./UserItem";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const ViewAllUserItem = ({ route }) => {
  const { userResults } = route.params;

  const handleSearchPress = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchToolWrapper}>
        <VectorIcon
          name="arrow-back"
          type="Ionicons"
          color="#000"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 10 }}>
          <TouchableOpacity onPress={handleSearchPress} style={{ flex: 1 }}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm"
              placeholderTextColor="#333"
              selectionColor="#333"
              underlineColorAndroid="transparent"
              editable={false} // Đặt là false để ngăn người dùng nhập vào
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={userResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserItem Item={item} />}
        style={styles.userResultsList}
      />
    </View>
  );
};

export default ViewAllUserItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchToolWrapper: {
    flexDirection: "row",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 54,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    fontSize: 16,
  },
  userResultsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});
