import { ScrollView, StyleSheet } from "react-native";

import { SCREEN_HEIGHT } from "../../constants";
import DarkBackgroundVideoItem from "./DarkBackgroundVideoItem";

const DarkBackGroundVideos = () => {
  return (
    <ScrollView
      style={styles.videosWrapper}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <DarkBackgroundVideoItem />
      <DarkBackgroundVideoItem />
    </ScrollView>
  );
};

export default DarkBackGroundVideos;

const styles = StyleSheet.create({
  videosWrapper: {
    backgroundColor: "#424345",
    marginTop: 50,
  },
});
