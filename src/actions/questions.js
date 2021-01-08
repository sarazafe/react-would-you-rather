import {saveQuestion} from "../common/api";
import { showLoading, hideLoading } from 'react-redux-loading';

export const GET_QUESTIONS = 'GET_QUESTIONS';

/**
 * Action for getting the questions
 * @param questions - the list of questions
 */
export const getQuestions = (questions) => {
	return {
		type: GET_QUESTIONS,
		questions,
	}
};

/**
 * Handler for adding a new question
 * @param question - the question to be added
 * @returns {function(*, *): Promise<unknown>}
 */
export const handleAddNewQuestion = (question) => {
	return (dispatch) => {
		dispatch(showLoading())
		return saveQuestion(question)
			.then(() => dispatch(hideLoading()))
	}
};