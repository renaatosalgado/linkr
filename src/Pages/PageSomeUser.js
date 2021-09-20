import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { getPostsSomeUser } from "../services/API";
import { useParams } from "react-router-dom";
import Trending from "../components/Trending";
import Posts from "../components/Posts";

export default function PageSomeUser() {
  const [postsSomeUser, setPostsSomeUser] = useState(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const { id } = useParams();

  const { user } = useContext(UserContext);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    getPostsSomeUser(id, config)
      .then((res) => {
        setPostsSomeUser(res.data.posts);
        setIsLoadingPosts(false);
      })
      .catch((res) => {
        console.log("erro!");
      });
  }, [postsSomeUser]);

  return (
    <>
      <Header></Header>
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <Title>
              {postsSomeUser ? `${postsSomeUser[0].user.username}'s posts` : ""}
            </Title>

            <Posts
              postsList={postsSomeUser}
              isLoadingPosts={isLoadingPosts}
              setPostsList={setPostsSomeUser}
            />
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
  padding-top: 150px;
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
  margin-bottom: 43px;
  max-width: 595px;
  word-break: break-word;

  @media (max-width: 635px) {
    font-size: 33px;
    margin-left: 17px;
    max-width: 95.5vw;
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
