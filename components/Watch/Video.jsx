import { useRef, memo } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SCREEN_WIDTH } from "../../constants";
import VectorIcon from "../../utils/VectorIcon";
import { useSelector } from "react-redux";

const VideoControl = ({ videoUrl, videoId }) => {
  const videoRef = useRef(null);
  var isMuted = false;
  const volumeIconOpacity = new Animated.Value(1);
  const { playingId, isPlaying } = useSelector((state) => state.videoControl);

  const onPressToggleVolume = () => {
    isMuted = !isMuted;
    videoRef.current.setIsMutedAsync(isMuted);

    if (isMuted) {
      volumeIconOpacity.setValue(0);
    } else {
      volumeIconOpacity.setValue(1);
    }
  };

  const muteVolumeIconOpacity = volumeIconOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{
          uri: videoUrl,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay={playingId === videoId && isPlaying}
        isLooping={true}
        style={styles.video}
      />
      <TouchableOpacity
        style={styles.btnToggleVolume}
        onPress={onPressToggleVolume}
      >
        <Animated.View
          style={{ position: "absolute", opacity: muteVolumeIconOpacity }}
        >
          <VectorIcon
            name="volume-mute"
            type="MaterialCommunityIcons"
            size={24}
            color="#fff"
          />
        </Animated.View>
        <Animated.View style={{ opacity: volumeIconOpacity }}>
          <VectorIcon
            name="volume-high"
            type="MaterialCommunityIcons"
            size={24}
            color="#fff"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(VideoControl);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  video: {
    width: SCREEN_WIDTH,
    height: 300,
    backgroundColor: "#000",
  },
  btnToggleVolume: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
