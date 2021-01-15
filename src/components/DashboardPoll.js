import React, {Component} from "react";
import PropTypes from "prop-types";
import './DashboardPoll.css';
import {QuestionCard} from "./QuestionCard";

/**
 * Component a poll shown in the dashboard
 */
class DashboardPoll extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		poll: PropTypes.string.isRequired,
		author: PropTypes.object.isRequired,
		onViewPoll: PropTypes.func.isRequired,
		buttonLabel: PropTypes.string.isRequired,
	};

	render(){
		const {id, poll, author: {name, avatarURL}, onViewPoll, buttonLabel} = this.props;
		return (
			<QuestionCard name={name} avatarURL={avatarURL} title={`${name} asks:`}>
				<div className='dashboard-poll-body-question'>
					<div className='dashboard-poll-body-question-title'>Would you rather?
					</div>
					<div
						className='dashboard-poll-body-question-option'>{poll}</div>
					<div className='dashboard-poll-body-question-button'>
						<button onClick={() => onViewPoll(id)}>
							{buttonLabel}
						</button>
					</div>
				</div>
			</QuestionCard>
		);
	}
}

export default DashboardPoll;