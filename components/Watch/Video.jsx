import { useRef, memo, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SCREEN_WIDTH } from "../../constants";
import VectorIcon from "../../utils/VectorIcon";
import { useSelector } from "react-redux";

const VideoControl = ({ videoUrl, videoId }) => {
  const videoRef = useRef();
  const [isMuted, setIsMuted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const volumeIconOpacity = new Animated.Value(1);
  const { playingId, isPlaying } = useSelector((state) => state.videoControl);

  const onPressToggleVolume = () => {
    setIsMuted(!isMuted);
    videoRef?.current.setIsMutedAsync(!isMuted);

    if (isMuted) {
      volumeIconOpacity.setValue(1);
    } else {
      volumeIconOpacity.setValue(0);
    }
  };

  const muteVolumeIconOpacity = volumeIconOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // useEffect(() => {
  //   if (playingId === videoId && isPlaying) {
  //     videoRef?.current.setIsMutedAsync(false);
  //     setIsMuted(false);

  //     if (isFinished) {
  //       videoRef?.current.replayAsync();
  //       setIsFinished(false);
  //     } else {
  //       videoRef?.current.playAsync();
  //     }
  //   } else {
  //     videoRef?.current.pauseAsync();
  //     videoRef?.current.setIsMutedAsync(true);
  //     setIsMuted(true);
  //   }

  //   if (isMuted) {
  //     volumeIconOpacity.setValue(0);
  //   } else {
  //     volumeIconOpacity.setValue(1);
  //   }
  // }, [videoId, playingId, isPlaying, isFinished, isMuted, volumeIconOpacity]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{
          uri: videoUrl,
        }}
        resizeMode={ResizeMode.COVER}
        rate={1.0}
        volume={1.0}
        isMuted={isMuted}
        shouldPlay={playingId === videoId && isPlaying}
        onError={(err) => console.log(err)}
        onLoad={(status) => console.log(status)}
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
