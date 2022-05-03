import validator from 'validator';

export function validatePassword(value){
    let errorPassword
    if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        errorPassword = 'Password is strong'
    } else {
        errorPassword = 'Password is weak'
    }
    return errorPassword
}

export function validateEmail(value){
    let error
    if (validator.isEmail(value)) {
        error = 'Valid Email :)'
    } else {
        error = 'Enter valid Email!'
    }
    return error;
}
