import styled from 'styled-components';

export const Notepad = styled.div`
  height: auto;
  min-height: 90vh;
  width: 90vw;
  max-width: 750px;
  background: white;
  padding-bottom: 20px;
  h1 {
    font-family: ${props => props.primary ? " 'Rock Salt', cursive; " : " 'Ubuntu', sans-serif; "};
    font-size: 2em;
    padding: 30px 0 10px;
    text-align: ${props => props.primary ? "center" : "left"};
  }
`;

export const Plus = styled.div`
  position: absolute;
  top: 15px;
  right: 5vw;
  height: 30px;
  width: 30px;
  transform: rotate(45deg);
  background: white;
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
`;

export const NoteTable = styled.table`
  width: 90%;
  margin: 0 auto;
  border-radius: 0;
  border-collapse: collapse;
  tr {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(7, 156, 223, 0.2);
    cursor: pointer;
  };
  td {
    font-family: 'Ubuntu', sans-serif;
    color: #515151;
    vertical-align: bottom;
    height: 40px;
  }
`;

//// SingleNote Page Styles

export const SingleNotePage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const BackArrowContainer = styled.div`
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

export const BackArrow = styled.div`
  height: 30px;
  width: 30px;
  background: white;
  clip-path: polygon(50% 0%, 0% 100%, 50% 75%, 100% 100%);
  transform: rotate(-90deg);
`;

export const DoneButton = styled.button`
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

export const TitleInput = styled.input`
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

export const textAreaStyles = {
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
