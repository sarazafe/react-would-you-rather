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