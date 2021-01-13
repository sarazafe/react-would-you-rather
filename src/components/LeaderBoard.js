import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Header from "./Header";
import {Nav} from "./Nav";

/**
 * Component for leader board pages
 */
class LeaderBoard extends Component {
	render() {
		const {loggedUser} = this.props;
		if (!loggedUser) {
			return <Redirect push to='login'/>;
		}

		const {classification} = this.props;
		return (
			<div>
				<Header/>
				<Nav/>
				<div className='leader-board'>
					{
						classification.map(({id, name, avatarURL, answeredQuestions, createdQuestions}) => (
							<div className='leader-board-classification' key={id}>
								<div className='leader-board-classification-avatar'>
									<img src={avatarURL} alt={`${name}'s avatar`}/>
								</div>
								<div className='leader-board-classification-summary'>
									<div className='leader-board-classification-summary-title'>
										{name}
									</div>
									<div className='leader-board-classification-summary-scores'>
										<div className='leader-board-classification-summary-score'>
											Answered questions {answeredQuestions}
										</div>
										<div className='leader-board-classification-summary-score'>
											Created questions {createdQuestions}
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