import React from 'react';
import Navbar from '../Navbar';

const Content = ( props ) => {
	return (
		<div id="content" className= { props.active ? 'active' : '' }>
			<Navbar 
				handleSidebarToggleClick= { props.handleSidebarToggleClick }
				active= { props.active }
			/>
			<div className="main-content">
				{props.children}
			</div>
		</div>
	);
}

export default Content;