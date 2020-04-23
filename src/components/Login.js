import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from '@reach/router';

import Loader from '../loader.gif';
import AppContext from "./context/AppContext";
import Navbar from './Navbar';

const Login = () => {

	const [ store, setStore ] = useContext( AppContext );

	const [ loginFields, setLoginFields ]= useState({
			username: '',
			password: '',
			loading: false,
			error: ''
		}
	);

	const createMarkup = ( data ) => ({
		__html: data
	});

	const handleChange = ( event ) => {
		setLoginFields( {
			...loginFields,
			[ event.target.name ]: event.target.value
		});
	} 

	const handleSubmit = ( event ) => {

		event.preventDefault();
		const restApiUrl = `http://localhost/WP_React/wp-json/jwt-auth/v1/token`;

		const formData = {
			username: loginFields.username,
			password: loginFields.password
		};

		setLoginFields( { ...loginFields, loading: true });
		axios.post(restApiUrl, formData)
			.then( res => {
				if(undefined === res.data.token) {
					setLoginFields({
						...loginFields, 
						error: res.data.message,
						loading: false
					});
					return;
				}
				const { token, user_nicename } = res.data;
				localStorage.setItem('token', token);
				localStorage.setItem('userName', user_nicename);

				setStore({
					...store,
					userName: user_nicename,
					token: token
				});

				setLoginFields({
					...loginFields,
					loading: false,
					token: token
				});

			})
			.catch( err => {
				setLoginFields({
					...loginFields, 
					error: err.response.data.message,
					loading: false
				});
			});
	}

	const { username, password, error, loading } = loginFields;
	console.log(store);
	console.log(loginFields);
	if ( store.token ) {
		return ( <Redirect to={`/dashboard`} noThrow /> )
	} else {
		return (
			<React.Fragment>
				<Navbar/>
				<div style={{ height: '100vh', maxWidth: '400px', margin: '0 auto' }}>
					<h4 className="mb-4">Login</h4>
					{ error && <div className="alert alert-danger" dangerouslySetInnerHTML={ createMarkup( error ) }/> }
					<form onSubmit={ handleSubmit }>
						<label className="form-group">
							Username:
							<input
								type="text"
								className="form-control"
								name="username"
								value={ username }
								onChange={ handleChange }
							/>
						</label>
						<br/>
						<label className="form-group">
							Password:
							<input
								type="password"
								className="form-control"
								name="password"
								value={ password }
								onChange={ handleChange }
							/>
						</label>
						<br/>
						<button className="btn btn-primary mb-3" type="submit">Login</button>
						{ loading && <img className="loader" src={Loader} alt="Loader"/> }
					</form>
				</div>
			</React.Fragment>
		)
	}
};

export default Login;

