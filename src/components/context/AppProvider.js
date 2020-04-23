import React, { useState, useEffect } from 'react';

import { getUserName, isLoggedIn } from '../functions';
import AppContext from './AppContext';

const AppProvider = ( props ) => {
	const [ store, setStore ] = useState( 
		{ 
			userName: '', 
			token: '', 
			activeMenu: {}, 
			sidebarActive: true 
		} 
	);

	useEffect( () => {
		const authToken = isLoggedIn();
		const userName = getUserName() ? getUserName() : '';
		setStore({ ...store, token: authToken, userName});
	}, []);

	return (
		<AppContext.Provider value={ [ store, setStore ]} >
			{ props.children }
		</AppContext.Provider>
	);

}

export default AppProvider;