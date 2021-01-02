import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Dashboard from "./Dashboard";
import QuestionDetails from "./QuestionDetails";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";

function App() {
	return (
		<Router>
			<div className='container'>
				<div>
					<Route path='/' exact component={Dashboard} />
					<Route path='/login' exact component={Login} />
					<Route path='/questions/:question_id' component={QuestionDetails} />
					<Route path='/add' component={NewQuestion} />
					<Route path='/leaderboard' component={LeaderBoard} />
				</div>
			</div>
		</Router>
	);
}

export default App;
