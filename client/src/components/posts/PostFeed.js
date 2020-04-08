import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    let obj = []
    var idd=this.props.idd;
    for(var i=0;i<posts.length;i++)
    {
      if(posts[i].searchId)
      {
        if(idd===posts[i].searchId)
        {
          obj.push(posts[i]);
        }
      }
    }
    console.log(obj);
    console.log(posts)
    return obj.map(post => <PostItem key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
