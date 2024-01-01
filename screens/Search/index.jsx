import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";

import SearchApi from "../../api/search";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const Search = () => {
  const [savedSearchList, setSavedSearchList] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchSavedSearches = async () => {
      try {
        const res = await SearchApi.get_saved_search(0, 10);
        setSavedSearchList(res.data);
      } catch (error) {
        console.error("Error fetching saved searches:", error);
      }
    };

    fetchSavedSearches();
  }, []);

  const handleDeleteSearch = async (id) => {
    try {
      await SearchApi.del_saved_search(id, 0);
      setSavedSearchList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting saved search:", error);
    }
  };

  const handleNavigateToSearchResult = (keyword) => {
    navigation.navigate("SearchResult", { searchQuery: keyword });
  };

  const renderItem = ({ item }) => (
    <ExTouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleNavigateToSearchResult(item.keyword)}>
      <Text style={styles.resultSearch}>{item.keyword}</Text>
      <TouchableOpacity onPress={() => handleDeleteSearch(item.id)}>
        <VectorIcon name="close" type="MaterialCommunityIcons" color="#666" size={16} />
      </TouchableOpacity>
    </ExTouchableOpacity>
  );

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
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={() => navigation.navigate("SearchResult", { searchQuery: inputText })}
        />
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>Gần đây</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AllSavedSearch", { savedSearchList })}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentSearchWrapper}>
        <FlatList
          data={savedSearchList}
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
  searchToolWrapper: {
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 54,
    paddingHorizontal: 16,
  },
  btnBack: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    fontSize: 16,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 48,
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAllText: {
    fontSize: 16,
    color: "#1877f2",
  },
  recentSearchWrapper: {
    flex: 1,
  },
  recentSearchItem: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  resultSearch: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
});

export default Search;
