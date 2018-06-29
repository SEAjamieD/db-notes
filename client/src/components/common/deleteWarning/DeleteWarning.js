import React from 'react';
import styled from 'styled-components';
import anime from 'animejs';

const DeleteVisor = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  z-index: 200;
  top: 0;
  right: 0;
  h2 {
    line-height: 2;
    font-size: 2rem;
    width: 60%;
    margin: 40px;
  };
  span {
    background-color: black;
    color: white;
    display: inline;
    padding: .6rem;
    box-decoration-break: clone;
  }
  @media (min-width: 600px) {

    height: 250px;

    h2 {
      text-align: center;
      margin: 40px auto;
    }
  }
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  max-width: 350px;

  @media (min-width: 600px) {
    padding-top: 20px;
  }
`;

const Button = styled.button`
  width: 125px;
  height: 50px;
  border-radius: 0;
  font-size: 20px;
  color: white;
  text-transform: uppercase;
  border: none;
  outline: 0;
  background: ${props => props.primary ? '#ED4337' : '#00FA9A'};
`;

class DeleteWarning extends React.Component {

  componentDidMount() {
    this.slideWarningIn()
  }

  handleWarningChange = () => {
    this.props.warningReset();
  }

  deleteNote = () => {
    const { match, history } = this.props;
    fetch(`/api/notes/${match.params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( res => res.json() )
      .then( response => {
        console.log(response)
        history.push('/');
      })
  }

  render() {
    return (
      <DeleteVisor
      className="delete-shield"
      innerRef={el => (this.deleteWarning = el)}
      >
        <h2>
          <span>Sure you wanna delete?</span>
        </h2>
        <ButtonContainer>
          <Button onClick={this.slideWarningOut}>Cancel</Button>

          <Button primary onClick={this.deleteNote}>Delete</Button>
        </ButtonContainer>
      </DeleteVisor>
    );
  }

slideWarningIn() {
  const { deleteWarning } = this;
  anime({
    targets: deleteWarning,
    translateY: [-300, 0],
    easing: 'easeInSine',
    duration: 200
  })
}

slideWarningOut = () => {
  const { deleteWarning, handleWarningChange } = this;
  anime({
    targets: deleteWarning,
    translateY: [0, -300],
    easing: 'easeOutSine',
    duration: 200,
    complete: function() {
      handleWarningChange();
    }
  })
}

}
export default DeleteWarning;
