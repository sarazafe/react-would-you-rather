import {
	_getUsers,
	_getQuestions,
} from './_DATA.js';

/**
 * Gets initial data from _DATA.js file
 * @returns {Promise<{users: *}>}
 */
export const getInitialData = ()=> {
	return Promise.all([
		_getUsers(),
		_getQuestions(),
	]).then(([users, questions]) => ({
		users,
		questions,
	}))
}