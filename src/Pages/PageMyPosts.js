import styled from "styled-components";
import Header from "../components/Header";
import { getPostsSomeUser } from "../services/API";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import Trending from "../components/Trending";
import Posts from "../components/Posts";
import Swal from "sweetalert2";

export default function PageTimeline() {
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postsList, setPostsList] = useState([]);

  const { user } = useContext(UserContext);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    getPostsSomeUser(user.user.id, config)
      .then((res) => {
        setPostsList(res.data.posts);
        setIsLoadingPosts(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "OOPS...",
          text: "Houve uma falha ao obter os posts, por favor atualize a página",
        });
      });
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <Title>my posts</Title>
            <Posts
              postsList={postsList}
              isLoadingPosts={isLoadingPosts}
              setPostsList={setPostsList}
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
  padding-top: 125px;
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
