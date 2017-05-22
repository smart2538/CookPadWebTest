import React, { Component } from 'react';

import { Menu, Container, Dropdown } from 'semantic-ui-react'
import { auth } from './../Firebase.js'

import ModalUploadPic from './../component/ModalUploadPic.js'
import ModalRegisterSignin from './ModalRegisterSignin.js'

export default class NavBar extends Component {
  state = {
  }
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }



  componentWillMount(){
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user})
      } else {
        this.setState({user})
        // No user is signed in.
      }
    });
  }

  logout(e){
    e.preventDefault();
    this.setState({loading: true});
    auth.signOut().then(() => {
      // Sign-out successful.
      this.setState({loading: false});
    }).catch((error) => {
      // An error happened.
    });
  }

  render() {
    const { user } = this.state
    const { handleItemClick, page } = this.props
    const userProfileActionButton =  user ? "" : <ModalRegisterSignin />;
    const userProfile = user ? user.email : "";
    return (
     
      <Menu inverted pointing size='tiny'>
        <Container text>
          <Menu.Item
            name='Feeds'
            active={page === 'Feeds'}
            onClick={handleItemClick}
          >
            Feeds
          </Menu.Item>          
          {user ? <Menu.Item disabled={!user}
              name='your image'
              active={page === 'your image'}
              onClick={handleItemClick}
            >
            Home
            </Menu.Item>
          : 
            ""
          }
          <Menu.Menu position='right'>
            
            
            {user? <Menu.Item>
              <ModalUploadPic user={user} />
            </Menu.Item> : ""}
            {user ? 
            <Dropdown item text={userProfile}>
              <Dropdown.Menu>
                <Dropdown.Item  onClick={this.logout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
            : userProfileActionButton}
          </Menu.Menu>

        </Container>
      </Menu>
      
    )
  }
}
