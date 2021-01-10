import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Header from "./Header";
import {Nav} from "./Nav";

/**
 * Component for home page
 */
class Dashboard extends Component {
	render() {
		const {loggedUser} = this.props;
		if (!loggedUser) {
			return <Redirect push to='login'/>;
		}

		return (
			<div>
				<Header/>
				<Nav/>
				Dashboard page
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
		answeredQuestions: answeredUnAnsweredQuestions.answeredQuestions.sort((q1, q2) => (q1.timestamp - q2.timestamp)),
		unansweredQuestions: answeredUnAnsweredQuestions.unansweredQuestions.sort((q1, q2) => (q1.timestamp - q2.timestamp)),
	};
};

export default connect(mapStateToProps)(Dashboard);