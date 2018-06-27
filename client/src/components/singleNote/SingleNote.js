import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
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
  transform: rotate(-90deg);
`;

const Notepad = styled.div`
  height: auto;
  min-height: 90vh;
  width: 90vw;
  background: white;
  transform: translateY(10vh);
  h1 {
    width: 100%;
    border-radius: 0;
    display: block;
    padding: 18px 5px 8px 18px;

    font-family: 'Ubuntu', sans-serif;
    font-size: 26px;
    font-weight: 600;
    color: grey;
  };
  p {
    width: 100%;
    min-height: 30vh;
    padding: 20px 18px;
    font-size: 14px;
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

const NoteContentP = styled.p`
  width: 100%;
  min-height: 60vh;
  border-radius: 0;
  border: none;
  outline: 0;
  padding: 20px 18px;
  font-size: 14px;
`;



class SingleNote extends React.Component {
  constructor() {
    super()
    this.state = {
      note: '',
      ready: false,
      error: '',
    }
  }

  updateNote = () => {
    const { match } = this.props;
    const note = {"title": this.titleInput.value, "note": this.state.note }
    console.log(note);
    fetch(`/api/notes/edit/${match.params.id}`, {
      method: 'PUT',
      body: JSON.stringify({note}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( res => res.json() )
      .then( response => {
        console.log('Success')
        if (response === 'success') {
          this.setState({delta: 2})
        }
      })
  }

  componentDidMount() {
    this.fetchSingleNote();
    // this.animateIn();
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
        history.push('/');
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
          <TitleInput
          innerRef={input => (this.titleInput = input)}
          onChange={this.handleChange}
          defaultValue={note.title}
           />

         <NoteContentP
          contentEditable
          suppressContentEditableWarning
          >
          {note.note}</NoteContentP>

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
