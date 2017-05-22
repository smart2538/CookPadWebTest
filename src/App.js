import React, { Component } from 'react';

import './App.css';

import NavBar  from './component/NavBar.js';
import Feeds  from './page/Feeds.js';

import { Container } from 'semantic-ui-react';

class App extends Component {
    state = {
      page: "Feeds"
  }
  constructor(props){
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.setPage = this.setPage.bind(this)
  }
  handleItemClick = (e, { name }) => {
    this.setState({ page: name })
  }

  setPage(page){
    this.setState({page})
  }

  render() {
    const { page } = this.state;
    return (
      <div className="App">
        <NavBar handleItemClick={this.handleItemClick} page={page} />
        <Container text>
          <Feeds page={page} setPage={this.setPage}/>
        </Container>
      </div>
    );
  }
}

export default App;
