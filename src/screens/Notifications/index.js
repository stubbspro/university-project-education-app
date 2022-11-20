import React from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import NavigationTop from '../../components/NavigationTop';
import BottomMenu from '../../components/BottomMenu';

import { COLORS, FONTS } from '../../styles/theme';

const Notifications = () => {
    const notificationsGroups = [
        {
            title: 'Нові',
            notifications: [
                { text: 'Уху! Антон залишив тобі нову реацію - 👍. Так тримати!', dateText: '2 години назад' },
                { text: 'Завтра День вчителя, не забудьте привітати своїх викладачів 🎉', dateText: '6 годин назад' }
            ]
        },
        {
            title: 'Цього тижня',
            notifications: [
                { text: 'Вчитель оцінив твою роботу з теми "Початок українського національного відродження" 🧑‍🏫', dateText: 'Вчора' }
            ]
        },
        { title: 'Цього місяця', notifications: [] },
        {
            title: 'Раніше',
            notifications: [
                { text: 'Доступнй новий урок на тему "Культурне життя поляків на території України в 19 столітті" 🤓', dateText: '3 дні тому' },
                { text: 'Уху! Христина залишила тобі нову реацію - 😊. Так тримати!', dateText: '5 днів тому' }
            ]
        }
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.navigationWrap}>
                        <NavigationTop label='Notification' noBack />
                    </View>
                    <View>
                        {notificationsGroups.map((notificationsGroup, i) => {
                            if (!notificationsGroup.notifications.length) {
                                return null;
                            }

                            return <View key={i} style={styles.notificationGroup}>
                                <View style={styles.notificationGroupHeader}>
                                    <View style={styles.line} />
                                    <Text style={styles.notificationGroupHeaderTitle}>{notificationsGroup.title}</Text>
                                    <View style={styles.line} />
                                </View>
                                <View style={styles.notifications}>
                                    {notificationsGroup.notifications.map((notification, i) => {
                                        return <View style={styles.notification} key={i}>
                                            <View style={styles.notificationInfo}>
                                                <Text style={styles.notificationText}>
                                                    {notification.text}
                                                    <TouchableOpacity>
                                                        <Text style={styles.notificationMoreDetails}>Переглянути</Text>
                                                    </TouchableOpacity>
                                                </Text>
                                                <Text style={styles.notificationDate}>{notification.dateText}</Text>
                                            </View>
                                        </View>;
                                    })}
                                </View>
                            </View>;
                        })}
                    </View>
                </View>
            </ScrollView>
            <BottomMenu />
        </View>
    );
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
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    navigationWrap: {
        paddingLeft: 20,
        paddingRight: 20
    },
    notificationGroup: {
        marginTop: 27
    },
    notificationGroupHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        height: 1
    },
    notificationGroupHeaderTitle: {
        textTransform: 'uppercase',
        color: COLORS.GREY,
        fontFamily: FONTS.GILROY_SEMI_BOLD,
        fontSize: 12,
        paddingLeft: 6,
        paddingRight: 6
    },
    notifications: {
        flex: 1

    },
    notification: {
        marginTop: 14,
        flexDirection: 'row'
    },
    notificationAvatar: {
        width: 35,
        height: 35,
        borderRadius: 10000
    },
    notificationInfo: {
        marginLeft: 16,
        paddingRight: 30
    },
    notificationText: {
        color: COLORS.BLACK,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 14
    },
    notificationMoreDetails: {
        color: COLORS.BLUE,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 14,
        marginLeft: 4,
        textDecorationLine: 'underline',
        position: 'relative',
        top: 1
    },
    notificationDate: {
        color: COLORS.GREY,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 12,
        marginTop: 8
    }
});

export default Notifications;
