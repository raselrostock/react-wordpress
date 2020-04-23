import React, { useContext } from 'react';

import NavLink from '../../NavLink';
import AppContext from '../.././context/AppContext';
import PostMenu from './menus/PostMenu';
import PageMenu from './menus/PageMenu';

const SidebarMenu = () => {

	const [ store, setStore ] = useContext( AppContext );
	return (
		<nav id="sidebar" className={ store.sidebarActive ? 'active' : '' }>
			<div className="sidebar-header">
				<NavLink to={ `/dashboard` }>React WP</NavLink>
			</div>

			<ul className="list-unstyled components">
				<PostMenu />
				<PageMenu />
			</ul>
		</nav>
		);
}

export default SidebarMenu;