import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { getPostsLiked } from "../services/API";
import Trending from "../components/Trending";
import Posts from "../components/Posts";

export default function PageMyLikes() {
  const { user } = useContext(UserContext);

  const [postsLikedList, setPostsLikedList] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
 

  

  function postRender() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    getPostsLiked(config)
      .then((res) => {
        setPostsLikedList(res.data.posts);
        setIsLoadingPosts(false);
      })
      .catch(() => {
        console.log("erro!");
      });
  }

  useEffect(() => {
    if (user) {
      postRender()
    }
    //eslint-disable-next-line
  }, [user])
 
  return (
    <>
      <Header></Header>
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <Title>my likes</Title>
            <Posts
              postsList={postsLikedList}
              isLoadingPosts={isLoadingPosts}
              setPostsList={setPostsLikedList}
              apiRequest={getPostsLiked}
              postRender={postRender}
              id={1}
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
