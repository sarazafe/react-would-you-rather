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
 * @param loggedUser - user in session
 * @returns an object with the following structure: {answeredQuestions: [], unansweredQuestions: []}
 */
const getAnsweredUnasweredQuestions = (questions, loggedUser) => {
	return Object.values(questions).reduce((acc, item) => {
		if(item.optionOne.votes.find(v => v === loggedUser.id) || item.optionTwo.votes.find(v => v === loggedUser.id)){
			acc['answeredQuestions'] = acc['answeredQuestions'].concat(item);
		}else{
			acc['unansweredQuestions'] = acc['unansweredQuestions'].concat(item);
		}

		return acc;
	}, {answeredQuestions: [], unansweredQuestions: []})
};

const mapStateToProps = ({loggedUser, questions}) => {
	const answeredUnAnsweredQuestions = getAnsweredUnasweredQuestions(questions, loggedUser);
	return {
		loggedUser,
		answeredQuestions: answeredUnAnsweredQuestions.answeredQuestions.sort((q1, q2) => (q1.timestamp - q2.timestamp)),
		unansweredQuestions: answeredUnAnsweredQuestions.unansweredQuestions.sort((q1, q2) => (q1.timestamp - q2.timestamp)),
	};
};

export default connect(mapStateToProps)(Dashboard);