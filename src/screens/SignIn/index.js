import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, ScrollView } from 'react-native';

import NavigationTop from '../../components/NavigationTop';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';

import * as SecureStore from 'expo-secure-store';

import { validateField, validateFields } from '../../utils/validators';

import signIn from '../../services/signIn';

import { useDispatch } from 'react-redux';
import setAuthorized from '../../store/actions/setAuthorized';
import setToken from '../../store/actions/setToken';

import getNextScreenByRegistrationStage from '../../utils/getNextScreenByRegistrationStage';

import { COLORS, FONTS } from '../../styles/theme';

const FIELDS = [
    {
        name: 'email',
        validators: [{ name: 'required', errorText: 'Error! Please enter an email.' }, { name: 'email', errorText: 'Error! Please enter a valid email.' }]
    },
    {
        name: 'password',
        validators: [{ name: 'required', errorText: 'Error! Please enter password.' }]
    }
];
const FIELDS_MAP = FIELDS.reduce((result, field) => ({
    ...result,
    [field.name]: field
}), {});

const SignIn = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({ remember: true, email: route.params?.email });
    const [errors, setErrors] = useState({});
    const handleChange = useCallback(name => value => {
        setValues(values => ({ ...values, [name]: value }));
    }, []);
    const handleFocus = useCallback(name => () => {
        setErrors(errors => ({ ...errors, [name]: false }));
    }, []);
    const handleBlur = useCallback(name => () => {
        setErrors(errors => ({ ...errors, [name]: validateField(values[name], FIELDS_MAP[[name]]) }));
    }, [values]);

    const handleLinkClick = useCallback(() => {
        navigation.navigate('ForgetPassword', { email: values.email });
    }, [values]);

    const handleSubmit = useCallback(() => {
        const { errors, isValid } = validateFields(values, FIELDS);

        setErrors(errors);

        if (isValid) {
            const payload = {
                email: values.email,
                password: values.password
            };

            signIn(JSON.stringify(payload))
                .then(({ token, user }) => {
                    if (values.remember) {
                        SecureStore.setItemAsync('token', token);
                    }
                    dispatch(setToken(token));
                    dispatch(setAuthorized(true));

                    navigation.navigate(getNextScreenByRegistrationStage(user.registrationStage));
                })
                .catch(() => {
                    setErrors(errors => ({ ...errors, password: 'Incorrect email or password' }));
                });
        }
    }, [values]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <NavigationTop backScreenName='GetStarted' />
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.field}>
                        <Input
                            label='Email'
                            value={values.email}
                            onChange={handleChange('email')}
                            onFocus={handleFocus('email')}
                            onBlur={handleBlur('email')}
                            autoCompleteType='email'
                            icon='email'
                            error={errors.email}
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.field}>
                        <Input
                            label='Password'
                            value={values.password}
                            onChange={handleChange('password')}
                            onFocus={handleFocus('password')}
                            onBlur={handleBlur('password')}
                            secureTextEntry
                            autoCompleteType='password'
                            link={{ onPress: handleLinkClick, label: 'Forgot Password?' }}
                            icon='password'
                            error={errors.password}
                            autoCapitalize='none'
                        />
                    </View>
                    <Checkbox label='Remember me' value={values.remember} onChange={handleChange('remember')} />
                </View>
            </ScrollView>
            <View style={styles.button}>
                <Button label='Log In' onPress={handleSubmit} />
            </View>
        </View>
    );
};

SignIn.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
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
        paddingRight: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
        color: COLORS.BLACK,
        fontFamily: FONTS.GILROY_BOLD
    },
    field: {
        marginBottom: 20
    },
    button: {
        marginBottom: 25,
        marginLeft: 20,
        marginRight: 20
    }
});

export default SignIn;
