import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import ScaleImage from "../ScaleImage";
import { SCREEN_WIDTH } from "../../constants";

const Comment = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require("../../assets/images/default-img.png")}
      />
      <View style={styles.commentContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity>
            <Text style={styles.name}>Lại Chiến</Text>
          </TouchableOpacity>
          <Text style={styles.content}>Tuyệt với quá em</Text>
        </View>
        {/* <ScaleImage width={SCREEN_WIDTH * 0.7} style={styles.image} source={comment.image}></ScaleImage> */}
        <View style={styles.toolContainer}>
          <Text style={styles.createAt}>1 ngày</Text>
          <TouchableOpacity style={styles.likeBtn}>
            <Text>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.replyBtn}>
            <Text>Phản hồi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  commentContainer: {
    width: SCREEN_WIDTH * 0.7,
  },
  contentContainer: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    backgroundColor: "#e9ebee",
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
  },
  content: {},
  image: {
    borderRadius: 10,
  },
  toolContainer: {
    marginTop: 5,
    flexDirection: "row",
    width: 0.6 * SCREEN_WIDTH,
  },
  createAt: {
    flex: 1,
  },
  likeBtn: {
    textAlign: "center",
    flex: 1,
  },
  replyBtn: {
    textAlign: "center",
    flex: 1,
  },
});
