import {saveQuestion} from "../common/api";
import { showLoading, hideLoading } from 'react-redux-loading';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

/**
 * Action for getting the questions
 * @param questions - the list of questions
 */
export const getQuestions = questions => {
	return {
		type: GET_QUESTIONS,
		questions,
	};
};

export const addQuestion = question => {
	return {
		type: ADD_QUESTION,
		question,
	};
};

/**
 * Handler for adding a new question
 * @param question - the question to be added
 * @returns {function(*, *): Promise<unknown>}
 */
export const handleAddNewQuestion = question => {
	return (dispatch) => {
		dispatch(showLoading())
		return saveQuestion(question)
			.then((tweet) => dispatch(addQuestion(tweet)))
			.then(() => dispatch(hideLoading()))
	}
};