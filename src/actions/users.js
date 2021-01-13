export const GET_USERS = 'GET_USERS';
export const ADD_CREATED_QUESTION_TO_USER = 'ADD_CREATED_QUESTION_TO_USER';

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

export const addCreatedQuestionToUser = question => {
	return {
		type: ADD_CREATED_QUESTION_TO_USER,
		author: question.author,
		qid: question.id,
	};
}