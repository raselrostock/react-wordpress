import React from 'react';
import { Router } from '@reach/router';

import Home from './components/Home';
import SinglePost from './components/SinglePost';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './style.css'


class App extends React.Component {
	render() {
		return (
			<Router>
				<Home path="/" />
				<Login path="/login" />
				<SinglePost path="/post/:id" />
				<Dashboard path="/dashboard/:username" />
			</Router>
		);
	}
}

export default App;