import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

const Notepad = styled.div`
  margin-top: 10%;
  height: auto;
  min-height: 90%;
  width: 90%;
  background: white;
`;

const Title = styled.h1`
  font-family: 'Rock Salt', cursive;
  margin: 0;
  padding: 5px 0;
  text-align: center;
`;

const NoteInput = styled.input`
  width: 100%;
  font-size: 26px;
  height: 2em;
  padding: 4px 2px 4px 5px
`;

class App extends Component {
  constructor() {
    super()
    this.state = {
      test: ''
    }
  }

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = () => {
    fetch('/api/test')
      .then(response => {
        console.log(response);
        return response.json()
      .then(json => {
        return response.ok ? json : Promise.reject(json);
        });
      })
      .then((data) => {
        console.log('success');
        this.setState({test: data})
      })
      .catch((error) => {
        console.log('Error', error);
      })
  }

  render() {
    return (
      <div className="App">
        <Notepad>
          <Title>To Do</Title>
          <NoteInput type="text" />
        </Notepad>

      </div>
    );
  }
}

export default App;
