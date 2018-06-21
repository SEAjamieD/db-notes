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

const Plus = styled.div`
  position: absolute;
  top: 15px;
  right: 5vw;
  height: 30px;
  width: 30px;
  transform: rotate(45deg);
  background: white;
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
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

          <Plus innerRef={el => (this.plusSign = el)}/>

          <Notepad innerRef={el => (this.notepad = el)}>
            <h1>NOTES</h1>
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
   const { notepad, plusSign } = this;
   anime({
     targets: notepad,
     opacity: [0,1],
     translateY: ["-100%", "10vh"],
     // easing: "easeOutSine",
     elasticity: 400,
     duration: 800
   });
   anime({
     targets: plusSign,
     translateY: [-50, 0],
     rotate: 45,
     delay: 500,
     elasticity: 400,
     duration: 500
   });
 }


}

export default Main;
