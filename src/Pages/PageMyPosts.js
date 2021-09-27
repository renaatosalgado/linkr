import styled from "styled-components";
import Header from "../components/Header";
import { getPostsSomeUser } from "../services/API";
import React, { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../contexts/UserContext";
import Trending from "../components/Trending";
import Posts from "../components/Posts";
import Swal from "sweetalert2";

export default function PageTimeline() {
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [myPosts, setMyPosts] = useState([]);
  const [scrollRadio, setScrollRadio] = useState (null);
  const scrollObserve = useRef();

  const { user } = useContext(UserContext);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    getPostsSomeUser(user.user.id, config)
      .then((res) => {
        setMyPosts(res.data.posts);
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
  }, [myPosts]);

  const intersectionObserve = new IntersectionObserver( (entries) => {
    const radio = entries[0].intersectionRatio;
    setScrollRadio(radio)
  } );

  useEffect( () => {
    intersectionObserve.observe(scrollObserve.current);

    return () => {
      intersectionObserve.disconnect();
    }
  }, []);

  const lastId = () => {
    const lastItem = myPosts[myPosts.length - 1];
    if (lastItem) {
      if (!!lastItem.respostId) {
        return lastItem.respostId
      }
      return lastItem.id
    }
  };

  useEffect( () => {
    if (scrollRadio > 0 ) {
      console.log('ue, entrei nesse useEffect' + scrollRadio);
      getPostsSomeUser(user.user.id, config, lastId())
      .then((res) => {
        let newPost = [...myPosts]
        newPost.push(...res.data.posts)
        setMyPosts(newPost);
        console.log(newPost)
        setIsLoadingPosts(false);
        console.log(res);
      });
    }  
    
  },[scrollRadio]);

  return (
    <>
      <Header />
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <Title>my posts</Title>
            <Posts
              postsList={myPosts}
              isLoadingPosts={isLoadingPosts}
              setPostsList={setMyPosts}
            />
            <div ref={scrollObserve}></div>
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
