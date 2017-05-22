import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react'
import  values  from 'lodash/values'

import ProjectCardList from './../component/ProjectCardList.js'
import { database, auth } from './../Firebase.js'


export default class Feeds extends Component {

    state = {
        post: [],
    }
    componentWillMount(){
        database.ref('/').orderByChild('timestamp').on('value', snap => {
            let { posts } = snap.val();
            posts = values(posts).reverse();
            this.setState({posts});
        });
        auth.onAuthStateChanged((user) => {
        if (user) {
            this.setState({user})
        } else {
            const { setPage } = this.props;
            setPage({page: "Feeds"});
            this.setState({user})
            // No user is signed in.
        }
        });
    }

  render() {
    let { posts, user } = this.state;
    const { page } = this.props;
    if(page !== "Feeds" && user){
        posts = posts.filter(post => post.author === user.email);
    }
    return (
        <Grid>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
                <ProjectCardList posts={posts} user={user} />
            </Grid.Row>
        </Grid>
      
    )
  }
}
