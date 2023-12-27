import { View } from "react-native";

import WatchItem from "./WatchItem";

const WatchList = () => {
  return (
    <View style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
      <WatchItem />
      <WatchItem />
    </View>
  );
};

export default WatchList;
