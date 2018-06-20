import React, { Component } from 'react';
import anime from 'animejs';
import styled from 'styled-components';
import './App.css';

const Notepad = styled.div`
  margin-top: 10%;
  height: auto;
  min-height: 90%;
  width: 90%;
  background: white;
  h1 {
    font-family: 'Rock Salt', cursive;
    margin: 0;
    padding: 5px 0;
    text-align: center;
  }
`;

// const Title = styled.h1`
//   font-family: 'Rock Salt', cursive;
//   margin: 0;
//   padding: 5px 0;
//   text-align: center;
// `;

const NoteInput = styled.input`
  width: 100%;
  font-size: 26px;
  height: 2em;
  padding: 4px 2px 4px 5px;
  border: none;
  border-radius: 0;
`;

class App extends Component {
  constructor() {
    super()
    this.state = {
      test: '',
      ready: false
    }
  }

  componentDidMount() {
    this.fetchNotes();
  }

  componentDidUpdate() {
    if (this.state.test) {
      this.animateIn();
    }
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
        this.setState({
          test: data,
          ready: true,
        })
      })
      .catch((error) => {
        console.log('Error', error);
      })
  }

  render() {
    if (this.state.ready === true) {

      return (
        <div className="App">
          <Notepad innerRef={el => (this.notepad = el)}>
            <h1>NOTES</h1>
            <NoteInput type="text" />
          </Notepad>

        </div>
      );

    }

    return (
      <div className="App">

      </div>
    );
  }



 animateIn() {
   const { notepad } = this;
   anime({
     targets: notepad,
     opacity: [0,1],
     translateY: [-1000, 0],
     easing: "easeOutSine",
     duration: 2000
   })
 }


}

export default App;
