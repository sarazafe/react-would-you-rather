import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Header from "./Header";
import {Nav} from "./Nav";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DashboardPoll from "./DashboardPoll";

/**
 * Component for home page
 */
class Dashboard extends Component {

	/**
	 * Goes to the detail of a poll
	 * @param id - the id of the poll to show
	 */
	goToPoll = id => {
		console.log('View poll', id);
	};

	/**
	 * Go to answer a poll
	 * @param id - the id of the poll to be answered
	 */
	goToAnswerPoll = id => {
		console.log('Answer poll', id);
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
								unansweredQuestions.map(({id, optionOne: {text}, author}) => (
									<DashboardPoll id={id} poll={text} author={author} onViewPoll={this.goToAnswerPoll}
									               key={id}/>
								))
							}
						</TabPanel>
						<TabPanel>
							{
								answeredQuestions.map(({id, optionOne, optionTwo, author}) => (
									<DashboardPoll
										id={id}
										poll={optionOne.votes.find(v => v === loggedUser.id) ? optionOne.text : optionTwo.text}
										author={author} onViewPoll={this.goToPoll} key={id}/>
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
		answeredQuestions: answeredUnAnsweredQuestions.answeredQuestions?.sort((q1, q2) => (q2.timestamp - q1.timestamp)),
		unansweredQuestions: answeredUnAnsweredQuestions.unansweredQuestions?.sort((q1, q2) => (q2.timestamp - q1.timestamp)),
	};
};

export default connect(mapStateToProps)(Dashboard);