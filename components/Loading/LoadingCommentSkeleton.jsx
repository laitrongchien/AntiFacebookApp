import React from "react";
import { View, StyleSheet } from "react-native";

const LoadingCommentSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <View style={styles.circle}></View>
        <View>
          <View style={styles.box}></View>
          <View style={styles.box}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#fff",
    marginTop: 4,
  },
  box: {
    height: 60,
    width: 300,
    borderRadius: 16,
    backgroundColor: "#e9ebee",
    marginBottom: 16,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#e9ebee",
    marginRight: 8,
  },
});

export default LoadingCommentSkeleton;
