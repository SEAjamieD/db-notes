import React, { Component } from 'react';
import anime from 'animejs';
import styled from 'styled-components';

const Notepad = styled.div`
  height: auto;
  min-height: 90vh;
  width: 90vw;
  background: white;
  h1 {
    font-family: 'Rock Salt', cursive;
    margin: 0;
    padding: 5px 0;
    text-align: center;
  }
`;

const NoteInput = styled.input`
  width: 100%;
  font-size: 26px;
  height: 2em;
  padding: 4px 2px 4px 5px;
  border: none;
  border-radius: 0;
`;

class Main extends Component {
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
        <div className="Main">
          <Notepad innerRef={el => (this.notepad = el)}>
            <h1>NOTES</h1>
            <NoteInput type="text" />
          </Notepad>

        </div>
      );

    }

    return (
      <div className="Main">

      </div>
    );
  }



 animateIn() {
   const { notepad } = this;
   anime({
     targets: notepad,
     opacity: [0,1],
     translateY: ["-100%", "10vh"],
     easing: "easeOutSine",
     duration: 2000
   })
 }


}

export default Main;
