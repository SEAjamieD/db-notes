import React, { Component } from 'react';
import styled from 'styled-components';


import Main from './components/main/Main';
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
        <Main />
      </AppDiv>
    );
  }
}

export default App;
