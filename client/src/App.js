import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Main from './components/main/Main';
import SingleNote from './components/singleNote/SingleNote';
import Login from './components/login/Login';
import './App.css';


const AppDiv = styled.div`
  display: flex;
  justify-content: center;
`;

class App extends Component {
  constructor() {
    super();
  }

  isLoggedIn = () => {
    console.log("on enter hit")
  }

  render() {
    return (
      <AppDiv>

        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Main} onEnter={this.isLoggedIn()} />
            <Route exact path="/notes/new" component={SingleNote} />
            <Route exact path="/notes/:id" component={SingleNote} />


          </Switch>
        </BrowserRouter>

      </AppDiv>
    );
  }
}

export default App;
