export const GET_USERS = 'GET_USERS';

/**
 * Action for getting the users
 * @param users - the list of users
 */
export const getUsers = (users) => {
	return {
		type: GET_USERS,
		users,
	}
};