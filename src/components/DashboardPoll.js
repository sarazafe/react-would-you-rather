import React, {Component} from "react";
import PropTypes from "prop-types";
import './DashboardPoll.css';

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
			<div className='dashboard-poll'>
				<div className='dashboard-poll-header'>
					<span>{name} asks:</span>
				</div>
				<div className='dashboard-poll-body'>
					<div className='dashboard-poll-body-avatar'>
						<img src={avatarURL} alt={`${name}'s avatar`}/>
					</div>
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
				</div>
			</div>
		);
	}
}

export default DashboardPoll;