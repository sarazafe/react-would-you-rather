import React, { Component } from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Header from "./Header";
import {Nav} from "./Nav";

/**
 * Component for new question page
 */
class NewQuestion extends Component {
	render() {
		const {loggedUser} = this.props;
		if (!loggedUser) {
			return <Redirect push to='login'/>;
		}

		return (
			<div>
				<Header/>
				<Nav/>
				NewQuestion page
			</div>
		);
	}
}

const mapStateToProps = ({loggedUser}) => {
	return {
		loggedUser,
	};
};

export default connect(mapStateToProps)(NewQuestion);