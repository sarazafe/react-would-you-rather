import {ADD_QUESTION, ANSWER_QUESTION, GET_QUESTIONS} from "../actions/questions";

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
		case ANSWER_QUESTION:
			const {text, votes} = state[action.qid][action.answer];
			return {
				...state,
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						text,
						votes: votes.concat(action.user),
					},
				}
			};
		default :
			return state;
	}
};