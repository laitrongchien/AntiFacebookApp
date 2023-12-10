import React from "react";
import { View, StyleSheet } from "react-native";

const LoadingVideoSkeleton = () => {
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <View style={styles.circle}></View>
        <View>
          <View style={styles.short}></View>
          <View style={styles.short}></View>
        </View>
      </View>
      <View style={styles.long} />
      <View style={styles.box} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  long: {
    height: 20,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    marginBottom: 12,
    marginTop: 8,
  },
  box: {
    height: 200,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    marginBottom: 12,
    marginTop: 8,
  },
  short: {
    height: 20,
    width: 100,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    marginBottom: 4,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    marginRight: 8,
  },
});

export default LoadingVideoSkeleton;
