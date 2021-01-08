import {
	_getUsers,
	_getQuestions, _saveQuestion,
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

/**
 * Saves a question
 * @param question - the question to be saved
 * @returns {Promise<unknown>}
 */
export const saveQuestion = (question) => {
	return _saveQuestion(question);
}