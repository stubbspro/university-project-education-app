import { Platform } from 'react-native';

const getKeyboardBehaviorByOS = () => {
    return Platform.OS === 'ios' ? 'padding' : 'height';
};

export default getKeyboardBehaviorByOS;
