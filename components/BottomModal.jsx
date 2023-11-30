import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const BottomModal = ({ isVisible, closeModal, children }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
      statusBarTranslucent={false}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "transparent",
  },
});

export default BottomModal;
