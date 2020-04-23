import React from 'react';
import axios from 'axios';
import { Redirect } from '@reach/router';

import Loader from '../loader.gif';

import Navbar from './Navbar';

class Login extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			username: '',
			password: '',
			token: '',
			loading: false,
			loggedIn: false,
			error: ''
		}
	}

	createMarkup = ( data ) => ({
		__html: data
	});

	handleChange = ( event ) => {
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
		};
		this.setState( { loading: true }, () => {
			axios.post(restApiUrl, formData)
				.then( res => {
					if(res.data.token) {
						localStorage.setItem( 'token', res.data.token);
						localStorage.setItem( 'userName', this.state.username);
						this.setState({ 
							loading: false, 
							loggedIn: true, 
							token: res.data.token
						});
					}
				})
				.catch( err => {
					this.setState({ loading: false, username:'', password: '', error: err.response.data.message });
				});
		});

	}
	render() {
		const { loading, loggedIn, error, username, password } = this.state;
		if( loggedIn || localStorage.getItem('token'))
		{
			return <Redirect to={`/dashboard`} noThrow />;
		}
		else
		{
			return (
				<React.Fragment>
					<Navbar />
					{ loading && <img src={ Loader } className="loader" />}
					<div style={{ height: '100vh', maxWidth: '400px', margin: '0 auto'}} >
						<h4 className="mb-4"> Login</h4>
						{ error && <div className="alert alert-danger" dangerouslySetInnerHTML={ this.createMarkup( error ) }/> }
						<form onSubmit= { ()=>this.handleSubmit(event) }>
							<label className="form-group">Username: 
								<input 
									onChange={ ()=>this.handleChange(event) } 
									value={ username } 
									type="text" 
									name="username" 
									className="form-control" 
								/>
							</label>
							<label className="form-group">Password 
								<input 
									onChange={ ()=>this.handleChange(event) } 
									value={ password } 
									type="password" 
									name="password" 
									className="form-control" 
								/>
							</label>
							<button className="btn btn-primary mb-3" type="submit">Login</button>
						</form>
					</div>
				</React.Fragment>
			);
		}
	}
}

export default Login;

