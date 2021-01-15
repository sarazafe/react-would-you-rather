import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Header from "./Header";
import {Nav} from "./Nav";
import {withRouter} from 'react-router-dom';
import DashboardPoll from "./DashboardPoll";
import './Dashboard.css';

const TABS = {
	UNANSWERED_QUESTIONS: 'UNANSWERED_QUESTIONS',
	ANSWERED_QUESTIONS: 'ANSWERED_QUESTIONS',
}

/**
 * Component for home page
 */
class Dashboard extends Component {

	state = {
		selectedTab: TABS.UNANSWERED_QUESTIONS,
	};

	/**
	 * Goes to the detail of a question
	 * @param id - the id of the question to show
	 */
	goToQuestionDetails = id => {
		this.props.history.push(`/questions/${id}`);
	};

	toggleTab = () => {
		const {selectedTab} = this.state;

		if (selectedTab === TABS.UNANSWERED_QUESTIONS) {
			this.setState({
				selectedTab: TABS.ANSWERED_QUESTIONS,
			});
		} else {
			this.setState({
				selectedTab: TABS.UNANSWERED_QUESTIONS,
			});
		}
	}

	render() {
		const {loggedUser, answeredQuestions, unansweredQuestions} = this.props;
		const {selectedTab} = this.state;
		if (!loggedUser) {
			return <Redirect push to='login'/>;
		}

		return (
			<div>
				<Header/>
				<Nav/>
				<div className='dashboard'>
					<div className='dashboard-tab-list'>
						<div
							className={`dashboard-tab-list-tab ${selectedTab === TABS.UNANSWERED_QUESTIONS ? 'active' : ''}`}>
							<button onClick={this.toggleTab}
							        disabled={selectedTab === TABS.UNANSWERED_QUESTIONS}>Unanswered questions
							</button>
						</div>
						<div
							className={`dashboard-tab-list-tab ${selectedTab === TABS.ANSWERED_QUESTIONS ? 'active' : ''}`}>
							<button onClick={this.toggleTab} disabled={selectedTab === TABS.ANSWERED_QUESTIONS}>Answered
								questions
							</button>
						</div>
					</div>

					{
						selectedTab === TABS.UNANSWERED_QUESTIONS && (
							<div className='dashboard-tab-panel'>
									{
										unansweredQuestions.map(({id, optionOne: {text}, author}) => (
											<DashboardPoll id={id} poll={text} author={author}
											               onViewPoll={this.goToQuestionDetails}
											               buttonLabel='Answer poll' key={id}/>
										))
									}
							</div>)
					}

					{
						selectedTab === TABS.ANSWERED_QUESTIONS && (
							<div className='dashboard-tab-panel'>
									{
										answeredQuestions.map(({id, optionOne, optionTwo, author}) => (
											<DashboardPoll
												id={id}
												poll={optionOne.votes.find(v => v === loggedUser.id) ? optionOne.text : optionTwo.text}
												author={author} onViewPoll={this.goToQuestionDetails}
												buttonLabel='View poll'
												key={id}/>
										))
									}
							</div>)
					}
				</div>
			</div>
		);
	}
}

/**
 * Gets an object with questions organized in answered and unanswered questions by logged user
 * @param questions - the list of questions
 * @param users - the map of users
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

		const {id, name, avatarURL} = users[question.author];
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
	if (!loggedUser) {
		return {};
	}

	const answeredUnAnsweredQuestions = getAnsweredUnasweredQuestions(questions, users, loggedUser);
	return {
		loggedUser,
		answeredQuestions: answeredUnAnsweredQuestions.answeredQuestions?.sort((q1, q2) => (q2.timestamp - q1.timestamp)),
		unansweredQuestions: answeredUnAnsweredQuestions.unansweredQuestions?.sort((q1, q2) => (q2.timestamp - q1.timestamp)),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));