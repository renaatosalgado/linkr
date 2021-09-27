import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { getPostsSomeUser, getUserInformation } from "../services/API";
import { useParams } from "react-router-dom";
import Trending from "../components/Trending";
import Posts from "../components/Posts";
import FollowButton from "../components/FollowButton";

export default function PageSomeUser() {
  const [postsSomeUser, setPostsSomeUser] = useState(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const { id } = useParams();

  const [thisUserInfo, setThisUserInfo] = useState({
    id: id,
    username: "",
    avatar: "",
  });

  const { user } = useContext(UserContext);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    getUserInformation(id, config)
      .then((res) => {
        setThisUserInfo({
          id: id,
          username: res.data.user.username,
          avatar: res.data.user.avatar,
        });
      })
      .catch();
    getPostsSomeUser(id, config)
      .then((res) => {
        setPostsSomeUser(res.data.posts);
        setIsLoadingPosts(false);
      })
      .catch((res) => {
        console.log("erro!");
      });
    //eslint-disable-next-line
  }, [postsSomeUser]);

  return (
    <>
      <Header></Header>
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <TitleContainer>
              <CircleImg src={thisUserInfo.avatar} />
              <Title>{`${thisUserInfo.username}'s posts`}</Title>
            </TitleContainer>

            <Posts
              postsList={postsSomeUser}
              isLoadingPosts={isLoadingPosts}
              setPostsList={setPostsSomeUser}
            />
          </TimelineBody>
          <Trending />
          <FollowButton shouldDisplay={user.user.id !== Number(id)} />
        </TimelineBox>
      </TimelineContainer>
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 35px;
`;

const CircleImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

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
