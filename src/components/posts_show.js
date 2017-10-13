import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        if (!this.props.post) {
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    helperFunction() {
        this.props.posts[this.props.match.params.id];
    }

    render() {
        // posts[this.props.match.params.id]; // the post we want to show
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back to Index</Link>
                <h3>{ post.title }</h3>
                <h6>Categories: { post.categories }</h6>
                <p>{ post.content }</p>
            </div>
        )
    }
}

// ownProps below is the props object that is headed or going to PostsShow component
function mapStateToProps({ posts }, ownProps) {
    // return { posts };
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);