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
			loading: false
		}
	}
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
					})
					.catch(err=> console.log(err));
		});
	}
	render() {
		const { posts, loading } = this.state;
		return (
			<div>
				<Navbar />
				{ loading && <img src={ Loader } className="loader" /> }
				{
					posts && posts.length && (
						posts.map( post => 
							(
								<div className="card mb-3" key={ post.id }>
									<h3 className="card-header">{ post.title.rendered }</h3>
									<div className="card-body">
										{ renderHTML(post.content.rendered) }
									</div>
									<div className="card-footer">
										<Link className="btn btn-primary" to={`/post/${post.id}`}>View Post</Link>
									</div>
								</div>
							)
						)

					)
				}
			</div>
		);
	}
}

export default Home;