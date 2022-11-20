import React from 'react';
import PropTypes from 'prop-types';

import { TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';

import { COLORS, FONTS } from '../../styles/theme';

const Button = ({ label, onPress, type }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.button, type === 'buttonLight' && styles.buttonLight, type === 'link' && styles.buttonLink]}>
                <Text style={[styles.buttonLabel, type === 'buttonLight' && styles.buttonLabelLight, type === 'link' && styles.buttonLabelLink]}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['button', 'buttonLight', 'link']),
    onPress: PropTypes.func.isRequired
};

Button.defaultProps = {
    type: 'button'
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: COLORS.BLUE,
        justifyContent: 'center',
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    buttonLight: {
        backgroundColor: 'rgba(0, 178, 252, 0.05)'
    },
    buttonLink: {
        backgroundColor: COLORS.WHITE
    },
    buttonLabel: {
        color: COLORS.WHITE,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: FONTS.GILROY_BOLD
    },
    buttonLabelLight: {
        color: COLORS.BLUE
    },
    buttonLabelLink: {
        color: COLORS.BLUE
    }
});

export default Button;
