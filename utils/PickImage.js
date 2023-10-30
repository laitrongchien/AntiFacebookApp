import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    selectionLimit: 4,
    aspect: [4, 3],
    quality: 1,
    orderedSelection: true,
  });

  return result; // Return the result to be handled by the component
};
