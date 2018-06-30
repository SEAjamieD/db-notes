import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import anime from 'animejs';

import { Notepad,
         Plus,
         NoteTable } from '../CustomStyles';

import Loader from '../common/loader/Loader';

class Main extends Component {
  constructor() {
    super()
    this.state = {
      notes: '',
      ready: false,
      error: '',
    }
  }

  componentDidMount() {
    this.fetchNotes();
  }

  componentDidUpdate() {
    if (this.state.ready === true) {
      this.animateIn();
    }
  }

  fetchNotes = () => {
    fetch('/api/all-notes')
      .then(response => {
        return response.json()
      .then(json => {
        return response.ok ? json : Promise.reject(json);
        });
      })
      .then((data) => {
        console.log(data.messages);
        this.setState({
          notes: data.messages,
          ready: true,
        })
      })
      .catch((error) => {
        console.log('Error', error);
        this.setState({
          ready: true,
          error: error.err
        })
      })
  }

  convertTimestamp = (timestamp) => {
    if (timestamp) {
      let d = new Date(timestamp);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getYear().toString().substr(-2);
      const fullDate = `${month}/${day}/${year}`;
      return fullDate;
    }
  }

  // @render

  render() {
    const { notes } = this.state;

    if (this.state.ready === true) {

      return (
        <div className="Main">

          <Plus
            innerRef={el => (this.plusSign = el)}
            onClick={this.animateOutNew}
            />

          <Notepad primary innerRef={el => (this.notepad = el)}>
            <h1>NOTES</h1>
            <NoteTable>
              <tbody>
              {notes.map((note) => (
                <tr key={note.id}
                  onClick={() => this.animateOutSingle(note.id)}
                  >
                  <td className="note-title">{note.title}</td>
                  <td className="notepad-date">{this.convertTimestamp(note.updated_at)}</td>
                </tr>
              ))}
              </tbody>
            </NoteTable>
          </Notepad>

        </div>
      );

    }

    return (
      <Loader />
    );
  }



 animateIn() {
   const { notepad, plusSign } = this;
   anime({
     targets: notepad,
     opacity: [0,1],
     translateY: ["-100%", "10vh"],
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

 animateOutNew = () => {
   const { notepad, plusSign } = this;
   const { history } = this.props;
   anime({
     targets: plusSign,
     translateY: [0, -50],
     rotate: 45,
     elasticity: 400,
     duration: 500
   });
   anime({
     targets: notepad,
     opacity: [1,0],
     translateY: ["10vh", "-100%"],
     elasticity: 400,
     delay: 500,
     duration: 800,
     complete: function() {
       history.push('/notes/new')
     }
   })
 }

 animateOutSingle = (id) => {
   const { notepad, plusSign } = this;
   const { history } = this.props;
   anime({
     targets: plusSign,
     translateY: [0, -50],
     rotate: 45,
     elasticity: 400,
     duration: 500
   });
   anime({
     targets: notepad,
     opacity: [1,0],
     translateY: ["10vh", "-100%"],
     elasticity: 400,
     delay: 500,
     duration: 800,
     complete: function() {
       history.push(`/notes/${id}`)
     }
   })
 }


}

export default withRouter(Main);
