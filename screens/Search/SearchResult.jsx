import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";

import UserItem from "./UserItem";
import SearchApi from "../../api/search";
import PostItem from "../../components/PostItem";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";
import blockApi from "../../api/block";

const SearchResult = ({ route }) => {
  const [blockList, setBlockList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [id_Block, setId_Block] = useState([]);

  useEffect(() => {
    fetchBlockList();
  }, []);

  const fetchBlockList = async () => {
    try {
      const response = await blockApi.get_list_blocks(0, 20);
      const newId_Block = response.data.map((item) => item.id);
      setId_Block(newId_Block);
      if (route.params?.searchQuery) {
        performSearch(route.params.searchQuery, newId_Block);
      }
    } catch (error) {
      console.error("Error fetching block list:", error);
    }
  };

  const performSearch = async (query, id_Block) => {
    try {
      // Fetch search results
      const searchRes = await SearchApi.search(query, null, 0, 10);
      setSearchResults(searchRes.data);

      // Fetch user results
      const userRes = await SearchApi.search_user(query, 0, 10);
      const newResults = userRes.data;
      // Lọc ngay lập tức kết quả người dùng dựa trên id_Block
      const filteredUserResults = newResults.filter((user) => !id_Block.includes(user.id));
      setUserResults(filteredUserResults);
    } catch (error) {
      console.error("Error performing search:", error);
    }
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
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#333"
          selectionColor="#333"
          underlineColorAndroid="transparent"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => performSearch(inputText, id_Block)}
        />
      </View>
      <FlatList
        ListHeaderComponent={() =>
          userResults.length > 0 && (
            <View style={styles.userResultsList}>
              <Text style={styles.heading}>Mọi người</Text>
              {userResults.slice(0, 3).map((item) => (
                <UserItem key={item.id.toString()} Item={item} />
              ))}
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate("ViewAllUserItem", { userResults })}>
                <Text style={styles.buttonText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
          )
        }
        keyExtractor={(item) => item.id.toString()}
        data={searchResults}
        renderItem={({ item }) => {
          // Check if item.id is in the id_Block array
          if (id_Block.includes(item.id)) {
            return null; // Do not render the item
          }

          // Render the item
          return <PostItem postData={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
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
    marginLeft: 10,
  },
  userResultsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    backgroundColor: "#fff",
  },
  viewAllButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default SearchResult;
