import { useState, useEffect } from "react";
import { Image, View } from "react-native";

const ScaleImage = ({ source, width, height, style, children }) => {
  const [imageSize, setImageSize] = useState({ width: null, height: null });

  useEffect(() => {
    Image.getSize(source, (imageWidth, imageHeight) => {
      //   console.log(imageHeight, imageWidth);
      if (imageWidth && imageHeight) {
        if (width && !height) {
          setImageSize({
            width: width,
            height: imageHeight * (width / imageWidth),
          });
        } else if (!width && height) {
          setImageSize({
            width: imageWidth * (height / imageHeight),
            height: height,
          });
        } else {
          setImageSize({ width: width, height: height });
        }
      }
    });
  }, [source, width, height]);

  // console.log(imageSize.width, imageSize.height);

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <Image
        source={{ uri: source }}
        style={{
          height: imageSize.height,
          width: imageSize.width,
          ...style,
        }}
      />
      {children}
    </View>
  );
};

export default ScaleImage;
