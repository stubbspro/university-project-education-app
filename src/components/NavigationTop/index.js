import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS } from '../../styles/theme';

const back = require('./icons/back.png');
const backLight = require('./icons/backLight.png');

const NavigationTop = ({ backScreenName, backScreenData, onBack, noBack, label, mode, rightButton, goBack }) => {
    const navigation = useNavigation();

    const handleBackClick = useCallback(() => {
        if (goBack) {
            navigation.goBack();
            return;
        }

        backScreenName && navigation.navigate(backScreenName, backScreenData);
    }, [backScreenName]);

    const isLightMode = mode === 'light';

    return (
        <View style={styles.root}>
            {label && <View style={styles.labelContainer}>
                <Text style={[styles.label, isLightMode && styles.labelLight]}>{label}</Text>
            </View>}
            {!noBack && <TouchableOpacity onPress={onBack || handleBackClick} style={styles.imageButton}>
                <Image style={styles.backIcon} source={isLightMode ? backLight : back} />
            </TouchableOpacity>}
            {rightButton && <TouchableOpacity onPress={rightButton.onPress} style={styles.rightButton}>
                {rightButton.label
                    ? <Text style={[styles.rightButtonLabel, rightButton.type === 'link' && styles.rightButtonLabelLink]}>{rightButton.label}</Text>
                    : <Image source={rightButton.icon.source} style={{ width: rightButton.icon.width, height: rightButton.icon.height }} />
                }
            </TouchableOpacity>}
        </View>
    );
};

NavigationTop.propTypes = {
    backScreenName: PropTypes.string,
    backScreenData: PropTypes.object,
    label: PropTypes.string,
    onBack: PropTypes.func,
    noBack: PropTypes.bool,
    goBack: PropTypes.bool,
    mode: PropTypes.oneOf(['light', 'dark']),
    rightButton: PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.oneOf(['button', 'link']),
        icon: PropTypes.shape({
            source: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            width: PropTypes.number,
            height: PropTypes.number
        }),
        onPress: PropTypes.func.isRequired
    })
};

NavigationTop.defaultProps = {
    mode: 'dark',
    noBack: false,
    goBack: false
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 61,
        position: 'relative',
        paddingBottom: 5
    },
    imageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: 20,
        height: 20,
        position: 'absolute',
        top: 0,
        left: -10
    },
    backIcon: {
        width: 8,
        height: 14
    },
    labelContainer: {
        justifyContent: 'center',
        width: '100%'
    },
    label: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 19,
        color: COLORS.BLACK,
        fontFamily: FONTS.GILROY_SEMI_BOLD
    },
    labelLight: {
        color: COLORS.WHITE
    },
    rightButton: {
        position: 'absolute',
        top: 2,
        right: 0
    },
    rightButtonLabel: {
        color: COLORS.BLUE,
        fontFamily: FONTS.GILROY_BOLD,
        fontSize: 14
    },
    rightButtonLabelLink: {
        fontFamily: FONTS.GILROY_MEDIUM,
        textDecorationLine: 'underline'
    }
});

export default NavigationTop;
