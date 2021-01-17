import {LOGOUT_USER, SET_LOGGED_USER} from '../actions/loggedUser';

/**
 * Reducer for logged user action
 * @param state - the state
 * @param action - the action
 */
export const loggedUser = (state = null, action) => {
	switch (action.type) {
		case SET_LOGGED_USER :
			return action.id;
		case LOGOUT_USER:
			return null;
		default :
			return state;
	}
};