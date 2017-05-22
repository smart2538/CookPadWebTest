import React, { Component } from 'react';

import { Card, Image, Button, Form } from 'semantic-ui-react'
import moment from 'moment'

import ImageURL from './../static/ProjectPic.JPG'
import { database, auth } from './../Firebase.js'
import  Comments from './Comments.js'

export default class ProjectCard extends Component {
  state = {
    loading: false,
    comment: ""
  }

  constructor(props){
    super(props);
    this.deletePost = this.deletePost.bind(this);
    this.onEnterComment = this.onEnterComment.bind(this)
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  deletePost(e){
    e.preventDefault();
    const { key } = this.props.post;
    database.ref('posts/').child(key).remove();
  }

  onEnterComment(e){
    e.preventDefault();
    this.setState({loading: true});
    const { key } = this.props.post;
    const { comment } = this.state;
    let commentKey = database.ref('posts/').child(key).child('comments').push().key;
    let updates = {};
        let user = auth.currentUser;
        const postData = {
            comment,
            timestamp: new Date().valueOf(),
            author: user.email,
            key: commentKey
        };
        updates['/posts/'+ key+ '/comments/' + commentKey] = postData;
        console.log(updates);
        return database.ref().update(updates).then(() =>{
            this.setState({loading: false, comment: ""})
        });
  }


  render() {
    const { post, user } = this.props;
    const { loading } = this.state;
    const deleteButton =  user && user.email == post.author ? 
      <Button inverted floated="right" icon='close' color="red" onClick={this.deletePost}>
      </Button> : "";
    const CommentForm = user ? 
      <Form loading={loading} onSubmit={this.onEnterComment}>
            <Form.Input action={<Button icon circular icon="send" />} transparent fluid placeholder='comment here...'
               name="comment" onChange={this.handleChange} />
          </Form> : "";
    return (
      <Card>
        <Card.Content>
            {post.author}
          <Card.Meta className="right floated" >
            <span className='date'>
              post at {moment(post.timestamp).fromNow()}
            </span>
            {deleteButton}
          </Card.Meta>
        </Card.Content>
        <Image id="image" src={post.imageUrl} />
        <Card.Content extra>
          <Card.Description>
            {post.caption}
          </Card.Description>
          <Card.Description>
            <Comments comments={post.comments} user={user} post={post}/>
          </Card.Description>
          {CommentForm}
        </Card.Content>
      </Card>
      
    )
  }
}