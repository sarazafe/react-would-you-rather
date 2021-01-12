import {
	_getUsers,
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
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

/**
 * Answers the poll
 * @param loggedUser - user in session
 * @param qid - id of the question
 * @param answer - the selected answer (one of these: optionOne or optionTwo)
 * @returns {Promise<unknown>}
 */
export const answerPoll = ({ loggedUser, qid, answer }) => {
	return _saveQuestionAnswer({ authedUser: loggedUser, qid, answer })
}
