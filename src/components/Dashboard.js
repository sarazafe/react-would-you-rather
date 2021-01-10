import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Header from "./Header";
import {Nav} from "./Nav";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

/**
 * Component for home page
 */
class Dashboard extends Component {
	viewPoll = () => {
		console.log('View poll');
	};

	render() {
		const {loggedUser, answeredQuestions, unansweredQuestions} = this.props;
		if (!loggedUser) {
			return <Redirect push to='login'/>;
		}

		return (
			<div>
				<Header/>
				<Nav/>
				<div className='dashboard'>
					<Tabs>
						<TabList>
							<Tab>Unanswered questions</Tab>
							<Tab>Answered questions</Tab>
						</TabList>

						<TabPanel>
							{
								unansweredQuestions.map(({optionOne: {text}, author: {id, name, avatarURL}}) => (
									<div className='dashboard-poll'>
										<div className='dashboard-poll-header'>
											{name} asks:
										</div>
										<div className='dashboard-poll-body'>
											<div className='dashboard-poll-body-avatar'><img src={avatarURL}
											                                                 alt={`${name}'s avatar`}/>
											</div>
											<div className='dashboard-poll-body-question'>
												<div className='dashboard-poll-body-question-title'>Would you rather?
												</div>
												<div
													className='dashboard-poll-body-question-option'>{text}</div>
												<div className='dashboard-poll-body-question-button'>
													<button onClick={this.viewPoll}>
														View poll
													</button>
												</div>
											</div>
										</div>
									</div>
								))
							}
						</TabPanel>
						<TabPanel>
							{
								answeredQuestions.map(({optionOne, optionTwo, author: {id, name, avatarURL}}) => (
									<div className='dashboard-poll'>
										<div className='dashboard-poll-header'>
											{name} asks:
										</div>
										<div className='dashboard-poll-body'>
											<div className='dashboard-poll-body-avatar'><img src={avatarURL}
											                                                 alt={`${name}'s avatar`}/>
											</div>
											<div className='dashboard-poll-body-question'>
												<div className='dashboard-poll-body-question-title'>Would you rather?
												</div>
												<div
													className='dashboard-poll-body-question-option'>
													{
														optionOne.votes.find(v => v === loggedUser.id) ? optionOne.text : optionTwo.text
													}
												</div>
												<div className='dashboard-poll-body-question-button'>
													<button onClick={this.viewPoll}>
														View poll
													</button>
												</div>
											</div>
										</div>
									</div>
								))
							}
						</TabPanel>
					</Tabs>
				</div>
			</div>
		);
	}
}

/**
 * Gets an object with questions organized in answered and unanswered questions by logged user
 * @param questions - the list of questions
 * @param users - the list of users
 * @param loggedUser - user in session
 * @returns an object with the following structure: {answeredQuestions: [], unansweredQuestions: []}
 */
const getAnsweredUnasweredQuestions = (questions, users, loggedUser) => {
	if (!loggedUser) {
		return {};
	}
	return Object.values(questions).reduce((classifyQuestions, question) => {
		let questionKey;
		if (question.optionOne.votes.find(v => v === loggedUser.id) || question.optionTwo.votes.find(v => v === loggedUser.id)) {
			questionKey = 'answeredQuestions';
		} else {
			questionKey = 'unansweredQuestions';
		}

		const {id, name, avatarURL} = users.find(user => user.id === question.author);
		const filledQuestion = {
			...question,
			author: {
				id,
				name,
				avatarURL,
			}
		};
		classifyQuestions[questionKey] = classifyQuestions[questionKey].concat(filledQuestion);

		return classifyQuestions;
	}, {answeredQuestions: [], unansweredQuestions: []})
};

const mapStateToProps = ({loggedUser, questions, users}) => {
	const answeredUnAnsweredQuestions = getAnsweredUnasweredQuestions(questions, Object.values(users), loggedUser);
	return {
		loggedUser,
		answeredQuestions: answeredUnAnsweredQuestions.answeredQuestions?.sort((q1, q2) => (q1.timestamp - q2.timestamp)),
		unansweredQuestions: answeredUnAnsweredQuestions.unansweredQuestions?.sort((q1, q2) => (q1.timestamp - q2.timestamp)),
	};
};

export default connect(mapStateToProps)(Dashboard);