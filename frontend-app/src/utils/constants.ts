export const EMAIL_VALIDATION_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_VALIDATION_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
export const VALIDATIONS = {
    NAME: {
        REQUIRED: 'Name is required'
    },
    EMAIL: {
        REQUIRED: 'Email is required',
        IS_NOT_VALID_EMAIL: 'Email address is not valid'
    },
    PASSWORD: {
        REQUIRED: 'Password is required',
        MIN_LENGTH: 'Password must be at least 8 characters long',
        INPUT_VALIDATION: 'Password must contain at least one letter, one number, and one special character'
    }
}
export const AUTH_MESSAGES = {
    USER_REGISTERED_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
    TOKEN_VERIFICATION_UNSUCESSFUL: "Unable to verify token",
    EMAIL_ALREADY_EXISTS: "Email already exists!",
    EMAIL_NOT_REGISTERED: "Email not registered",
    INCORRECT_PASSWORD: "Incorrect password",
    LOGIN_TO_ACCESS: "Please login to access this resource"
}