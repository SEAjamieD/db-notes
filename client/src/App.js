import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import styled from 'styled-components';


import Main from './components/main/Main';
import NewNote from './components/new/New';
import './App.css';


const AppDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

class App extends Component {

  render() {
    return (
      <AppDiv>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/notes/new" component={NewNote} />

          </Switch>
        </BrowserRouter>

      </AppDiv>
    );
  }
}

export default App;
