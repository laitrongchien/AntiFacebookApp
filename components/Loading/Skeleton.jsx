import React from "react";
import { View, StyleSheet } from "react-native";

const LoadingSkeleton = () => {
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
      <View style={styles.long} />
      <View style={styles.long} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  long: {
    height: 20,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    marginBottom: 12,
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

export default LoadingSkeleton;
