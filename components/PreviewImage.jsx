import { View, TouchableOpacity } from "react-native";
import ScaleImage from "./ScaleImage";
import { SCREEN_WIDTH } from "../constants";
import VectorIcon from "../utils/VectorIcon";

const PreviewImage = ({ images, setImages }) => {
  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  let imageWidth =
    images.length === 1
      ? SCREEN_WIDTH
      : images.length === 2
      ? SCREEN_WIDTH / 2 - 4
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
          key={index}
          source={image}
          style={{ marginBottom: 4 }}
          width={imageWidth}
          height={imageHeight}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
            onPress={() => handleRemoveImage(index)}
          >
            <VectorIcon
              name="close"
              type="MaterialCommunityIcons"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </ScaleImage>
      ))}
    </View>
  );
};

export default PreviewImage;
