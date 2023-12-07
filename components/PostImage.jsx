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
      ? SCREEN_WIDTH / 2 - 2
      : SCREEN_WIDTH / 2 - 2;

  let imageHeight =
    images.length === 1 ? null : images.length === 4 ? 200 : 400;

  if (images.length === 3)
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <ScaleImage
          key={images[0].id}
          source={images[0].url}
          width={imageWidth}
          height={imageHeight}
        />
        <View>
          <ScaleImage
            key={images[1].id}
            source={images[1].url}
            width={imageWidth}
            height={imageHeight / 2}
          />
          <ScaleImage
            key={images[2].id}
            source={images[2].url}
            width={imageWidth}
            height={imageHeight / 2}
          />
        </View>
      </View>
    );

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
