import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import 'react-step-progress-bar/styles.css';
import Header from './Header';
import {Nav} from './Nav';
import {PollDetails} from './PollDetails';
import AnswerPoll from './AnswerPoll';
import './QuestionDetails.css';
import {QuestionCard} from './QuestionCard';

/**
 * Component for question details page
 */
class QuestionDetails extends Component {
	render() {
		const {loggedUser, history: {location: {pathname}}} = this.props;
		const questionId = pathname.replaceAll('/questions/', '')
		if (!loggedUser) {
			return <Redirect push to={{
				pathname: '/login',
				state: {referrer: `/questions/${questionId}`}
			}}/>;
		}

		if (!this.props.question) {
			return <Redirect push to='/404'/>;
		}

		const {question: {id, author: {name, avatarURL}, optionOne, optionTwo, totalOfVotes, unanswered}} = this.props;
		return (
			<div>
				<Header/>
				<Nav/>
				<div className='question-details'>
					<QuestionCard name={name} avatarURL={avatarURL} title={`${name} asks:`}>
						<div className='question-details-body'>
							<div className='question-details-body-title'>
								Would you rather?
							</div>
							{
								unanswered ? (
										<AnswerPoll qid={id} optionOne={optionOne.text} optionTwo={optionTwo.text}/>
									)
									: <PollDetails optionOne={optionOne} optionTwo={optionTwo}
									               totalOfVotes={totalOfVotes}/>
							}
						</div>
					</QuestionCard>
				</div>
			</div>
		);
	}
}

/**
 * Gets all data of a question. This includes the total of votes, the percentage of votes per each option and
 * which question has answered the user in session if he/she has answered one of them
 * @param question - the question to get data from
 * @param users - the map of users
 * @param loggedUser - the user in session
 * @returns the question with all needed data
 */
const getQuestionData = (question, users, loggedUser) => {
	// Get author info
	const {id, name, avatarURL} = users[question.author];

	const questionData = {
		...question,
		author: {
			id,
			name,
			avatarURL,
		},
	};

	// Check if logged user has answered the poll
	const {optionOne, optionTwo} = question;
	if (!optionOne.votes.find(v => v === loggedUser.id) &&
		!optionTwo.votes.find(v => v === loggedUser.id)) {
		return {
			...questionData,
			unanswered: true,
		}
	}

	const totalOfVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
	return {
		...questionData,
		optionOne: {
			...optionOne,
			percentage: Math.round((optionOne.votes.length / totalOfVotes) * 100),
			answered: optionOne.votes.findIndex(v => v === loggedUser.id) >= 0
		},
		optionTwo: {
			...optionTwo,
			percentage: Math.round((optionTwo.votes.length / totalOfVotes) * 100),
			answered: optionTwo.votes.findIndex(v => v === loggedUser.id) >= 0
		},
		totalOfVotes,
	};
}

const mapStateToProps = ({loggedUser, users, questions}, {match: {params: {question_id}}}) => {
	if (!loggedUser) {
		return {};
	}

	return {
		loggedUser,
		question: questions[question_id] ? getQuestionData(questions[question_id], users, loggedUser) : null,
	};
};

export default connect(mapStateToProps)(QuestionDetails);