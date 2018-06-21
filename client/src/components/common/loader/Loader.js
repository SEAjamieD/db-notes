import React from 'react';
import styled from 'styled-components';
import anime from 'animejs';

const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle1 = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #5d0eff;
`;

const Circle2 = styled.div`
  position: absolute;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #c3a7ff;
`;

const Circle3 = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #a7ffc3;
`;


class Loader extends React.Component {

  componentDidMount() {
    this.circleAnimation();
  }

render() {
  return (
    <CircleContainer>
      <Circle3 innerRef={el => (this.circle1 = el)}/>
      <Circle2 innerRef={el => (this.circle2 = el)}/>
      <Circle1 innerRef={el => (this.circle3 = el)}/>
    </CircleContainer>
  );
}


circleAnimation = () => {
  const { circle1, circle2, circle3 } = this;

  anime({
    targets: circle1,
    opacity: [.6, 0],
    scale: [.5, 1.2],
    easing: "easeOutSine",
    direction: 'alternate',
    loop: true,
    duration: 2000
  });
  anime({
    targets: circle2,
    opacity: [.7, 0],
    scale: [.5, 1.5],
    easing: "easeOutSine",
    direction: 'alternate',
    loop: true,
    delay: 300,
    duration: 1700
  });
  anime({
    targets: circle3,
    opacity: [.4, 0],
    scale: [.5, 1.9],
    easing: "easeOutSine",
    direction: 'alternate',
    loop: true,
    delay: 500,
    duration: 1000
  });
}


}

export default Loader;
