import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Main from './components/main/Main';
import SingleNote from './components/singleNote/SingleNote';
import './App.css';


const AppDiv = styled.div`
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
            <Route exact path="/notes/new" component={SingleNote} />
            <Route exact path="/notes/:id" component={SingleNote} />


          </Switch>
        </BrowserRouter>

      </AppDiv>
    );
  }
}

export default App;
