import { View, ScrollView, StyleSheet } from "react-native";
import Story from "./Story";
import CreateStory from "./Story/CreateStory";

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.stories}
        horizontal={true}
      >
        <CreateStory />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 8,
  },
  stories: {
    flexWrap: "nowrap",
  },
});
