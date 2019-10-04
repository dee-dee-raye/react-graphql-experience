import { AuthActionTypes } from '../actions/auth';

export function loggedIn(state = false, action) {
    switch (action.type) {
        case AuthActionTypes.SET_LOGGED_IN:
            return action.loggedIn;
        default:
            return state;
    }
}

export function profile(user = {}, action) {
    if (action.type === AuthActionTypes.SET_PROFILE) {
        return {
            ...action.profile
        };
    }
    return user;
}

export function token(state = {}, action) {
    switch (action.type) {
        case AuthActionTypes.SET_TOKEN:
            return action.token;
        default:
            return state;
    }
}

export function currentUser(currentUser = {}, action) {
    if (action.type === AuthActionTypes.SET_CURRENT_USER) {
        return {
            ...action.currentUser
        }
    }
    return currentUser
}
