export const GET_USERS = 'GET_USERS';
export const ADD_CREATED_QUESTION_TO_USER = 'ADD_CREATED_QUESTION_TO_USER';
export const ADD_ANSWERED_QUESTION_TO_USER = 'ADD_ANSWERED_QUESTION_TO_USER';

/**
 * Action for getting the users
 * @param users - the list of users
 */
export const getUsers = users => {
	return {
		type: GET_USERS,
		users,
	};
};

/**
 * Action for adding created question to a user
 * @param author - the author of the question
 * @param id - the id of the question
 * @returns {{author: *, type: string, qid: *}}
 */
export const addCreatedQuestionToUser = ({author, id}) => {
	return {
		type: ADD_CREATED_QUESTION_TO_USER,
		author,
		qid: id,
	};
}

/**
 * Action for adding an answered question to a user
 * @param user - the user that answered the questions
 * @param qid - the id of the question
 * @param answer - the answer
 * @returns {{author: *, type: *, qid: *}}
 */
export const addAnsweredQuestionToUser = ({user, qid, answer})=> {
	return {
		type: ADD_ANSWERED_QUESTION_TO_USER,
		user,
		qid,
		answer,
	};
}
