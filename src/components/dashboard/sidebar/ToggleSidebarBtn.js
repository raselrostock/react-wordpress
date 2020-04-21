import React from 'react';

const ToggleSidebarBtn = ( props ) => {
	return (
		<button 
			type="button" 
			id="sidebarCollapse"
			className={ `btn btn-secondary ml-2 ${ props.active ? 'active' : ''} ` }
		> <i className="fa fa-align-left" ></i>
		</button>
	);
}

export default ToggleSidebarBtn;