import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import VectorIcon from "../../utils/VectorIcon";
import { navigation } from "../../rootNavigation";

const PolicyScreen = () => {
  return (
    <View style={styles.container}>
      <VectorIcon
        name="arrow-left"
        type="MaterialCommunityIcons"
        color="#000"
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Text style={{ paddingVertical: 12, fontSize: 22, fontWeight: "500" }}>
        Chấp nhận điều khoản và chính sách của Facebook
      </Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Tạo tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    backgroundColor: "#1877f2",
    marginTop: 12,
  },
});

export default PolicyScreen;
