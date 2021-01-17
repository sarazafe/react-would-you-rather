import React from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';

/**
 * Navigation component
 */
export const Nav = () => {
	return (
		<nav className='nav'>
			<ul>
				<li>
					<NavLink to='/' exact>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/add'>
						New question
					</NavLink>
				</li>
				<li>
					<NavLink to='/leaderboard'>
						Leader board
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};