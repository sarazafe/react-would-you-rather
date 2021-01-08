import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
import {setLoggedUser} from '../actions/loggedUser';

/**
 * Component for login page
 */
class Login extends Component {
	state = {
		selectedUser: '',
	};

	/**
	 * Handler for updating the selected user property of state
	 * @param selectedUser - the selected user
	 */
	handleSelectedUserChange = selectedUser => {
		this.setState({
			selectedUser,
		});
	};

	/**
	 * Logs the user in the application.
	 * It updates the store with selected user and goes back.
	 */
	loginUser = () => {
		this.props.dispatch(setLoggedUser(this.state.selectedUser.value));
		this.props.history.goBack();
	}

	/**
	 * Gets the selector's options from users. Each option will have the user's avatar
	 * and name
	 * @param users - list of users
	 * @returns {*} - an array with the options that will be used to fill the selector
	 */
	getSelectorOptions = users => {
		return users.map(user => {
			const {id, name, avatarURL} = user;
			return {
				value:
					{id, name, avatarURL},
				label: <div><img src={avatarURL} alt={`${name}'s avatar`}/> {' '} {name} </div>
			}
		});
	}

	render() {
		const {users} = this.props;
		const {selectedUser} = this.state;

		return (
			<div className='login'>
				<div className='login-header'>
					<div className='login-header-title'>Welcome to 'Would you rather'!!</div>
					<div className='login-header-subtitle'>Please, login before continue</div>
				</div>

				<div className='login-body'>
					<div className='login-body-title'>Log in</div>
					<div className='login-body-users'>
						<Select
							name='form-field-name'
							value={selectedUser}
							onChange={this.handleSelectedUserChange}
							placeholder='Select user...'
							options={this.getSelectorOptions(users)}
							searchable
						/>
					</div>
					<div className='login-body-button'>
						<button onClick={this.loginUser} disabled={!selectedUser}>
							Log in
						</button>
					</div>
				</div>

			</div>
		);
	}
}

function mapStateToProps({users}) {
	return {
		users: Object.values(users),
	}
}

export default withRouter(connect(mapStateToProps)(Login));