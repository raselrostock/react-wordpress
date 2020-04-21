import React from 'react';
import { getUserName } from '../functions';
import DashboardLayout from '.././layouts/DashboardLayout';

const Dashboard = ( props ) => {
	const userName = getUserName() ? getUserName() : '';
	return (
		<DashboardLayout>
			{ userName ? <h2> Welcome { userName } </h2>: '' }
		</DashboardLayout>
	);
}
export default Dashboard;