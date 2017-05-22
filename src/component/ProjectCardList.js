import React, { Component } from 'react';

import { Card } from 'semantic-ui-react'

import ProjectCard from './ProjectCard.js'

export default class ProjectCardList extends Component {

  render() {
    const { posts = [], user = {} } = this.props
    return (
        <Card.Group stackable itemsPerRow={1} >
         {posts.map((post, index) => {
          return <ProjectCard post={post} key={index} user={user} />
         })}
         </Card.Group>
      
    )
  }
}
