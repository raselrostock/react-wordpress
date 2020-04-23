import React from 'react';
import axios from 'axios';

import DashboardLayout from '../.././layouts/DashboardLayout';
import Loader from '../../../loader.gif';

class CreatePost extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			title: '',
			content: '',
			postCreated: false,
			loading: false,
			message: ''
		};
	}

	createMarkup = ( data ) => ({
		__html: data
	});

	handleFormSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true});
		const formData = {
			title: this.state.title,
			content: this.state.content,
			status: 'publish'
		}
		const wordpressSiteUrl = 'http://localhost/WP_React';
		const authToken = localStorage.getItem('token');

		axios.post( `${wordpressSiteUrl}/wp-json/wp/v2/posts`, formData, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ authToken }`
			}
		})
			.then( res =>{
				this.setState( {
					loading: false,
					postCreated: !! res.data.id,
					message: res.data.id ? 'Post is created' : ''
				});
			})
			.catch( err => {
				this.setState({ loading: false, message: err.response.data.message})
			})
	}

	handleChange = event => {
		this.setState({
			[ event.target.name ] : event.target.value
		});
	}
	render() {

		const { title, content, postCreated, loading, message } = this.state;
		return (
			<DashboardLayout>
				<form onSubmit= { this.handleFormSubmit } className="mt-5" style={{ maxWidth: '800px' }}>
					<legend className="mb-4">Create Post</legend>
					{ message ? <div className={ `alert ${ postCreated ? 'alert-success': 'alert-danger' }` } dangerouslySetInnerHTML={ this.createMarkup( message ) }/> : ''}
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input onChange= { this.handleChange} type="text" name="title" className="form-control" id="title" />
					</div>
					<div className="form-group">
						<label htmlFor="my-post-content">Content</label>
						<textarea onChange= { this.handleChange} name="content" className="form-control" id="my-post-content" rows="10" />
					</div>
					<button type="submit" className="btn btn-secondary" > Submit</button>
					{ loading && <img className="loader" src={ Loader } alt="Loader"/> }
				</form>
			</DashboardLayout>
			);
	}
}

export default CreatePost;