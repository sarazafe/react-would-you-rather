import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Header from "./Header";
import {Nav} from "./Nav";
import {LeaderBoardClassification} from "./LeaderBoardClassification";

/**
 * Component for leader board pages
 */
class LeaderBoard extends Component {
	render() {
		const {loggedUser} = this.props;
		if (!loggedUser) {
			return <Redirect push to={{
				pathname: '/login',
				state: { referrer: '/leaderboard' }
			}}/>;
		}

		const {classification} = this.props;
		return (
			<div>
				<Header/>
				<Nav/>
				<div className='leader-board'>
					{
						classification.map(({id, name, avatarURL, answeredQuestions, createdQuestions}) => (
							<LeaderBoardClassification key={id} name={name} avatarURL={avatarURL}
							                           answeredQuestions={answeredQuestions}
							                           createdQuestions={createdQuestions}/>
						))
					}
				</div>
			</div>
		);
	}
}

/**
 * Gets classification of users. This classification will be a list with this information:
 * - the id of the user
 * - the name of the user
 * - his/her avatar
 * - the number of answered questions
 * - the number of created questions
 * This list will be sorted by answered and created questions, in descendant order.
 *
 * @param users - the list of users
 * @returns {{createdQuestions: *, answeredQuestions: *, avatarURL: *, name: *}[]} - the data sorted by answered and created questions
 */
const getClassification = users => {
	return Object.values(users)
		.map(({id, name, avatarURL, answers, questions}) => (
			{
				id,
				name,
				avatarURL,
				answeredQuestions: Object.values(answers).length,
				createdQuestions: questions.length
			}
		))
		.sort((u1, u2) => ((u2.answeredQuestions + u2.createdQuestions) - (u1.answeredQuestions + u1.createdQuestions)));
};

const mapStateToProps = ({loggedUser, users}) => {
	if (!loggedUser) {
		return {};
	}

	return {
		loggedUser,
		classification: getClassification(users),
	};
};

export default connect(mapStateToProps)(LeaderBoard);