import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

export const requiredValidator = errorText => (value = '') => {
    value = typeof value === 'string' ? value.trim() : `${value}`;

    return !isEmpty(value) ? null : errorText;
};

export const emailValidator = errorText => (value = '') => {
    if (!value) {
        return true;
    }
    value = typeof value === 'string' ? value.trim() : `${value}`;

    return isEmail(value) ? null : errorText;
};

const validatorsMap = {
    required: requiredValidator,
    email: emailValidator
};

export const validateField = (value, field) => {
    if (!field) {
        return null;
    }

    return field.validators.reduce((result, validator) => {
        if (result) {
            return result;
        }
        return validatorsMap[validator.name](validator.errorText)(value);
    }, false);
};

export const validateFields = (values, fields) => {
    const errors = fields
        .reduce((result, field) => {
            const error = validateField(values[field.name], field);
            return {
                ...result,
                [field.name]: error
            };
        }, {});
    let isValid = true;

    for (const fieldName in errors) {
        if (isValid) {
            if (errors[fieldName]) {
                isValid = false;
            }
        }
    }

    return {
        isValid,
        errors
    };
};
