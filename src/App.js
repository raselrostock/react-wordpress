import React from 'react';
import { Router } from '@reach/router';

import Home from './components/Home';
import SinglePost from './components/SinglePost';
import Login from './components/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreatePost from './components/dashboard/posts/CreatePost';
import AppProvider from './components/context/AppProvider';
import Posts from './components/dashboard/posts/Posts';
import Pages from './components/dashboard/pages/Pages';
import Blogs from './components/Blogs';
import Page from './components/Page';
import './style.css';


class App extends React.Component {
	render() {
		return (
			<AppProvider>
				<Router>
					<Home path="/" />
					<Blogs path="/blogs" />
					<Page path="/page/:id" />
					<Login path="/login" />
					<SinglePost path="/post/:id" />
					<Posts path="/dashboard/posts" />
					<Dashboard path="/dashboard" />
					<CreatePost path="/dashboard/create-post" />
					<Pages path="/dashboard/pages" />
				</Router>
			</AppProvider>
		);
	}
}

export default App;