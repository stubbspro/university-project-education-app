import React, { useEffect, useState, useCallback } from 'react';

import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';

import NavigationTop from '../../components/NavigationTop';
import Input from '../../components/Input';

import { SwipeListView } from 'react-native-swipe-list-view';

import { COLORS, FONTS } from '../../styles/theme';

const giftIcon = require('./icons/gift.png');

const REMOVE_BUTTON_WIDTH = 99;

const Community = () => {
    const community = [
        { name: 'Супруненко Давид', avatar: require('./images/community/avatar1.jpeg'), giftsNumber: 3 },
        { name: 'Танцюра Ярослав', avatar: require('./images/community/avatar3.jpeg'), giftsNumber: 0 },
        { name: 'Кругляк Христина', avatar: require('./images/community/avatar2.jpeg'), giftsNumber: 1 },
        { name: 'Філюк Федір', avatar: require('./images/community/avatar4.jpeg'), giftsNumber: 1 },
        { name: 'Гембицький Юліан', avatar: require('./images/community/avatar5.jpeg'), giftsNumber: 5 },
        { name: 'Мацюк Іванна', avatar: require('./images/community/avatar6.jpeg'), giftsNumber: 4 }
    ];

    const [users, setUsers] = useState('');
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = useCallback(value => {
        setSearchText(value);
    }, []);

    useEffect(() => {
        setUsers(
            community
                .filter(user => user.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        );
    }, [searchText]);

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <NavigationTop backScreenName='Profile' label={`${community.length} друзів`} />
                    <View style={[styles.section, styles.sectionWithoutBorder]}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionSearch}>
                                <Input label='Пошук...' icon='search' value={searchText} onChange={handleSearchChange}/>
                            </View>
                        </View>
                        <View style={styles.listBlock}>
                            <SwipeListView
                                data={users}
                                renderItem={data => {
                                    return (
                                        <TouchableOpacity key={data.item.name}>
                                            <View style={styles.row}>
                                                <Image source={data.item.avatar} style={styles.rowPhoto} />
                                                <View style={styles.rowInfo}>
                                                    <Text style={styles.rowName}>{data.item.name}</Text>
                                                    <View style={styles.giftBlock}>
                                                        <Text style={styles.giftCount}>{data.item.giftsNumber}</Text>
                                                        <Image style={styles.giftIcon} source={giftIcon} />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                renderHiddenItem={() => (
                                    <View style={styles.rowBack}>
                                        <TouchableOpacity>
                                            <View style={styles.rowBackDelete}>
                                                <Text style={styles.rowBackDeleteTitle}>👍</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                rightOpenVddlue={-REMOVE_BUTTON_WIDTH}
                                keyExtractor={user => user.name}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        flex: 1,
        paddingLeft: 20,
        paddingBottom: 100
    },
    section: {
        marginTop: 30,
        paddingTop: 25,
        borderTopWidth: 1,
        borderColor: '#F1F1F1'

    },
    sectionWithoutBorder: {
        marginTop: 0,
        borderTopWidth: 0
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20
    },
    sectionSearch: {
        flex: 1,
        width: '100%'
    },
    sectionHeaderButtons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionButton: {
        padding: 10,
        marginLeft: 10
    },
    sectionButtonIcon: {
        width: 20,
        height: 20
    },
    listBlock: {
        marginTop: 20
    },
    row: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        flexDirection: 'row',
        backgroundColor: COLORS.WHITE,
        height: 60
    },
    rowPhoto: {
        width: 40,
        height: 40,
        borderRadius: 10000
    },
    rowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        marginLeft: 14
    },
    rowName: {
        fontSize: 16,
        fontFamily: FONTS.GILROY_BOLD,
        color: COLORS.BLACK
    },
    giftBlock: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE,
        elevation: 1,
        shadowColor: 'rgba(11, 9, 101, 0.06)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 10
    },
    giftCount: {
        color: COLORS.BLUE,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 12
    },
    giftIcon: {
        width: 14,
        height: 14,
        marginLeft: 2
    },
    rowBack: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 15
    },
    rowBackDelete: {
        backgroundColor: COLORS.BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: REMOVE_BUTTON_WIDTH
    },
    rowBackDeleteIcon: {
        width: 20,
        height: 20
    },
    rowBackDeleteTitle: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontFamily: FONTS.GILROY_MEDIUM
    },
    addPerson: {
        padding: 17,
        borderRadius: 10000,
        backgroundColor: COLORS.BLUE,
        zIndex: 1,
        position: 'absolute',
        right: 20,
        bottom: 40
    },
    addPersonIcon: {
        width: 20,
        height: 20
    }
});

export default Community;
