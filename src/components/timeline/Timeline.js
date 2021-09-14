import styled from "styled-components";
import Header from "../header/Header";

export default function Posts() {
  return (
    <>
      <Header></Header>
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <Title>timeline</Title>
            <CreatePost></CreatePost>
            <Post></Post>
            <Post></Post>
            <Post></Post>
          </TimelineBody>
          <TrendingContainer>
            <TrendingTitle>trending</TrendingTitle>
            <Hashtags>
              <p># {"javascript"}</p>
              <p># {"react"}</p>
              <p># {"react-native"}</p>
              <p># {"material"}</p>
              <p># {"web-dev"}</p>
              <p># {"mobile"}</p>
              <p># {"css"}</p>
              <p># {"html"}</p>
              <p># {"node"}</p>
              <p># {"sql"}</p>
            </Hashtags>
          </TrendingContainer>
        </TimelineBox>
      </TimelineContainer>
    </>
  );
}

const TimelineContainer = styled.div`
  height: 100%;
  background-color: #333333;
  padding-top: 125px;
  display: flex;
  justify-content: center;
`;

const TimelineBox = styled.div`
  display: flex;
  padding-bottom: 30px;
`;

const Title = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  color: #ffffff;
  margin-bottom: 43px;
`;

const TimelineBody = styled.div`
  width: 611px;
  margin: 0 auto;
`;

const CreatePost = styled.div`
  width: 611px;
  height: 209px;
  background-color: #ffffff;
  border-radius: 16px;
`;

const Post = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 29px;
`;

const TrendingContainer = styled.div`
  min-width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 86px;
  margin-left: 25px;
`;

const TrendingTitle = styled.div`
  font-family: "Oswald", sans-serif;
  color: #ffffff;
  font-weight: bold;
  font-size: 27px;
  border-bottom: 1px solid #484848;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-top: 12px;
`;

const Hashtags = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: #ffffff;
  line-height: 23px;
  padding: 16px 16px 30px 16px;
`;
