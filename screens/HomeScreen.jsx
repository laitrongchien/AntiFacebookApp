import { StyleSheet, ScrollView } from "react-native";
import PostTool from "../components/PostTool";
import Stories from "../components/Stories";
import PostItem from "../components/PostItem";

const HomeScreen = () => {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <PostTool />
      <Stories />
      <PostItem />
      <PostItem />
      <PostItem />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export default HomeScreen;
