import React from 'react';
import { Router } from '@reach/router';

import Home from './components/Home';
import SinglePost from './components/SinglePost';
import './style.css'


class App extends React.Component {
	render() {
		return (
			<Router>
				<Home path="/" />
				<SinglePost path="/post/:id" />
			</Router>
		);
	}
}

export default App;