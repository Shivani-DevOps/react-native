import React, {Component} from 'react';
import propTypes from 'prop-types';
import {
    Modal,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
} from 'react-native';
//import {FONT_FAMILY} from './Font';
import {FONT} from './FontSize';
import COLORS from '../utils/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
    },
    indicator: {
        marginBottom: 15,
    },
    message: {
        color: COLORS.app_theme_color,
        fontSize: FONT.TextMedium,
      //  fontFamily: FONT_FAMILY.Roboto,
    },
});

const SIZES = ['small', 'normal', 'large'];

export default class CustomLoader extends Component {
    constructor(props) {
        super(props);
    }

    abc() {
    }

    static propTypes = {
        visible: propTypes.any,
        color: propTypes.string,
        indicatorSize: propTypes.oneOf(SIZES),
        messageFontSize: propTypes.number,
        message: propTypes.string,
    };

    static defaultProps = {
        visible: false,
        color: 'white',
        indicatorSize: 'large',
        messageFontSize: 20,
        message: '',
    };

    render() {
        const messageStyle = {
            color: this.props.color,
            fontSize: this.props.messageFontSize,
        };
        if (typeof this.props.children !== 'undefined') {
            return (
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.props.visible}
                    supportedOrientations={['portrait', 'landscape']}
                    onOrientationChange={
                        evt => this.setState({currentOrientation: evt.nativeEvent.orientation})
                    }
                >
                    <View style={[styles.container]}>
                        <View style={[styles.innerContainer]}>
                            {this.props.children}
                        </View>
                    </View>
                </Modal>
            );
        } else {
            return (
                <Modal
                    onRequestClose={() => this.abc()}
                    animationType={'fade'}
                    transparent={true}
                    visible={this.props.visible}
                    supportedOrientations={['portrait', 'landscape']}
                    onOrientationChange={
                        evt => this.setState({currentOrientation: evt.nativeEvent.orientation})
                    }
                >
                    <View style={[styles.container]}>
                        <View style={[styles.innerContainer]}>
                            <ActivityIndicator
                                style={[styles.indicator]}
                                size={this.props.indicatorSize}
                                color={this.props.color}
                            />
                            <Text allowFontScaling={false} style={[styles.message, messageStyle]}>
                                {this.props.message}
                            </Text>
                        </View>
                    </View>
                </Modal>
            );
        }
    }
}
