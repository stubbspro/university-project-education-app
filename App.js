import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// import GetStarted from './src/screens/GetStarted';
// import SignIn from './src/screens/SignIn';
// import SignUp from './src/screens/SignUp';
// import ForgetPassword from './src/screens/ForgetPassword';
// import ForgetPasswordCode from './src/screens/ForgetPasswordCode';
// import NewPassword from './src/screens/NewPassword';
// import CreateAccount from './src/screens/CreateAccount';
// import PhotosEditor from './src/screens/PhotosEditor';
// import QuizSelect from './src/screens/QuizSelect';
// import Quiz from './src/screens/Quiz';
// import QuizResults from './src/screens/QuizResults';
// import SyncContactSelect from './src/screens/SyncContactSelect';
// import SyncContactList from './src/screens/SyncContactList';
// import SyncContactInviteList from './src/screens/SyncContactInviteList';
// import AddPerson from './src/screens/AddPerson';
// import Profile from './src/screens/Profile';
// import ProfileFriend from './src/screens/ProfileFriend';
// import UpcomingEvents from './src/screens/UpcomingEvents';
// import Bookmarks from './src/screens/Bookmarks';
// import Community from './src/screens/Community';
// import Wishlists from './src/screens/Wishlists';
// import Wishlist from './src/screens/Wishlist';
// import SettingsMenu from './src/screens/SettingsMenu';
// import EditProfile from './src/screens/EditProfile';
// import Personality from './src/screens/Personality';
// import Interests from './src/screens/Interests';
// import Terms from './src/screens/Terms';
// import Policy from './src/screens/Policy';
// import ReminderSettings from './src/screens/ReminderSettings';
// import NotificationSettings from './src/screens/NotificationSettings';
// import SocialMedia from './src/screens/SocialMedia';
// import AddressBook from './src/screens/AddressBook';
// import AddressForm from './src/screens/AddressForm';
// import Notifications from './src/screens/Notifications';
// import Calendar from './src/screens/Calendar';
// import CalendarYears from './src/screens/CalendarYears';
// import AddEvent from './src/screens/AddEvent';
// import EventNotifications from './src/screens/EventNotifications';

import Preloader from './src/components/Preloader';

import getKeyboardBehaviorByOS from './src/utils/getKeyboardBehaviorByOS';

import { createStackNavigator } from '@react-navigation/stack';

import { useFonts } from 'expo-font';

// import './src/utils/ignoreLogs';

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

    return null;

    return <>
        <KeyboardAvoidingView
            behavior={getKeyboardBehaviorByOS()}
            style={{ flex: 1 }}
        >
            <NavigationContainer ref={navigator}>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GetStarted">
                    {/* <Stack.Screen name="GetStarted" component={GetStarted} /> */}
                    {/* <Stack.Screen name="SignIn" component={SignIn} /> */}
                    {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
                    {/* <Stack.Screen name="ForgetPassword" component={ForgetPassword} /> */}
                    {/* <Stack.Screen name="ForgetPasswordCode" component={ForgetPasswordCode} /> */}
                    {/* <Stack.Screen name="NewPassword" component={NewPassword} /> */}
                    {/* <Stack.Screen name="CreateAccount" component={CreateAccount} /> */}
                    {/* <Stack.Screen name="PhotosEditor" component={PhotosEditor} /> */}
                    {/* <Stack.Screen name="QuizSelect" component={QuizSelect} /> */}
                    {/* <Stack.Screen name="Quiz" component={Quiz} /> */}
                    {/* <Stack.Screen name="QuizResults" component={QuizResults} /> */}
                    {/* <Stack.Screen name="SyncContactSelect" component={SyncContactSelect} /> */}
                    {/* <Stack.Screen name="SyncContactList" component={SyncContactList} /> */}
                    {/* <Stack.Screen name="SyncContactInviteList" component={SyncContactInviteList} /> */}
                    {/* <Stack.Screen name="AddPerson" component={AddPerson} /> */}
                    {/* <Stack.Screen name="Profile" component={Profile} /> */}
                    {/* <Stack.Screen name="ProfileFriend" component={ProfileFriend} /> */}
                    {/* <Stack.Screen name="UpcomingEvents" component={UpcomingEvents} /> */}
                    {/* <Stack.Screen name="Bookmarks" component={Bookmarks} /> */}
                    {/* <Stack.Screen name="Community" component={Community} /> */}
                    {/* <Stack.Screen name="Wishlists" component={Wishlists} /> */}
                    {/* <Stack.Screen name="Wishlist" component={Wishlist} /> */}
                    {/* <Stack.Screen name="SettingsMenu" component={SettingsMenu} /> */}
                    {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
                    {/* <Stack.Screen name="Personality" component={Personality} /> */}
                    {/* <Stack.Screen name="Interests" component={Interests} /> */}
                    {/* <Stack.Screen name="NotificationSettings" component={NotificationSettings} /> */}
                    {/* <Stack.Screen name="ReminderSettings" component={ReminderSettings} /> */}
                    {/* <Stack.Screen name="SocialMedia" component={SocialMedia} /> */}
                    {/* <Stack.Screen name="Terms" component={Terms} /> */}
                    {/* <Stack.Screen name="Policy" component={Policy} /> */}
                    {/* <Stack.Screen name="AddressBook" component={AddressBook} /> */}
                    {/* <Stack.Screen name="AddressForm" component={AddressForm} /> */}
                    {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
                    {/* <Stack.Screen name="Calendar" component={Calendar} /> */}
                    {/* <Stack.Screen name="CalendarYears" component={CalendarYears} /> */}
                    {/* <Stack.Screen name="AddEvent" component={AddEvent} /> */}
                    {/* <Stack.Screen name="EventNotifications" component={EventNotifications} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </KeyboardAvoidingView>
    </>;
};

export default App;
