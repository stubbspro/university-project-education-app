import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Profile from './src/screens/Profile';
import Community from './src/screens/Community';
import SettingsMenu from './src/screens/SettingsMenu';
import Notifications from './src/screens/Notifications';

import Preloader from './src/components/Preloader';

import getKeyboardBehaviorByOS from './src/utils/getKeyboardBehaviorByOS';

import { createStackNavigator } from '@react-navigation/stack';

import { useFonts } from 'expo-font';

import './src/utils/ignoreLogs';

const Stack = createStackNavigator();

const PRELOADER_TIME = 1000;

const App = () => {
    const [preloaderShowed, setPreloaderShowed] = useState(true);

    const [loaded] = useFonts({
        GilroyMedium: require('./assets/fonts/Gilroy-Medium.ttf'),
        GilroySemiBold: require('./assets/fonts/Gilroy-SemiBold.ttf'),
        GilroyBold: require('./assets/fonts/Gilroy-Bold.ttf'),
        GilroyRegular: require('./assets/fonts/Gilroy-Regular.ttf')
    });

    useEffect(() => {
        setTimeout(() => setPreloaderShowed(false), PRELOADER_TIME);
    }, []);

    if (!loaded || preloaderShowed) {
        return <Preloader />;
    }

    return <>
        <KeyboardAvoidingView
            behavior={getKeyboardBehaviorByOS()}
            style={{ flex: 1 }}
        >
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Profile">
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Community" component={Community} />
                    <Stack.Screen name="SettingsMenu" component={SettingsMenu} />
                    <Stack.Screen name="Notifications" component={Notifications} />
                </Stack.Navigator>
            </NavigationContainer>
        </KeyboardAvoidingView>
    </>;
};

export default App;
