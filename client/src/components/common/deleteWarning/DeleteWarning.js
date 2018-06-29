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
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const Button = styled.button`
  width: 125px;
  height: 50px;
  border-radius: 0;
  font-size: 20px;
  color: white;
  text-transform: uppercase;
  border: none;
  background: #ED4337;
`;

class DeleteWarning extends React.Component {

  componentDidMount() {
    this.slideWarningIn()
  }

  render() {
    return (
      <DeleteVisor className="delete-shield" innerRef={el => (this.deleteWarning = el)}>
        <h2>
          <span>Sure you wanna delete?</span>
        </h2>
        <ButtonContainer>
          <Button/> <Button>Delete</Button>
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

}
export default DeleteWarning;
