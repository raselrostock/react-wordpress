import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import renderHTML from 'react-render-html';

import Loader from '../loader.gif';
import Navbar from './Navbar';

class SinglePost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: null,
			loading: false
		}
	}
	componentDidMount() {
		const wordpressSiteUrl = 'http://localhost/WP_React';
		this.setState( { loading: true},
			() =>{
				axios.get(`${wordpressSiteUrl}/wp-json/wp/v2/posts/${this.props.id}`)
					.then(res=> {
						this.setState({ loading: false, post: res.data})
					})
					.catch(err => console.log(err));
			});

	}
	render() {
		const { post, loading } = this.state;
		
		return (
			<div>
				<Navbar />
				{ loading && <img src={ Loader } className="loader" /> }
				{
					post && (
								<div className="card mb-3" key={ post.id }>
									<h3 className="card-header">{ post.title.rendered }</h3>
									<div className="card-body">
										{ renderHTML(post.content.rendered) }
									</div>
								</div>
							)
				}

			</div>
		);
	}
}

export default SinglePost;