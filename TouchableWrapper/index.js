import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

class TouchableWrapper extends Component {
  renderWrapper = () => {
    const { onPress, children,
      touchStyles, rippleColor, opacity } = this.props;
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          background={rippleColor ?
            TouchableNativeFeedback.Ripple(rippleColor) : TouchableNativeFeedback.Ripple()}
          {...this.props}
        >
          <View
            style={[
              touchStyles,
            ]}
          >
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity
        style={touchStyles}
        activeOpacity={opacity || 0.7}
        onPress={onPress}
        {...this.props}
      >
        {children}
      </TouchableOpacity>
    );
  }
  render() {
    return (
      this.renderWrapper()
    );
  }
}

TouchableWrapper.propTypes = {
  onPress: PropTypes.func,
  touchStyles: PropTypes.any,
  children: PropTypes.any,
  raised: PropTypes.bool,
  underlayColor: PropTypes.any,
  rippleColor: PropTypes.any,
  opacity: PropTypes.any,
};

TouchableWrapper.defaultProps = {
  raised: false,
  touchStyles: {},
};

export default TouchableWrapper;
