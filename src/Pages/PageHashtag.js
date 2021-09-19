import styled from "styled-components";
import Header from "../components/Header";
import Trending from "../components/Trending";

export default function PageHashtag() {
    return (
        <>
          <Header/>
          <TimelineContainer>
            <TimelineBox>
              <TimelineBody>
                <Title>timeline</Title>

                    <p>teste</p>
              </TimelineBody>
              <Trending />
            </TimelineBox>
          </TimelineContainer>
        </>
    );
}

const TimelineContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #333333;
  padding-top: 100px;
  display: flex;
  justify-content: center;

  @media (max-width: 635px) {
    padding-top: 100px;
  }
`;

const TimelineBox = styled.div`
  display: flex;
  padding-bottom: 30px;
  margin: 0 auto;

  @media (max-width: 635px) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  color: #ffffff;
  margin-bottom: 50px;

  @media (max-width: 635px) {
    font-size: 33px;
    margin-left: 17px;
    margin-bottom: 30px;
  }
`;

const TimelineBody = styled.div`
  width: 611px;
  margin: 0 auto;

  @media (max-width: 635px) {
    width: 100%;
  }
`;