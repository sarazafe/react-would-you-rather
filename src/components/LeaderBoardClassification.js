import React from 'react';
import {QuestionCard} from './QuestionCard';
import './LeaderBoardClassification.css';

/**
 * Component that represents each classification of leader board
 * @param name - the name of the user
 * @param avatarURL - the url of user's avatar
 * @param answeredQuestions - number of answered questions
 * @param createdQuestions - number of created questions
 * @returns {JSX.Element}
 * @constructor
 */
export const LeaderBoardClassification = ({name, avatarURL, answeredQuestions, createdQuestions}) => {
	return (
		<QuestionCard name={name} avatarURL={avatarURL} title={name}>
			<div className='leader-board-classification'>
				<div className='leader-board-classification-summary'>
					<div className='leader-board-classification-summary-scores'>
						<div className='leader-board-classification-summary-score'>
							<div className='leader-board-classification-summary-score-label'>Answered questions</div>
							<div className='leader-board-classification-summary-score-value'>{answeredQuestions}</div>
						</div>
						<div className='leader-board-classification-summary-score'>
							<div className='leader-board-classification-summary-score-label'>Created questions</div>
							<div className='leader-board-classification-summary-score-value'>{createdQuestions}</div>
						</div>
					</div>
				</div>
				<div className='leader-board-classification-total-score'>
					<div className='leader-board-classification-total-score-title'>
						Score
					</div>
					<div className='leader-board-classification-total-score-score'>
						{answeredQuestions + createdQuestions}
					</div>
				</div>
			</div>
		</QuestionCard>
	);
};