import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { useState } from "react";
import FacebookLogo from "../assets/images/fblogo.png";
import VectorIcon from "../utils/VectorIcon";
import * as navigation from "../rootNavigation";

const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const translateY = new Animated.Value(0);

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(translateY, {
      toValue: 200,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const onNavigateCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  return (
    <View style={styles.container}>
      <Image source={FacebookLogo} style={styles.fbLogoStyle} />
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={openMenu} style={styles.searchBg}>
          <VectorIcon
            name="plus"
            type="FontAwesome5"
            size={19}
            color="#3A3A3A"
          />
        </TouchableOpacity>
        <View style={styles.searchBg}>
          <VectorIcon
            name="search"
            type="FontAwesome5"
            size={19}
            color="#3A3A3A"
          />
        </View>
        <View style={styles.searchBg}>
          <VectorIcon
            name="messenger"
            type="Fontisto"
            size={22}
            color="#3A3A3A"
          />
        </View>
      </View>
      <Modal
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalContainer}>
            <Animated.View
              style={[
                styles.popupMenu,
                {
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity
                onPress={onNavigateCreatePost}
                style={{
                  ...styles.menuItem,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <VectorIcon
                  name="square-edit-outline"
                  type="MaterialCommunityIcons"
                  size={22}
                  color="#000"
                />
                <Text style={styles.menuItemText}>Bài viết</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeMenu} style={styles.menuItem}>
                <VectorIcon
                  name="book-open-page-variant"
                  type="MaterialCommunityIcons"
                  size={22}
                  color="#000"
                />
                <Text style={styles.menuItemText}>Tin</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fbLogoStyle: {
    height: 25,
    width: 130,
  },
  searchBg: {
    backgroundColor: "#EBECF0",
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerIcons: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  popupMenu: {
    width: 220,
    backgroundColor: "#fff",
    marginTop: 60,
    borderRadius: 10,
    shadowColor: "#ccc",
  },
  menuItem: {
    padding: 12,
    flexDirection: "row",
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 12,
  },
});

export default Header;
