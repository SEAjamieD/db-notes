import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
width: 100%;
height: 100vh;
h2 {
  line-height: 2;
  font-size: 3rem;
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

const LoginInput = styled.input`
  width: 80%;
  padding: 14px 5px 14px 10px;
  border: none;
  border-radius: 0;
  font-size: 1.8rem;
  margin: 15px auto;
  display: block;
`;

class Login extends React.Component {


  render() {
    return (
      <LoginContainer className="login-shield">
        <h2><span>But First, Log In.</span></h2>
        <form>
          <LoginInput type="text" placeholder="username" />
          <LoginInput type="password" placeholder="password" />
          <LoginInput className="blue-flow" type="submit" value="Submit" />
        </form>
      </LoginContainer>
    );
  }
}

export default Login;
