import {GET_USERS} from '../actions/users';

/**
 * Reducer for users
 * @param state the state
 * @param action the action
 */
export const users = (state = {}, action) => {
	switch (action.type) {
		case GET_USERS :
			return {
				...state,
				...action.users
			}
		default :
			return state
	}
};