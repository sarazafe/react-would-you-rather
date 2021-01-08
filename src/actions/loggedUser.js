export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

/**
 * Action for logged user
 * @param id - the id of the user
 */
export const setLoggedUser = (id) => {
	return {
		type: SET_LOGGED_USER,
		id,
	};
};

/**
 * Action for logout the user
 */
export const logoutUser = ()=> {
	return {
		type: LOGOUT_USER,
	}
}