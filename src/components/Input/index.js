import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Animated, StyleSheet, TextInput, View, Text, Image } from 'react-native';

import { COLORS, FONTS } from '../../styles/theme';

const ICONS_MAP = {
    email: {
        icon: require('./icons/email.png'),
        size: {
            width: 20,
            height: 18
        }
    },
    password: {
        icon: require('./icons/password.png'),
        size: {
            width: 20,
            height: 20
        }
    },
    document: {
        icon: require('./icons/document.png'),
        size: {
            width: 22,
            height: 22
        }
    },
    search: {
        icon: require('./icons/search.png'),
        size: {
            width: 20,
            height: 20
        }
    },
    user: {
        icon: require('./icons/user.png'),
        size: {
            width: 16,
            height: 20
        }
    },
    calendar: {
        icon: require('./icons/calendar.png'),
        size: {
            width: 20,
            height: 22
        }
    },
    location: {
        icon: require('./icons/location.png'),
        size: {
            width: 24,
            height: 24
        }
    }
};

const Input = ({ label, value, onChange, onFocus, onBlur, secureTextEntry, autoCompleteType, link, icon, error, autoCapitalize }) => {
    const topStartValue = useRef(new Animated.Value(value ? 10 : 18)).current;
    const fontSizeStartValue = useRef(new Animated.Value(value ? 10 : 14)).current;
    const backgroundStartValue = useRef(new Animated.Value(0)).current;
    const borderStartValue = useRef(new Animated.Value(0)).current;
    const errorOpacityStartValue = useRef(new Animated.Value(error ? 1 : 0)).current;
    const errorTimeout = useRef();
    const errorTextTimeout = useRef();

    const [errorState, setErrorState] = useState(error);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(topStartValue, {
                toValue: focused || value ? 10 : 18,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(fontSizeStartValue, {
                toValue: focused || value ? 10 : 14,
                duration: 200,
                useNativeDriver: false
            }),
            ...(focused
                ? [
                    Animated.timing(backgroundStartValue, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(borderStartValue, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: false
                    })
                ]
                : [
                    Animated.timing(backgroundStartValue, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(borderStartValue, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    })
                ])
        ]).start();
    }, [focused, value]);

    useEffect(() => {
        clearTimeout(errorTimeout.current);
        clearTimeout(errorTextTimeout.current);
        errorTimeout.current = setTimeout(() => {
            if (error) {
                setErrorState(error);
            } else {
                errorTextTimeout.current = setTimeout(() => {
                    setErrorState(error);
                }, 200);
            }
            Animated.parallel([
                Animated.timing(errorOpacityStartValue, {
                    toValue: error ? 1 : 0,
                    duration: 200,
                    useNativeDriver: false
                }),
                Animated.timing(borderStartValue, {
                    toValue: error ? 3 : focused ? 1 : 0,
                    duration: 200,
                    useNativeDriver: false
                })
            ]).start();
        }, 200);
    }, [error]);

    const handleFocus = useCallback(() => {
        setFocused(true);
        onFocus();
    }, []);
    const handleBlur = useCallback(() => {
        setFocused(false);
        onBlur();
    }, [value]);
    const handleChange = useCallback(value => {
        onChange(value);
    }, [onChange]);
    const backgroundInterpolation = backgroundStartValue.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.GREY_LIGHT, COLORS.WHITE]
    });
    const borderInterpolation = borderStartValue.interpolate({
        inputRange: [0, 1, 3],
        outputRange: [COLORS.WHITE, COLORS.BLUE, COLORS.RED]
    });

    const iconInfo = useMemo(() => ICONS_MAP[icon], [icon]);

    return (
        <View style={styles.root}>
            <Animated.Text pointerEvents="none" style={[styles.label, {
                top: topStartValue,
                fontSize: fontSizeStartValue
            }]}>
                {label}
            </Animated.Text>
            <Image pointerEvents="none" source={iconInfo.icon} style={[styles.icon, { width: iconInfo.size.width, height: iconInfo.size.height }]} />
            {link && <Text style={styles.link} onPress={link.onPress}>
                {link.label}
            </Text>}
            <Animated.View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: backgroundInterpolation,
                        borderColor: borderInterpolation
                    }
                ]}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange}
                    defaultValue={value}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={secureTextEntry}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                />
            </Animated.View>
            {errorState && <Animated.Text style={[styles.errorText, { opacity: errorOpacityStartValue }]}>{errorState}</Animated.Text>}
        </View>
    );
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    autoCompleteType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    link: PropTypes.shape({
        label: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired
    }),
    icon: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

Input.defaultProps = {
    value: '',
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    secureTextEntry: false,
    autoCapitalize: 'sentences',
    icon: 'email'
};

const styles = StyleSheet.create({
    root: {
        width: '100%',
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        left: 18,
        top: 18,
        zIndex: 999
    },
    label: {
        position: 'absolute',
        left: 50,
        fontSize: 14,
        zIndex: 999,
        color: COLORS.GREY,
        fontFamily: FONTS.GILROY_MEDIUM
    },
    link: {
        position: 'absolute',
        right: 15,
        top: 18,
        textDecorationLine: 'underline',
        fontSize: 12,
        zIndex: 999,
        color: COLORS.BLUE,
        fontFamily: FONTS.GILROY_MEDIUM
    },
    inputContainer: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10
    },
    input: {
        height: 50,
        paddingTop: 10,
        paddingLeft: 50,
        paddingRight: 15,
        color: COLORS.BLACK,
        position: 'relative',
        left: -2,
        fontSize: 14,
        fontFamily: FONTS.GILROY_MEDIUM
    },
    errorText: {
        color: COLORS.RED,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 12,
        position: 'absolute',
        bottom: -16,
        left: 50
    }
});

export default Input;
