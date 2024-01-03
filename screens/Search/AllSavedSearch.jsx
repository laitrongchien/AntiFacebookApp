import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import SearchApi from "../../api/search";
import ExTouchableOpacity from "../../components/ExTouchableOpacity";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const AllSavedSearch = ({ route }) => {
  const { savedSearchList } = route.params;
  const [localSavedSearchList, setLocalSavedSearchList] = useState(savedSearchList);

  const handleDeleteSearch = useCallback(async (id) => {
    try {
      console.log("Deleting saved search with id:", id);
      const res = await SearchApi.del_saved_search(id, 0);
      console.log("API response:", res.data);

      // Update the list after deletion
      setLocalSavedSearchList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting saved search:", error);
    }
  }, []);

  const handleDeleteAllSearches = useCallback(async () => {
    if (localSavedSearchList.length > 0) {
      try {
        console.log("Deleting all saved searches");
        const res = await SearchApi.del_saved_search(localSavedSearchList[0].id, 1);
        console.log("API response:", res.data);

        // Clear the local saved search list
        setLocalSavedSearchList([]);
      } catch (error) {
        console.error("Error deleting all saved searches:", error);
      }
    }
  }, [localSavedSearchList]);

  const handleNavigateToSearchResult = useCallback((keyword) => {
    navigation.navigate("SearchResult", { searchQuery: keyword });
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ExTouchableOpacity
        style={styles.recentSearchItem}
        onPress={() => handleNavigateToSearchResult(item.keyword)}>
        <Text style={styles.resultSearch}>{item.keyword}</Text>
        <TouchableOpacity onPress={() => handleDeleteSearch(item.id)}>
          <VectorIcon name="close" type="MaterialCommunityIcons" color="#666" size={16} />
        </TouchableOpacity>
      </ExTouchableOpacity>
    ),
    [handleNavigateToSearchResult, handleDeleteSearch],
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewAllToolWrapper}>
        <View style={styles.leftToolWrapper}>
          <ExTouchableOpacity style={styles.btnBack}>
            <VectorIcon
              name="arrow-back"
              type="Ionicons"
              color="#000"
              size={30}
              onPress={() => navigation.goBack()}
            />
          </ExTouchableOpacity>
          <Text style={styles.leftToolText}>Lịch sử</Text>
        </View>
        <ExTouchableOpacity onPress={handleDeleteAllSearches}>
          <Text style={styles.deleteAllText}>Xóa tất cả</Text>
        </ExTouchableOpacity>
      </View>
      <FlatList
        data={localSavedSearchList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  viewAllToolWrapper: {
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 54,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  leftToolWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftToolText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 4,
  },
  btnBack: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAllText: {
    fontSize: 16,
    color: "#5b9bd5",
    marginRight: 8,
  },
});

export default AllSavedSearch;
