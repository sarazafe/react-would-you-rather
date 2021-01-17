import React from 'react';
import './QuestionCard.css';

/**
 * Component that represents a question card. The structure will be:
 * - the name of the user as title
 * - the avatar of the user
 * - a custom body
 * @param name - the name of the user
 * @param avatarURL - the url of user's avatar
 * @param children - the content that will be render inside the body of the card
 * @param title - the title of the card
 * @returns {JSX.Element}
 * @constructor
 */
export const QuestionCard = ({name, avatarURL, children, title}) => {
	return (
		<div className='question-card'>
			<div className='question-card-header'>
				<span>{title}</span>
			</div>
			<div className='question-card-body'>
				<div className='question-card-body-avatar'>
					<img src={avatarURL} alt={`${name}'s avatar`}/>
				</div>
				{children}
			</div>
		</div>);
};