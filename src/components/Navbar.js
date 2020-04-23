import React from 'react';

import NavLink from './NavLink';
import  { isLoggedIn, getUserName } from './functions';
import ToggleSidebarBtn from './dashboard/sidebar/ToggleSidebarBtn';

class Navbar extends React.Component {

	constructor( props ) {
		super( props );
	}

	handleLogout = () => {
		localStorage.removeItem('token');
		window.location.href = '/';
	}
	
	render() {

		const userName = getUserName() ? getUserName() : '';
		return (
			<nav className="navbar navbar-expand-lg my-navbar main-navbar">
			  	<div>
			    	<ul className="navbar-nav my-navbar mr-auto">
					    <li className="nav-item">
					        <NavLink to="/">Home</NavLink>
					    </li>
					    { isLoggedIn() !== null ? 
					    	(
					    		<React.Fragment>
						    		<li className="nav-item">
						        		<NavLink to={ `/dashboard ` }>Dashboard</NavLink>
						    		</li>
						    		<li className="nav-item">
						        		<button className="btn btn-secondary ml-3" onClick= { this.handleLogout } >Logout</button>
						    		</li>
						    	</React.Fragment>
					    	) : 
					    	(
					    		<li className="nav-item">
					        		<NavLink to="/login">Login </NavLink>
					    		</li>
					    	) 
					    }
					    
				    </ul>
			  	</div>
			  	
			  	{ window.location.pathname.includes( 'dashboard' ) ? (
					<ToggleSidebarBtn/>
				) : ''}
			</nav>
		);
	}
}

export default Navbar;