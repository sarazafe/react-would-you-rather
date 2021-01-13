import {ADD_ANSWERED_QUESTION_TO_USER, ADD_CREATED_QUESTION_TO_USER, GET_USERS} from '../actions/users';

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
			};
		case ADD_CREATED_QUESTION_TO_USER:
			const {questions} = state[action.author];
			return  {
				...state,
				[action.author]: {
					...state[action.author],
					questions: questions.concat(action.qid),
				}
			};
		case ADD_ANSWERED_QUESTION_TO_USER:
			const {answers} = state[action.user];
			return  {
				...state,
				[action.user]: {
					...state[action.user],
					answers: {
						...answers,
						[action.qid]: action.answer,
					},
				}
			};
		default :
			return state
	}
};