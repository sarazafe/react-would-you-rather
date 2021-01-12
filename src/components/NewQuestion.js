import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import Header from "./Header";
import {Nav} from "./Nav";
import {handleAddNewQuestion} from "../actions/questions";

/**
 * Component for new question page
 */
class NewQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
	};

	updateOptionOne = event => {
		this.setState({
			optionOne: event.target.value,
		})
	};

	updateOptionTwo = event => {
		this.setState({
			optionTwo: event.target.value,
		})
	};

	/**
	 * Dispatches the action that add a new question to the state of the store
	 * @param event - the submit event
	 */
	addNewQuestion = event => {
		event.preventDefault();
		const {optionOne, optionTwo} = this.state;
		const {loggedUser, dispatch} = this.props;
		dispatch(handleAddNewQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: loggedUser.id,
		}));
		this.props.history.push('/');
	};

	render() {
		const {loggedUser} = this.props;
		if (!loggedUser) {
			return <Redirect push to='login'/>;
		}

		const {optionOne, optionTwo} = this.state;
		return (
			<div>
				<Header/>
				<Nav/>
				<div className='new-question'>
					<div className='new-question-title'>Would you rather?</div>
					<form className='new-question-form' onSubmit={this.addNewQuestion}>
						<div className='new-question-form-option'>
							<input type='text' value={optionOne} onChange={this.updateOptionOne}/>
						</div>
						<div className='new-question-form-or'>or</div>
						<div className='new-question-form-option'>
							<input type='text' value={optionTwo} onChange={this.updateOptionTwo}/>
						</div>

						<button type='submit' disabled={!optionOne || !optionTwo}>Add new question</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({loggedUser}) => {
	return {
		loggedUser,
	};
};

export default withRouter(connect(mapStateToProps)(NewQuestion));