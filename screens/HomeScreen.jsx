import { StyleSheet, ScrollView } from "react-native";
import PostTool from "../components/PostTool";

const HomeScreen = () => {
  return (
    <ScrollView bounces={false} style={styles.container}>
      <PostTool />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
