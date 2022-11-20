import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

import Button from '../../components/Button';
import Community from '../../components/Community';
import BottomMenu from '../../components/BottomMenu';

import { COLORS, FONTS } from '../../styles/theme';

const getUserName = name => {
    const userName = name.split(' ').join('-');

    return `@${userName}`.toLowerCase();
};

const Profile = ({ navigation }) => {
    const profile = {
        name: 'Вова Білоус',
        nickname: 'Робот 🤖',
        stats: {
            likes: 43,
            hi: 25,
            smiles: 97,
            hugs: 30
        }
    };
    const community = [
        { name: 'Супруненко Давид', avatar: require('./images/community/avatar1.jpeg'), giftsNumber: 3 },
        { name: 'Танцюра Ярослав', avatar: require('./images/community/avatar3.jpeg'), giftsNumber: 0 },
        { name: 'Кругляк Христина', avatar: require('./images/community/avatar2.jpeg'), giftsNumber: 1 },
        { name: 'Філюк Федір', avatar: require('./images/community/avatar4.jpeg'), giftsNumber: 1 },
        { name: 'Гембицький Юліан', avatar: require('./images/community/avatar5.jpeg'), giftsNumber: 5 },
        { name: 'Мацюк Іванна', avatar: require('./images/community/avatar6.jpeg'), giftsNumber: 4 }
    ];

    const handleCommunityClick = useCallback(() => {
        navigation.navigate('Community');
    }, []);
    const handleSettingsClick = useCallback(() => {
        navigation.navigate('SettingsMenu');
    }, []);

    return (
        <View style={styles.container} >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <Image source={require('./images/bgSpotLeft.png')} style={styles.bgSpotLeft} />
                    <Image source={require('./images/bgSpotRight.png')} style={styles.bgSpotRight} />
                    <View style={styles.header}>
                        <Text style={styles.headerUsername}>{getUserName(profile.name)}</Text>
                        <TouchableOpacity style={styles.settings} onPress={handleSettingsClick}>
                            <Image source={require('./icons/setting.png')} style={styles.settingsIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.personalInfoBlockWrapper}>
                        <View style={styles.personalInfoBlock}>
                            <Image source={require('./images/avatar.png')} style={styles.personalInfoAvatar} />
                            <View style={styles.personalInfo}>
                                <View style={styles.personalInfoNameBlock}>
                                    <Text style={styles.personalInfoName}>{profile.name}</Text>
                                    <Text style={styles.personalInfoLocation}>
                                        {profile.nickname}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.personalInfoMarks}>
                            <Text style={styles.personalInfoMark}>{profile.stats.likes} 👍</Text>
                            <Text style={styles.personalInfoMark}>{profile.stats.hi} 👋</Text>
                            <Text style={styles.personalInfoMark}>{profile.stats.smiles} 😊</Text>
                            <Text style={styles.personalInfoMark}>{profile.stats.hugs} 🤗</Text>
                        </View>
                    </View>
                    <View style={styles.section} >
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionTitles}>
                                <Text style={styles.sectionTitle}>Однокласники</Text>
                                <Text style={styles.sectionSubtitle}>26 друзів</Text>
                            </View>
                        </View>
                        <Community users={community} />
                        <View style={styles.sectionMoreButton}>
                            <Button label='Переглянути всіх' type='buttonLight' onPress={handleCommunityClick} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomMenu />
        </View>
    );
};

Profile.propTypes = {
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
        paddingRight: 20,
        paddingBottom: 20
    },
    bgSpotLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 255,
        height: 191
    },
    bgSpotRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 255,
        height: 341
    },
    header: {
        marginTop: 58,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    headerUsername: {
        textTransform: 'lowercase',
        color: COLORS.BLACK,
        fontFamily: FONTS.GILROY_SEMI_BOLD,
        fontSize: 16
    },
    settings: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    settingsIcon: {
        width: 24,
        height: 24
    },
    personalInfoBlockWrapper: {
        borderRadius: 10,
        backgroundColor: COLORS.WHITE,
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 28,
        marginTop: 14
    },
    personalInfoBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    personalInfoAvatar: {
        width: 64,
        height: 64,
        borderRadius: 10000
    },
    personalInfo: {
        flex: 1,
        width: '100%',
        marginLeft: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    personalInfoName: {
        color: COLORS.BLACK,
        fontFamily: FONTS.GILROY_BOLD,
        fontSize: 18
    },
    personalInfoLocation: {
        color: COLORS.GREY,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 12,
        marginTop: 11
    },
    personalInfoShare: {
        flexDirection: 'row'
    },
    facebookIcon: {
        width: 24,
        height: 24
    },
    twitter: {
        marginLeft: 10
    },
    twitterIcon: {
        width: 24,
        height: 24
    },
    personalInfoMarks: {
        flexDirection: 'row',
        marginTop: 17
    },
    personalInfoMark: {
        marginRight: 64,
        color: COLORS.BLACK,
        fontFamily: FONTS.GILROY_BOLD,
        fontSize: 16
    },
    section: {
        marginTop: 30,
        paddingTop: 25

    },
    sectionWithoutBorder: {
        marginTop: 0,
        borderTopWidth: 0
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionTitles: {
        flex: 1,
        width: '100%'
    },
    sectionTitle: {
        color: COLORS.BLACK,
        fontFamily: FONTS.GILROY_BOLD,
        fontSize: 18
    },
    sectionSubtitle: {
        color: COLORS.GREY_DARK,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 12,
        marginTop: 9
    },
    sectionSettingsIcon: {
        width: 20,
        height: 20
    },
    upcomingEventsBlock: {
        marginTop: 20
    },
    bookmarkBlock: {
        marginTop: 20
    },
    sectionMoreButton: {
        marginTop: 16
    }
});

export default Profile;
