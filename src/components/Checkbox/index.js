import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Text, StyleSheet, View, Animated, Image, TouchableOpacity } from 'react-native';

import { COLORS, FONTS } from '../../styles/theme';

const Checkbox = ({ value, onChange, label, mode, error }) => {
    const backgroundStartValue = useRef(new Animated.Value(value ? 1 : 0)).current;
    const handleChange = useCallback(() => {
        const newValue = !value;
        onChange && onChange(newValue);
    }, [value, onChange]);

    useEffect(() => {
        if (value) {
            Animated.parallel([
                Animated.timing(backgroundStartValue, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: false
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(backgroundStartValue, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                })
            ]).start();
        }
    }, [value]);
    const backgroundInterpolation = backgroundStartValue.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.WHITE, COLORS.BLUE]
    });

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={handleChange}>
                <Animated.View
                    style={[
                        styles.checkbox,
                        error && styles.checkboxError,
                        styles[`${mode}Checkbox`],
                        {
                            backgroundColor: backgroundInterpolation
                        }
                    ]}
                >
                    <Image
                        style={styles.check}
                        source={require('./icons/check.png')}
                    />
                </Animated.View>
            </TouchableOpacity>
            {label && <Text style={styles.label} onPress={handleChange}>{label}</Text>}
        </View>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    mode: PropTypes.oneOf(['square', 'circle'])
};

Checkbox.defaultProps = {
    value: false,
    error: false,
    mode: 'square'
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        padding: 0,
        margin: 0,
        borderColor: COLORS.BLUE,
        borderWidth: 1,
        borderRadius: 4,
        width: 16,
        height: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxError: {
        borderColor: COLORS.RED
    },
    circleCheckbox: {
        width: 26,
        height: 26,
        borderRadius: 100
    },
    check: {
        width: 10,
        height: 8
    },
    label: {
        fontSize: 12,
        color: COLORS.GREY,
        marginLeft: 8,
        fontFamily: FONTS.GILROY_MEDIUM
    }
});

export default Checkbox;
