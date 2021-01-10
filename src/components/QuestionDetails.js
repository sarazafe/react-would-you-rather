import React, { Component } from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Header from "./Header";
import {Nav} from "./Nav";

/**
 * Component for question details page
 */
class QuestionDetails extends Component {
	render() {
		const {loggedUser} = this.props;
		if (!loggedUser) {
			return <Redirect push to='/login'/>;
		}
		const {question: {optionOne, optionTwo, totalOfVotes}} = this.props;
		const {name, avatarURL} = loggedUser;
		return (
			<div>
				<Header/>
				<Nav/>
				<div className='question-details'>
					<div className='question-details-avatar'>
						<img src={avatarURL} alt={`${name}'s avatar`}/>
					</div>
					<div className='question-details-poll'>
						<div className='question-details-title'>
							{name} asks <span>Would you rather?</span>
						</div>
						<div className={`question-details-option ${optionOne.answered ? 'question-details-option--answered' : ''}`}>
							<div className='question-details-option-text'>
								{optionOne.text}
							</div>
							<div className='question-details-option-percentage'>
								<ProgressBar percent={optionOne.percentage} text={`${optionOne.percentage}%`} />
							</div>
							<div className='question-details-option-votes'>
								{optionOne.votes.length} out of {totalOfVotes} votes
							</div>
						</div>
						<div className={`question-details-option ${optionTwo.answered ? 'question-details-option--answered' : ''}`}>
							<div className='question-details-option-text'>
								{optionTwo.text}
							</div>
							<div className='question-details-option-percentage'>
								<ProgressBar percent={optionTwo.percentage} text={`${optionTwo.percentage}%`} />
							</div>
							<div className='question-details-option-votes'>
								{optionTwo.votes.length} out of {totalOfVotes} votes
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * Gets all data of a question. This includes the total of votes, the percentage of votes per each option and
 * which question has answered the user in session if he/she has answered one of them
 * @param question - the question to get data from
 * @param loggedUser - the user in session
 * @returns the question with all needed data
 */
const getQuestionData = (question, loggedUser) => {
	const {optionOne, optionTwo} = question;
	const totalOfVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

	return {
			...question,
			optionOne: {
				...optionOne,
				percentage: (optionOne.votes.length / totalOfVotes) * 100,
				answered: optionOne.votes.findIndex(v => v === loggedUser.id) >= 0
			},
			optionTwo: {
				...optionTwo,
				percentage: (optionTwo.votes.length / totalOfVotes) * 100,
				answered: optionTwo.votes.findIndex(v => v === loggedUser.id) >= 0
			},
			totalOfVotes,
	};
}

const mapStateToProps = ({loggedUser, questions}, {match: {params: {question_id}}}) => {
	return {
		loggedUser,
		question: questions[question_id] && loggedUser ? getQuestionData(questions[question_id], loggedUser) : {},
	};
};

export default connect(mapStateToProps)(QuestionDetails);