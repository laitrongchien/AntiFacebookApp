import React from "react";
import { TouchableOpacity } from "react-native";
import debounce from "lodash.debounce";

const withPreventDoubleClick = (WrappedComponent) => {
  const PreventDoubleClick = (props) => {
    const debouncedOnPress = () => {
      props.onPress && props.onPress();
    };

    const onPress = debounce(debouncedOnPress, 500, {
      leading: true,
      trailing: false,
    });

    return (
      <WrappedComponent activeOpacity={0.6} {...props} onPress={onPress}>
        {props.children}
      </WrappedComponent>
    );
  };

  return PreventDoubleClick;
};

export default withPreventDoubleClick(TouchableOpacity);
