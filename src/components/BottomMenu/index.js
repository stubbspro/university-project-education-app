import React from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { COLORS, FONTS } from '../../styles/theme';

const TABS = [
    { id: 'lessons', label: 'Lessons', icon: require('./icons/shop.png'), iconActive: require('./icons/shopActive.png') },
    {
        id: 'calendar',
        label: 'Calendar',
        icon: require('./icons/calendar.png'),
        iconActive: require('./icons/shopActive.png'),
        screen: 'Calendar',
        screenData: { success: false }
    },
    {
        id: 'notifications',
        label: 'Notifications',
        icon: require('./icons/notifications.png'),
        iconActive: require('./icons/notificationsActive.png'),
        screen: 'Notifications'
    },
    { id: 'profile', label: 'Profile', icon: require('./icons/avatar.png'), screen: 'Profile' }
];

const BottomMenu = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const notificationsNumber = 2;

    const handleTabPress = (screen, screenData) => () => {
        screen && navigation.navigate(screen, screenData);
    };

    return (
        <View style={styles.root}>
            {TABS.map(tab => {
                const isActive = route.name === tab.screen;
                const isProfile = tab.screen === 'Profile';

                return <TouchableOpacity key={tab.id} onPress={handleTabPress(tab.screen, tab.screenData)}>
                    <View style={styles.tab}>
                        <View style={[isProfile && isActive && styles.tabIconActiveWrapper]}>
                            <Image
                                style={[styles.tabIcon, isProfile && styles.tabProfileIcon]}
                                source={ isProfile
                                    ? require('./icons/avatar.png')
                                    : isActive ? (tab.iconActive || tab.icon) : tab.icon}
                            />
                        </View>
                        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
                        {tab.id === 'notifications' && notificationsNumber > 0 && <View style={styles.numberWrapper}>
                            <Text style={styles.number}>{notificationsNumber > 9 ? '9+' : `${notificationsNumber}`}</Text>
                        </View>}
                    </View>
                </TouchableOpacity>;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        borderTopColor: '#F1F1F1',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 28,
        paddingRight: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.WHITE
    },
    tab: {
        alignItems: 'center'
    },
    tabIconActiveWrapper: {
        padding: 1,
        borderWidth: 1,
        borderColor: COLORS.BLUE,
        borderRadius: 10000,
        overflow: 'hidden'
    },
    tabIcon: {
        width: 20,
        height: 20
    },
    tabProfileIcon: {
        borderRadius: 10000,
        overflow: 'hidden'
    },
    tabLabel: {
        marginTop: 6,
        color: COLORS.GREY,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 10
    },
    tabLabelActive: {
        color: '#333333',
        fontFamily: FONTS.GILROY_SEMI_BOLD
    },
    numberWrapper: {
        position: 'absolute',
        top: -4,
        right: 18,
        borderRadius: 10000,
        width: 14,
        height: 14,
        backgroundColor: COLORS.RED,
        borderColor: COLORS.WHITE,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        color: COLORS.WHITE,
        fontSize: 9
    }
});

export default BottomMenu;
