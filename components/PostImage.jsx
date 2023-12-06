import { View, TouchableOpacity } from "react-native";
import ScaleImage from "./ScaleImage";
import { SCREEN_WIDTH } from "../constants";

const PostImage = ({ images }) => {
  let imageWidth =
    images.length === 1
      ? SCREEN_WIDTH
      : images.length === 2
      ? SCREEN_WIDTH / 2 - 2
      : images.length === 3
      ? SCREEN_WIDTH / 3 - 2
      : SCREEN_WIDTH / 2 - 2;

  let imageHeight =
    images.length === 1 ? null : images.length === 4 ? 200 : 400;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 16,
      }}
    >
      {images.map((image, index) => (
        <ScaleImage
          key={image.id}
          source={image.url}
          style={{ marginBottom: 4 }}
          width={imageWidth}
          height={imageHeight}
        />
      ))}
    </View>
  );
};

export default PostImage;
