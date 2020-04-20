import React from 'react';
import axios from 'axios';
import { Redirect } from '@reach/router';

import Loader from '../loader.gif';


import Navbar from './Navbar';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			token: '',
			loading: false,
			loggedIn: false
		}
	}
	handleChange = (event) => {
		this.setState( {
			[ event.target.name ]: event.target.value
		});
	} 
	handleSubmit = ( event ) => {
		event.preventDefault();
		const restApiUrl = `http://localhost/WP_React/wp-json/jwt-auth/v1/token`;
		const formData = {
			username: this.state.username,
			password: this.state.password
		}
		this.setState( { loading: true }, () => {
			axios.post(restApiUrl, formData)
				.then( res => {
					if(res.data.token) {
						localStorage.setItem( 'token',res.data.token);
						localStorage.setItem( 'username', this.state.username);
						this.setState({ loading: false, loggedIn: true, token: res.data.token});
					}
				})
				.catch( err => {
					this.setState({ loading: false, username:'', password: ''});
					console.log(err)});
		});

	}
	render() {
		const { loading, loggedIn, username, password } = this.state;
		console.log(loggedIn);
		console.log(localStorage.getItem('token'));
		if( loggedIn || localStorage.getItem('token'))
		{
			return <Redirect to={`/dashboard/${ username }`} noThrow />;
		}
		else
		{
			return (
				<div>
					<Navbar />
					{ loading && <img src={ Loader } className="loader" />}
					<div className="container mt-5">
						<h2> Login Form</h2>
						<form onSubmit= { ()=>this.handleSubmit(event) }>
							<div className="form-group">
								<label htmlFor="">User 
									<input onChange={ ()=>this.handleChange(event) } value={ username } type="text" name="username" className="form-control" />
								</label>
							</div>
							<div className="form-group">
								<label htmlFor="">Password 
									<input onChange={ ()=>this.handleChange(event) } value={ password } type="password" name="password" className="form-control" />
								</label>
							</div>
							<button className="btn btn-primary" type="submit">Login</button>
						</form>
					</div>
				</div>
			);
		}
	}
}

export default Login;

