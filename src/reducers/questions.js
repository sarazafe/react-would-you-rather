import {ADD_QUESTION, GET_QUESTIONS} from "../actions/questions";

/**
 * Reducer for questions
 * @param state the state
 * @param action the action
 */
export const questions = (state = {}, action) => {
	switch (action.type) {
		case GET_QUESTIONS :
			return {
				...state,
				...action.questions
			};
		case ADD_QUESTION:
			return {
				...state,
				[action.question.id]: action.question,
			};
		default :
			return state;
	}
};