import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const ContainerTitle = styled.div`
  width: 60%;
  height: 100%;
  background-color: #151515;
  color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 5%;

  @media (max-width: 600px) {
    width: 100%;
    height: 25%;
    padding-left: 0;
    align-items: center;
    padding: 5px 0;
  }
`;
const Title = styled.h1`
  font-size: 106px;
  font-family: "Passion one";
  font-weight: 700;
  letter-spacing: 0.05em;

  @media (max-width: 600px) {
    font-size: 76px;
  }
`;
const Description = styled.h2`
  font-family: "Oswald";
  font-size: 43px;
  font-weight: bold;
  line-height: 60px;

  @media (max-width: 600px) {
    font-size: 23px;
    line-height: 34px;
  }
`;
const ContainerForm = styled.div`
  width: 40%;
  height: 100%;
  background-color: #333333;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: flex-start;
    padding-top: 10%;
    width: 100%;
    height: 75%;
  }
`;
const Input = styled.input`
  width: 80%;
  height: 65px;
  background-color: #ffffff;
  color: #9f9f9f;
  border: none;
  border-radius: 6px;
  font-family: "Oswald";
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 10px;

  ::placeholder {
    color: #9f9f9f;
  }

  @media (max-width: 600px) {
    height: 55px;
  }
`;
const Button = styled.button`
  width: 80%;
  height: 65px;
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  margin-bottom: 13px;
  font-weight: bold;
  font-family: "Oswald";
  font-size: 27px;

  &:hover {
    cursor: pointer;
    filter: brightness(80%);
  }

  @media (max-width: 600px) {
    height: 55px;
    font-size: 22px;
  }
`;
const Connection = styled.p`
  text-decoration: underline;
  color: #ffffff;
  font-family: "Lato";
  font-size: 20px;
  font-weight: normal;

  @media (max-width: 600px) {
    font-size: 17px;
  }
`;
export {
  Container,
  ContainerTitle,
  ContainerForm,
  Title,
  Description,
  Input,
  Button,
  Connection,
};
