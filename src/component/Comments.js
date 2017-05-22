import React, { Component } from 'react'

import { Comment, Button, Icon } from 'semantic-ui-react'
import values from 'lodash/values'
import moment from 'moment'

import { database } from './../Firebase.js'


export default class ProjectCard extends Component {

    deleteComment = (value) => {

        const { key } = this.props.post;
        console.log(key, value);
        database.ref('posts/').child(key).child('comments').child(value).remove();
    }

    render(){
        let { comments, user, post } = this.props;
        comments = values(comments).sort((a, b) => a.timestamp - b.timestamp);

        return(
            <Comment.Group>
                {comments.map((comment, index) => {
                    const commentAction = user && (comment.author == user.email || post.author == user.email) ? 
                    <Comment.Actions>
                        <a onClick={() => this.deleteComment(comment.key)}>delete</a>
                    </Comment.Actions> : "";
                    return (
                        <Comment key={index}>
                            <Comment.Avatar src='/assets/images/avatar/small/matt.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.author}</Comment.Author>
                                <Comment.Metadata>
                                <div>{moment(comment.timestamp).fromNow()}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.comment}</Comment.Text>
                                {commentAction}
                                 
                            </Comment.Content>
                        </Comment>
                    )
                })}
            </Comment.Group>
        
        )
    }


}