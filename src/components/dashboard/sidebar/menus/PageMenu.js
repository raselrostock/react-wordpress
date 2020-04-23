import React, { useContext } from 'react';

import AppContext from '../../.././context/AppContext';
import NavLink from '../../../NavLink';


const PageMenu = () => {
	const [ store, setStore ] = useContext( AppContext );
	return (
		<li className={ '/dashboard/pages' === window.location.pathname ? 'active' : ''}>
			<NavLink 
				to="/dashboard/pages"
				data-toggle="collapse"
				aria-expanded={ store.activeMenu.pageMenuActive }
				className={ `dropdown-toggle ${ ! store.activeMenu.pageMenuActive ? 'collapsed' : '' }` }
				onClick={ ()  => setStore({
					...store,
					activeMenu: { pageMenuActive: ! store.activeMenu.pageMenuActive }
				}) }
			> Pages 
			</NavLink>
			<ul className={ `collapse list-unstyled ${ store.activeMenu.pageMenuActive ? 'show' : '' }` } id="homeSubmenu">
				<li><NavLink to='/dashboard/pages'>All Pages</NavLink></li>
			</ul>
		</li>
	);
}

export default PageMenu;