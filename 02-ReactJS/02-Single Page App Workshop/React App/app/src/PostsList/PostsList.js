import React, { Component } from 'react';

import './PostsList.css';

import Post from '../Post/Post';

import service from '../services/postService';

class PostsList extends Component{

    constructor(){
        super();

        this.state = {
            posts: null
        };
    }

    render(){

        const { posts } = this.state;
        return (
            <div className='Posts'>
                {posts ?
                    posts.map(post => <Post key={post._id} author={post.author} imgUrl='/blue-origami-bird.png'>{post.description}</Post>) 
                    : <div>Loading...</div>}
            </div>
        );
    }

    async componentDidMount(){
        const { count } = this.props;

        let posts = await service.getAll();

        if(count !== undefined){
            posts = posts.slice(0, count);
        }
        
        this.setState({ posts });
    }
}

export default PostsList;