import React from 'react';
import Navbar from './Navbar';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const authToken = localStorage.getItem('token');
		if ( ! authToken) {
			window.location.href = '/login';
		}
	}
	render() {
		const { username } = this.props;
		return (
			<div>
				<Navbar />
				Welcome { username }
			</div>
		);
	}
}

export default Dashboard;