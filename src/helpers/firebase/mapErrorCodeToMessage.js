function mapErrorCodeToMessage(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email address.'
        case 'auth/user-disabled':
            return 'This user has been disabled.'
        case 'auth/user-not-found':
            return 'User not found.'
        case 'auth/wrong-password':
            return 'Wrong password.'
        case 'auth/email-already-in-use':
            return 'Email already in use.'
        case 'auth/operation-not-allowed':
            return 'Operation not allowed.'
        case 'auth/weak-password':
            return 'Password is too weak. (should be at least 6 characters)'
        default:
            return 'Something went wrong.'
    }
}

export default mapErrorCodeToMessage;