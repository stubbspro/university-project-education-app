import React from 'react';

import { StyleSheet, Image, Animated } from 'react-native';

const Preloader = () => {
    return (
        <Animated.View style={styles.root}>
            <Image style={styles.logo} source={require('./images/logo.png')} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    logo: {
        width: 200,
        height: 45
    }
});

export default Preloader;
