import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import Textarea from "react-textarea-autosize";
import DeleteWarning from "../common/deleteWarning/DeleteWarning";
import styled from 'styled-components';
import anime from 'animejs';
import './markdown-styles.css';


const SingleNotePage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

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
  max-width: 750px;
  background: white;
  padding-bottom: 20px;
`;

const DoneButton = styled.button`
  position: absolute;
  top: 15px;
  right: 5vw;
  color: white;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background: red;
  border: none;
  outline: 0;
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
      isNew: true,
      change: null,
      rawMarkDown: false,
      updatedTitle: '',
      updatedNote: '',
      note: '',
      ready: false,
      error: '',
      deleteWarning: false,
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.setState({isNew: false})
    }
  }

  componentDidMount() {
    if (this.state.isNew === false) {
      this.fetchSingleNote();
      this.animateIn();
    } else {
      this.animateIn();
    }
  }

  createNote = () => {
    const note = {"title": this.titleInput.value, "note": this.state.updatedNote }
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
        this.props.history.push(`/notes/${newID}`);
        this.setState({
          isNew: false,
          change: null
        })
      })
  }

  updateNote = () => {
    const { match } = this.props;
    const note = {"title": this.state.updatedTitle, "note": this.state.updatedNote }
    // only hit the api if the content changed
    if (this.state.change === true) {
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
        console.log(response)
        this.setState({
          change: null,
          rawMarkDown: false,
        })
      })
    // otherwise just covert back to markup
    } else {
      this.setState({
        rawMarkDown: false,
      })
    }
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
        this.setState({
          note: data[0],
          updatedTitle: data[0].title,
          updatedNote: data[0].note,
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

  handleChange = (e) => {
    this.setState({
      change: true,
      updatedTitle: e.target.value
    })
  }

  handleNoteBodyChange = (e) => {
    this.setState({
      change: true,
      updatedNote: e.target.value
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

  deleteWarning = () => {
    this.setState({deleteWarning: true})
  }

  resetWarning = () => {
    this.setState({deleteWarning: false})
  }



  whichDoneButton = () => {
    if ( (this.state.isNew === true) && (this.state.change === true) ) {
      return <DoneButton onClick={this.createNote}>Save</DoneButton>;
    } else if (this.state.change === true) {
      return <DoneButton onClick={this.updateNote}>Save</DoneButton>
    } else if (this.state.change === null && this.state.rawMarkDown === true) {
      return <DoneButton onClick={this.updateNote}>Done</DoneButton>
    } else if ( (this.state.isNew === false) && (this.state.change === null) ) {
      return <DoneButton onClick={this.deleteWarning}>Delete</DoneButton>
    } else {
      return;
    }
  }

  handleMarkdownSwap = () => {
    const { rawMarkDown } = this.state;
    if (rawMarkDown === false) {
      this.setState({rawMarkDown: true});
    } else {
      this.setState({rawMarkDown: false});
    }
  }

  //Long Press Functions
  handleTouchStart = () => {
    this.buttonPressTimer = setTimeout( () => this.setState({rawMarkDown: true}), 1500);
  }

  handleTouchEnd = () => {
    clearTimeout(this.buttonPressTimer);
  }


  whichBodyInput = () => {
    const { isNew, updatedNote, rawMarkDown } = this.state;

    if ( isNew === true ) {
      return (
        <Textarea
        onChange={this.handleNoteBodyChange}
        style={textAreaStyles}
        rows={4}
        placeholder="Something interesting here..."
        />
    );
  } else if ( updatedNote && rawMarkDown === true ) {
    return (
      <Textarea
        onChange={this.handleNoteBodyChange}
        style={textAreaStyles}
        rows={4}
        defaultValue={updatedNote}
        />
    );
  } else if ( updatedNote && rawMarkDown === false ) {
      return (
        <div onDoubleClick={this.handleMarkdownSwap} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>

        <ReactMarkdown
          className="markdown"
          source={updatedNote}
          />
        </div>
      );
    }
  }

  render() {
    const { note, deleteWarning  } = this.state;
    const { history, match } = this.props;

    return (
      <SingleNotePage>

        { deleteWarning === true ?
          <DeleteWarning
          history={history}
          match={match}
          warningReset={this.resetWarning}
          /> : null }

        <BackArrowContainer onClick={this.goBack}>
          <BackArrow innerRef={el => (this.backArrow = el)}/>
          <p ref={el => (this.backNotes = el)}>Notes</p>
        </BackArrowContainer>

        {this.whichDoneButton()}

        <Notepad innerRef={el => (this.notepad = el)}>



          <TitleInput
          innerRef={input => (this.titleInput = input)}
          onChange={this.handleChange}
          placeholder="Title"
          defaultValue={note.title}
           />

        {this.whichBodyInput()}

        </Notepad>

      </SingleNotePage>
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
