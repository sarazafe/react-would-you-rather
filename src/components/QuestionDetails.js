import React, { Component } from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Header from "./Header";

/**
 * Component for question details page
 */
class QuestionDetails extends Component {
	render() {
		const {loggedUser} = this.props;
		if (!loggedUser) {
			return <Redirect push to='login'/>;
		}

		return (
			<div>
				<Header/>
				QuestionDetails page
			</div>
		);
	}
}

const mapStateToProps = ({loggedUser}) => {
	return {
		loggedUser,
	};
};

export default connect(mapStateToProps)(QuestionDetails);