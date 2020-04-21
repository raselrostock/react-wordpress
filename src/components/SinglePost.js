import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';

import Loader from '../loader.gif';
import Navbar from './Navbar';

class SinglePost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			post: {},
			loading: false,
			error: ''
		};
	}

	createMarkup = ( data ) =>({
			__html: data			
		});

	componentDidMount() {
		const wordpressSiteUrl = 'http://localhost/WP_React';
		this.setState( { loading: true},
			() =>{
				axios.get(`${wordpressSiteUrl}/wp-json/wp/v2/posts/${this.props.id}`)
					.then(res=> {
						if ( res.data ){
							
							this.setState({ loading: false, post: res.data});
						}
						else {
							this.setState({ loading: false, error: 'No Post Found.'});
						}
					})
					.catch(err => this.setState({ loading: false, error: err.response.data.message }));
			});

	}

	render() {
		const { post, loading, error } = this.state;
		return (
			<React.Fragment>
				<Navbar />
				{ error && <div className="alert alert-danger" dangerouslySetInnerHTML= { this.createMarkup (error)} /> }
				{ loading && <img src={ Loader } className="loader" /> }
				{
					Object.keys( post ).length ?
						(
							<div className="mt-5 posts-container">
								<div className="card border-dark mb-3" key={ post.id }>
									<div className="card-header">
										{ renderHTML( post.title.rendered) }
									</div>
									<div className="card-body">
										<div className="card-text post-content">
											{ renderHTML(post.content.rendered) }
										</div>
									</div>
								</div>
							</div>
						) : ''
				}

			</React.Fragment>
		);
	}
}

export default SinglePost;