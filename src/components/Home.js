import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';

import Navbar from './Navbar';
import Loader from '../loader.gif';


class Home extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			posts: [],
			loading: false,
			error: ''
		}
	}

	createMarkup = ( data ) => ({
		__html: data
	});

	componentDidMount() {
		const wordpressSiteUrl = 'http://localhost/WP_React';
		this.setState(
			{ loading: true}, 
			() => {
				axios.get(`${wordpressSiteUrl}/wp-json/wp/v2/posts`)
					.then(res=> {
						if (res.data.length) {
							this.setState({ loading: false, posts: res.data});
						}
						else {
							this.setState( { loading: false, error: 'No Posts Found.'} );
						}
					})
					.catch(err=> this.setState( { loading: false, error: err} ));
		});
	}
	render() {
		const { posts, loading, error } = this.state;
		return (
			<React.Fragment>
				<Navbar />
				{ error && <div className="alert alert-danger" dangerouslySetInnerHTML={ this.createMarkup( error )} /> }
				{ loading && <img src={ Loader } className="loader" /> }
				{
					posts.length ? (
						posts.map( post => 
							(
								<div className="card mb-3" key={ post.id } style={{ maxWidth: '50rem'}} >
									<div className="card-header">
										<Link to={`/post/${post.id}`} className="text-secondary font-weight-bold" style={{ textDecoration: 'none' }} >
											{ renderHTML( post.title.rendered) }
										</Link>
									</div>
									<div className="card-body">
										<div className="card-text post-content">{ renderHTML(post.excerpt.rendered) }</div>
									</div>
									<div className="card-footer">
										<Moment fromNow> { post.date }</Moment>
										<Link className="btn btn-secondary float-right" style={{ textDecoration: 'none'}} to={`/post/${post.id}`}>Read More ..</Link>
									</div>
								</div>
							)
						)

					) : ''
				}
			</React.Fragment>
		);
	}
}

export default Home;