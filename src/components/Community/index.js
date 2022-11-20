import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import useOnLayout from '../../hooks/useOnLayout';
import formatGridData from '../../utils/formatGridData';

import { COLORS, FONTS } from '../../styles/theme';

const gift = require('./images/gift.png');

const SHOWED_USERS_AMOUNT = 6;
const numColumns = 3;

const Community = ({ users }) => {
    const [{ width: userCardWidth }, onLayout] = useOnLayout();
    const visibleUsers = users.slice(0, SHOWED_USERS_AMOUNT);

    const renderItem = ({ item: user, index }) => {
        if (user.empty === true) {
            return <View key={index} style={[
                styles.userCard,
                ...(user.lastItemInRow ? [styles.lastItemInRow] : [])
            ]} />;
        }

        return (
            <View
                key={index}
                style={[
                    styles.userCard,
                    ...(user.lastItemInRow ? [styles.lastItemInRow] : [])
                ]}
                {...(!index ? { onLayout } : {})}
            >
                <TouchableOpacity>
                    <Image source={user.avatar} style={[
                        styles.userCardAvatar,
                        {
                            height: userCardWidth,
                            borderRadius: 8 * userCardWidth / 100
                        }
                    ]}/>
                    <Text style={styles.userCardTitle} numberOfLines={1}>{user.name}</Text>
                    <View style={styles.userCardLabel}>
                        <Text style={styles.userCardLabelText}>{user.giftsNumber}</Text>
                        <Image source={gift} style={styles.userCardLabelImage}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={formatGridData(visibleUsers, numColumns)}
                    style={styles.container}
                    renderItem={renderItem}
                    numColumns={numColumns}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyExtractor={user => user._id}
                />
            </View>
        </View>
    );
};

Community.propTypes = {
    users: PropTypes.array
};

Community.defaultProps = {
    users: []
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userCard: {
        flex: 1,
        marginTop: 18,
        marginRight: 10
    },
    userCardAvatar: {
        width: '100%',
        borderRadius: 8
    },
    lastItemInRow: {
        marginRight: 0
    },
    userCardTitle: {
        color: COLORS.BLACK,
        fontFamily: FONTS.GILROY_SEMI_BOLD,
        fontSize: 14,
        lineHeight: 16,
        marginTop: 14
    },
    userCardLabel: {
        flexDirection: 'row',
        backgroundColor: COLORS.WHITE,
        position: 'absolute',
        top: 10,
        right: 0,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10

    },
    userCardLabelText: {
        color: COLORS.BLUE,
        fontFamily: FONTS.GILROY_MEDIUM,
        fontSize: 10,
        lineHeight: 12,
        marginRight: 3
    },
    userCardLabelImage: {
        width: 10,
        height: 10
    }
});

export default Community;
