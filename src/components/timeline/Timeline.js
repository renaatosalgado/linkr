import styled from "styled-components";
import Header from "../header/Header";
import Trending from "../trending/Trending";

export default function Posts() {
  return (
    <>
      <Header></Header>
      <TimelineContainer>
        <TimelineBody>
          <Title>timeline</Title>
          <CreatePost></CreatePost>
          <Post></Post>
          <Post></Post>
          <Post></Post>
        </TimelineBody>
        <Trending />
      </TimelineContainer>
    </>
  );
}

const TimelineContainer = styled.div`
  width: 100%;
  min-height: 100vw;
  background-color: #333333;
  padding-top: 125px;
  display: flex;
`;

const Title = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  color: #ffffff;
  margin-bottom: 43px;
`;

const TimelineBody = styled.div`
  width: calc(611px + 25px + 301px);
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
  background-color: #151515;
  border-radius: 16px;
  margin-top: 29px;
`;
