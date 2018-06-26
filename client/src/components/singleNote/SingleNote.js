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

const Notepad = styled.div`
  height: auto;
  min-height: 90vh;
  width: 90vw;
  background: white;
  h1 {
    font-family: 'Ubuntu', sans-serif;
    font-size: 26px;
    font-weight: 600;
    color: grey;
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

class SingleNote extends React.Component {
  constructor() {
    super()
    this.state = {
      note: '',
      ready: false,
      error: '',
    }
  }

  componentDidMount() {
    this.fetchSingleNote();
    this.animateIn();
  }

  fetchSingleNote = () => {
    const { match } = this.props;
    fetch(`/api/notes/${match.params.id}`)
      .then(response => {
        return response.json()
      .then(json => {
        return response.ok ? json : Promise.reject(json);
        });
      })
      .then((data) => {
        console.log(data[0].Title);
        this.setState({
          note: data[0],
          ready: true,
        })
      })
      .catch((error) => {
        console.log('Error', error);
        this.setState({
          ready: false,
          error: error.err
        })
      })
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
    const { note } = this.state;
    return (
      <div>

        <BackArrowContainer onClick={this.goBack}>
          <BackArrow innerRef={el => (this.backArrow = el)}/>
          <p ref={el => (this.backNotes = el)}>Notes</p>
        </BackArrowContainer>


        <Notepad innerRef={el => (this.notepad = el)}>
          <h1>{note.title}</h1>

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



export default withRouter(SingleNote);
