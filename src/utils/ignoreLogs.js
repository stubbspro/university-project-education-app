import { LogBox, Platform } from 'react-native';

if (Platform.OS !== 'web') {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}
