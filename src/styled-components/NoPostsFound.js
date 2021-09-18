import styled from 'styled-components'


const NoPostFound = styled.div`
  width: 611px;
  padding: 20px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  color: #ffffff;

  @media (max-width: 635px) {
    min-width: 100%;
    width: 100%;
  }
`;

export default NoPostFound