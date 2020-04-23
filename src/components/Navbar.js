import React, { useContext } from 'react';

import NavLink from './NavLink';
import  { isLoggedIn, getUserName } from './functions';
import AppContext from "./context/AppContext";
import ToggleSidebarBtn from './dashboard/sidebar/ToggleSidebarBtn';

const Navbar = () => {

	const [ store, setStore ] = useContext( AppContext );

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		setStore({
			...store,
			token: '',
			userName: ''
		});
		window.location.href = '/';
	}

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
					        		<button className="btn btn-secondary ml-3" onClick= { handleLogout } >Logout</button>
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

export default Navbar;