import React from 'react';
import {Link} from 'react-router-dom';

export const QuestionNotFound = ()=>{
	return (
		<div className='not-found'>
			Sorry, the question that you're trying to access does not exist.
			<div className='not-found-to-home'>
				<Link
					to='/'
				>Go home</Link>
			</div>
		</div>
	)
};