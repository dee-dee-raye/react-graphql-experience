export const AuthActionTypes = {
    SET_LOGGED_IN: 'SET_LOGGED_IN',
    SET_PROFILE: 'SET_PROFILE',
    SET_TOKEN: 'SET_TOKEN'
};

export const setLoggedIn = loggedIn => ({
    type: AuthActionTypes.SET_LOGGED_IN,
    loggedIn
});

export const setProfile = profile => ({
    type: AuthActionTypes.SET_PROFILE,
    profile
});

export const setToken = token => ({
    type: AuthActionTypes.SET_TOKEN,
    token
});
