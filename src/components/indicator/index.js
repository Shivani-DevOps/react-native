import React from 'react';

import {ActivityIndicator} from 'react-native';
// import { AppColors } from '../../constant';

import PropTypes from 'prop-types';
import Styles from './style';

const IndicatorAppearance = {
  small: 'small',
  large: 'large',
};

/**
 * It is used to render indicator component with list of props.
 */
const Indicator = props => {
  // Destructuring all the properties.
  const {isAnimating, color, appearance, style} = props;

  return (
    <ActivityIndicator
      animating={isAnimating}
      color={color}
      size={appearance}
      style={style}
    />
  );
};

/**
 * It used to defines number of props-type, which are used in Indicator component.
 */
Indicator.propTypes = {
  isAnimating: PropTypes.bool.isRequired,
  color: PropTypes.string,
  appearance: PropTypes.oneOf([
    IndicatorAppearance.small,
    IndicatorAppearance.large,
  ]),
  style: PropTypes.any,
};

/**
 * It used to defines number of props-type default value, which are used in Indicator component.
 */
Indicator.defaultProps = {
  isAnimating: true,
  color: 'white',
  appearance: IndicatorAppearance.small,
  style: Styles.default,
};

export {Indicator, IndicatorAppearance};
