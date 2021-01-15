import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {handleAnswerQuestion} from "../actions/questions";
import './AnswerPoll.css';

/**
 * Component for form to answer a poll
 */
class AnswerPoll extends Component {
	static propTypes = {
		qid: PropTypes.string.isRequired,
		optionOne: PropTypes.string.isRequired,
		optionTwo: PropTypes.string.isRequired,
	};

	state = {
		answer: '',
	}

	updateSelectedAnswer = event => {
		this.setState({
			answer: event.target.value,
		});
	}

	/**
	 * Dispatches the action that answers the poll and
	 * updates the store with this new situation
	 * @param event - the submit event
	 */
	answerPoll = event => {
		event.preventDefault();
		const {answer} = this.state;
		const {loggedUser, dispatch, qid} = this.props;
		dispatch(handleAnswerQuestion({
			loggedUser,
			answer,
			qid,
		}));
	};

	render() {
		const {optionOne, optionTwo} = this.props;
		const {answer} = this.state;
		return (
			<form className='answer-poll-form' onSubmit={this.answerPoll}>
				<div>
					<input type="radio" id="optionOne" name="options" value="optionOne"
					       onChange={this.updateSelectedAnswer}/>
					<label htmlFor="optionOne">{optionOne}</label>
				</div>
				<div className='answer-poll-form-separator'>or</div>
				<div>
					<input type="radio" id="optionTwo" name="options" value="optionTwo"
					       onChange={this.updateSelectedAnswer}/>
					<label htmlFor="optionTwo">{optionTwo}</label>
				</div>

				<button type='submit' disabled={!answer}>Answer poll</button>
			</form>
		);
	}
}

const mapStateToProps = ({loggedUser: {id}}) => {
	return {
		loggedUser: id,
	};
};

export default connect(mapStateToProps)(AnswerPoll);