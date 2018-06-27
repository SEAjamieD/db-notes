import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Textarea from "react-textarea-autosize";
import anime from 'animejs';


const BackArrowContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  color: white;
  top: 15px;
  left: 5vw;
  p {
    display: block;
    font-size: 11px;
    padding-left: 10px;
    text-transform: uppercase;
  }
`;

const BackArrow = styled.div`
  height: 30px;
  width: 30px;
  background: white;
  clip-path: polygon(50% 0%, 0% 100%, 50% 75%, 100% 100%);
`;

const DoneButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 50px;
  width: 100px;
  background: transparent;
  font-size: 24px;
  border: none;
  outline: 0;
  border-radius: none;
  text-transform: uppercase;
`;

const Notepad = styled.div`
  position: relative;
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

const TitleInput = styled.input`
  width: 100%;
  border-radius: 0;
  border: none;
  outline: none;
  display: block;
  padding: 18px 5px 8px 18px;

  font-family: 'Ubuntu', sans-serif;
  font-size: 26px;
  font-weight: 600;
  color: grey;
`;

const textAreaStyles = {
  resize: 'none',
  width: '100%',
  minHeight: '30vh',
  borderRadius: 0,
  border: 'none',
  outline: 'none',
  paddingLeft: '18px',
  paddingRight: '18px',
  paddingTop: '20px',
  paddingBottom: '20px',
  fontSize: '14px',
  };

class NewNote extends React.Component {
  constructor() {
    super();
    this.state = ({
      delta: 0,
      title: '',
      note: ''
    })
  }

  componentDidMount() {
    this.animateIn();
    this.titleInput.focus();
  }

  createNote = () => {
    const note = {"title": this.titleInput.value, "note": this.state.note }
    console.log(note);
    fetch('/api/notes/create', {
      method: 'POST',
      body: JSON.stringify({note}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( res => res.json() )
      .then( response => {
        console.log(response)
        let newID = response;
        this.props.history.push(`/notes/${newID}`)
      })
  }

  handleChange = (e) => {
    this.setState({
      delta: 1,
      title: e.target.value
    })
  }

  handleNoteBodyChange = (e) => {
    this.setState({note: e.target.value})
  }



  goBack = () => {
    const { notepad, backArrow, backNotes } = this;
    const { history } = this.props;
    anime({
      targets: backNotes,
      translateY: [0, -70],
      rotate: [0, 90],
      elasticity: 400,
      duration: 400
    });
    anime({
      targets: backArrow,
      translateY: [0, -50],
      rotate: 90,
      elasticity: 400,
      delay: 250,
      duration: 400
    });
    anime({
      targets: notepad,
      opacity: [1,0],
      translateY: ["10vh", "-100%"],
      elasticity: 400,
      delay: 400,
      duration: 500,
      complete: function() {
        history.goBack();
      }
    });
  }

  render() {
    const { delta } = this.state;

    return (
      <div>

        <BackArrowContainer onClick={this.goBack}>
          <BackArrow innerRef={el => (this.backArrow = el)}/>
          <p ref={el => (this.backNotes = el)}>Notes</p>
        </BackArrowContainer>


        <Notepad innerRef={el => (this.notepad = el)}>

          { delta && delta === 1 ? (
            <DoneButton
              onClick={this.createNote}
              >Done</DoneButton>
          ) : ( <h2></h2> ) }

          <TitleInput
          innerRef={input => (this.titleInput = input)}
          onChange={this.handleChange}
          placeholder="Title"
           />

          <Textarea
            onChange={this.handleNoteBodyChange}
            style={textAreaStyles}
            rows={4}
            placeholder="Something important here..."
            />

        </Notepad>

      </div>
    );
  }

  animateIn() {
    const { notepad, backArrow, backNotes } = this;
    anime({
      targets: notepad,
      opacity: [0,1],
      translateY: ["-100%", "10vh"],
      elasticity: 400,
      duration: 600
    });
    anime({
      targets: backArrow,
      translateY: [-50, 0],
      rotate: -90,
      delay: 500,
      elasticity: 400,
      duration: 500
    });
    anime({
      targets: backNotes,
      translateY: [-70, 0],
      rotate: [90, 0],
      delay: 800,
      elasticity: 400,
      duration: 500
    });
  }


}



export default withRouter(NewNote);
