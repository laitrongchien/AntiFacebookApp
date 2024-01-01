import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";

import UserItem from "./UserItem";
import SearchApi from "../../api/search";
import PostItem from "../../components/PostItem";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const SearchResult = ({ route }) => {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    const { searchQuery } = route.params;
    setInputText(searchQuery);
    performSearch(searchQuery);
  }, []);

  const performSearch = async (query) => {
    try {
      const searchRes = await SearchApi.search(query, null, 0, 10);
      const userRes = await SearchApi.search_user(query, 0, 10);
      setSearchResults(searchRes.data);
      setUserResults(userRes.data);
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
          onSubmitEditing={() => performSearch(inputText)}
        />
      </View>
      <FlatList
        ListHeaderComponent={() =>
          userResults.length > 0 && ( // Conditional rendering based on userResults
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
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem postData={item} />}
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
