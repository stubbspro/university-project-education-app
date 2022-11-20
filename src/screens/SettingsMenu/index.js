import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import NavigationTop from '../../components/NavigationTop';

import { COLORS, FONTS } from '../../styles/theme';

const BUTTONS = [
    { icon: require('./icons/profile.png'), label: 'Редагувати профіль', screen: 'EditProfile' },
    { icon: require('./icons/paper.png'), label: 'Інформація', screen: 'Personality' },
    { icon: require('./icons/exit.png'), label: 'Вийти', screen: 'logout' }
];

const arrowIcon = require('./icons/arrow.png');

const SettingsMenu = ({ navigation }) => {
    const handleButtonClick = useCallback(screen => async () => {
        if (screen === 'logout') {
            navigation.navigate('SignIn');
        }

        screen && navigation.navigate(screen);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <NavigationTop backScreenName='Profile' label='Settings' />
                    <View style={styles.buttons}>
                        {BUTTONS.map((button, i) => {
                            const isLast = i === BUTTONS.length - 1;

                            return <TouchableOpacity key={i} onPress={handleButtonClick(button.screen)}>
                                <View style={styles.button}>
                                    <Image source={button.icon} style={styles.buttonIcon} />
                                    <View style={styles.buttonInfo}>
                                        <Text style={[styles.buttonLabel, isLast && styles.buttonLabelLast]}>{button.label}</Text>
                                        {!isLast && <Image source={arrowIcon} style={styles.arrowIcon} />}
                                    </View>
                                </View>
                                {!isLast && <View style={styles.lineContainer}>
                                    <View style={styles.line} />
                                </View>}
                            </TouchableOpacity>;
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

SettingsMenu.propTypes = {
    navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },
    content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    buttons: {
        marginTop: 24
    },
    button: {
        paddingTop: 17,
        paddingBottom: 17,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonIcon: {
        width: 24,
        height: 24
    },
    buttonInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 19
    },
    buttonLabel: {
        fontSize: 16,
        fontFamily: FONTS.GILROY_SEMI_BOLD,
        color: COLORS.BLACK
    },
    buttonLabelLast: {
        color: COLORS.RED
    },
    arrowIcon: {
        width: 20,
        height: 20
    },
    lineContainer: {
        paddingLeft: 41
    },
    line: {
        backgroundColor: '#F1F1F1',
        height: 1
    }
});

export default SettingsMenu;
