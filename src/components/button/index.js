import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './style';

import {Indicator, IndicatorAppearance} from '../indicator';

import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import { AppColors, AppStyles } from '../../constant';

/**
 * Define list of application global styles.
 */
const Container = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.13,
    shadowRadius: 15,
    elevation: 8,
  },
  border: {
    borderColor: '#FFC700',
    borderWidth: 1,
  },
});

/**
 * It is used to render button component with list of props.
 */
const Button = props => {
  // Destructuring component props.
  const {
    isLoading,
    indicatorColor,
    indicatorAppearance,
    isDisabled,
    isBorderVisible,
    isShadowVisible,
    marginStart,
    marginTop,
    marginEnd,
    marginBottom,
    enabledBackgroundColor,
    disabledBackgroundColor,
    borderColor,
    containerStyle,
    titleStyle,
    title,
    imageStyle,
    image,
    onPress,
  } = props;

  /**
   * It is used to render title component UIs, based on define list of dynamic styles for the title component.
   */
  const titleStyles = title
    ? [
        Styles.title.default,
        Styles.title.bebasNeue25Bold,
        titleStyle,
        {color: isDisabled ? 'white' : 'white'},
      ]
    : [Styles.title.default, Styles.title.bebasNeue25Bold];
  const renderTitleUIs = () => {
    return <Text style={titleStyles}>{title}</Text>;
  };

  /**
   * It is used to render image component UIs, based on define list of dynamic styles for the image component.
   */
  const imageStyles = image
    ? [Styles.image.default, imageStyle]
    : [Styles.image.default];
  const renderImageUIs = () => {
    return <Image style={imageStyles} source={image} resizeMode={'contain'} />;
  };

  /**
   * It is used to render indicator component UIs.
   */
  const renderIndicatorUIs = () => {
    return (
      <Indicator
        isAnimating={isLoading}
        color={indicatorColor}
        appearance={indicatorAppearance}
      />
    );
  };

  /**
   * It is used to render UIs after indicator loader animation finish.
   */
  const renderUIsAfterLoader = () => {
    return (
      <>
        {title && renderTitleUIs()}
        {image && renderImageUIs()}
      </>
    );
  };

  /**
   * Define list of dynamic styles for the container component.
   */
  const containerStyles = containerStyle
    ? [Styles.container.default, containerStyle]
    : [Styles.container.default];
  if (isBorderVisible) {
    containerStyles.push(Container.border);
    if (borderColor) {
      containerStyles.push({borderColor});
    }
  }
  if (isShadowVisible) {
    containerStyles.push(Container.shadow);
  }
  if (marginStart) {
    containerStyles.push({marginStart});
  }
  if (marginTop) {
    containerStyles.push({marginTop});
  }
  if (marginEnd) {
    containerStyles.push({marginEnd});
  }
  if (marginBottom) {
    containerStyles.push({marginBottom});
  }
  if (disabledBackgroundColor && isDisabled === true) {
    containerStyles.push({backgroundColor: disabledBackgroundColor});
  } else if (enabledBackgroundColor && isDisabled === false) {
    containerStyles.push({backgroundColor: enabledBackgroundColor});
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={containerStyles}
      disabled={isDisabled}
      onPress={onPress}>
      {isLoading ? renderIndicatorUIs() : renderUIsAfterLoader()}
    </TouchableOpacity>
  );
  //
};

/**
 * It used to defines number of props-type, which are used in Button component.
 */
Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  indicatorColor: PropTypes.string,
  indicatorAppearance: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  isBorderVisible: PropTypes.bool.isRequired,
  isShadowVisible: PropTypes.bool.isRequired,
  marginStart: PropTypes.number,
  marginTop: PropTypes.number,
  marginEnd: PropTypes.number,
  marginBottom: PropTypes.number,
  enabledBackgroundColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  containerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  title: PropTypes.string,
  imageStyle: PropTypes.any,
  image: PropTypes.any,
  onPress: PropTypes.func.isRequired,
};

/**
 * It used to defines number of props-type default value, which are used in Button component.
 */
Button.defaultProps = {
  isLoading: false,
  indicatorColor: 'white',
  indicatorAppearance: IndicatorAppearance.small,
  isDisabled: false,
  isBorderVisible: true,
  isShadowVisible: true,
  enabledBackgroundColor: '#FFC700',
  disabledBackgroundColor: '#FFC700',
  borderColor: '#FFC700',
};

export default Button;
