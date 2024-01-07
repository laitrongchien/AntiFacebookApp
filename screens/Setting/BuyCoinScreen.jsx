import { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Alert, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { buyCoins } from "../../redux/actions/userAction";
import { navigation } from "../../rootNavigation";
import VectorIcon from "../../utils/VectorIcon";

const BuyCoinScreen = () => {
  const [amount, setAmount] = useState();
  const { coins } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleBuyCoins = () => {
    dispatch(buyCoins("string", amount));
    setAmount("");
    const updatedCoins = (coins + parseInt(amount, 10)).toString();
    Alert.alert("Mua coin thành công", `Số coin hiện tại của bạn là: ${updatedCoins}`, [
      { text: "OK" },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
          <VectorIcon name="arrow-left" type="MaterialCommunityIcons" color="#000" size={30} />
        </TouchableOpacity>
        <Text style={styles.navigationTitle}>Mua coins</Text>
      </View>

      <View style={styles.wrapper}>
        <TextInput
          placeholder="Nhập số coin cần mua"
          value={amount}
          onChangeText={(value) => setAmount(value)}
          style={styles.inputBox}
          selectionColor="#333"
        />
        <Image
          source={require("../../assets/images/coin.png")}
          style={{
            ...styles.iconImage,
            position: "absolute",
            right: 30,
            top: 38,
          }}
        />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btnSave} onPress={handleBuyCoins}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BuyCoinScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  navigationBar: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  btnBack: {
    width: 50,
    alignItems: "center",
  },
  navigationTitle: {
    fontSize: 18,
  },
  inputBox: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#bebebe",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  wrapper: {
    padding: 15,
    position: "relative",
  },
  btnSave: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1877f2",
    height: 40,
    borderRadius: 5,
  },
  iconImage: {
    width: 28,
    height: 28,
  },
});
