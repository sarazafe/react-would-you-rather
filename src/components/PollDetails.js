import React from 'react';
import PropTypes from 'prop-types';
import {ProgressBar} from 'react-step-progress-bar';
import './PollDetails.css';

/**
 * Component for the details of a poll
 * @param optionOne - first option
 * @param optionTwo - second option
 * @param totalOfVotes - total of votes
 */
export const PollDetails = ({optionOne, optionTwo, totalOfVotes}) => {
	return (
		<>
			<div
				className={`poll-details-option ${optionOne.answered ? 'poll-details-option--answered' : ''}`}>
				<div className='poll-details-option-text'>
					{optionOne.text}
				</div>
				<div className='poll-details-option-percentage'>
					<ProgressBar percent={optionOne.percentage} text={`${optionOne.percentage}%`}/>
				</div>
				<div className='poll-details-option-votes'>
					{optionOne.votes.length} out of {totalOfVotes} votes
				</div>
			</div>
			<div
				className={`poll-details-option ${optionTwo.answered ? 'poll-details-option--answered' : ''}`}>
				<div className='poll-details-option-text'>
					{optionTwo.text}
				</div>
				<div className='poll-details-option-percentage'>
					<ProgressBar percent={optionTwo.percentage} text={`${optionTwo.percentage}%`}/>
				</div>
				<div className='poll-details-option-votes'>
					{optionTwo.votes.length} out of {totalOfVotes} votes
				</div>
			</div>
		</>
	);
};

PollDetails.propTypes = {
	optionOne: PropTypes.object.isRequired,
	optionTwo: PropTypes.object.isRequired,
	totalOfVotes: PropTypes.number.isRequired,
};