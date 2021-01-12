import {saveQuestion, answerPoll} from "../common/api";
import {showLoading, hideLoading} from 'react-redux-loading';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

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

export const answerQuestion = ({user, qid, answer}) => {
	return {
		type: ANSWER_QUESTION,
		user,
		qid,
		answer,
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
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()))
	}
};

/**
 * Handler for answer a question
 * @param loggedUser - user in session
 * @param qid - id of the question
 * @param answer - the selected answer (one of these: optionOne or optionTwo)
 * @returns {function(*): Promise<unknown>}
 */
export const handleAnswerQuestion = ({loggedUser, qid, answer}) => {
	return (dispatch) => {
		dispatch(showLoading())
		return answerPoll({loggedUser, qid, answer})
			.then(() => dispatch(answerQuestion({user:loggedUser, qid, answer})))
			.then(() => dispatch(hideLoading()))
	}
};