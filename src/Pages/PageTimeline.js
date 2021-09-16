import styled from "styled-components";
import Header from "../components/Header";
import { postCreatePost, getPostsList } from "../services/API";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

import NewPost from "../components/Post";

export default function PageTimeline() {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [postsList, setPostsList] = useState([]);

  const { user } = useContext(UserContext);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    getPostsList(config)
      .then((res) => {
        setPostsList(res.data.posts);
      })
      .catch(() => {
        alert("Houve um erro ao publicar seu link. Repita o procedimento.");
      });
    //eslint-disable-next-line
  }, []);

  function publishPost(event) {
    event.preventDefault();
    setLoading(true);

    const body = {
      text,
      link,
    };

    postCreatePost(body, config)
      .then(() => {
        setLoading(false);
        setText("");
        setLink("");
        getPostsList(config).then((res) => {
          setPostsList(res.data.posts);
        });
      })
      .catch(() => {
        alert("Houve um erro ao publicar seu link. Repita o procedimento.");
        setLoading(false);
      });
  }
 
  return (
    <>
      <Header />
      
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <Title>timeline</Title>
            <CreatePost>
              <CreatePostImg>
                <ProfilePic src={user.user.avatar} alt="" />
              </CreatePostImg>
              <Form onSubmit={publishPost}>
                <p>O que você tem pra favoritar hoje?</p>
                <Link
                  type="url"
                  placeholder="http://"
                  value={link}
                  disabled={loading ? true : false}
                  required
                  onChange={(e) => setLink(e.target.value)}
                ></Link>
                <Description
                  type="text"
                  disabled={loading ? true : false}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Muito irado esse link falando de
                  #javascript"
                ></Description>
                <Buttons>
                  <Publish type={"submit"} disabled={loading ? true : false}>
                    {loading ? "Publicando..." : "Publicar"}
                  </Publish>
                </Buttons>
              </Form>
            </CreatePost>
            {postsList.map((post, index) => (
              <NewPost
                key={index}
                post={post}
                setPostsList={setPostsList}
              />
            ))}
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

const CreatePost = styled.div`
  width: 611px;
  height: 209px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  justify-content: center;

  @media (max-width: 635px) {
    width: 100%;
    height: 164px;
    border-radius: 0;
  }
`;

const CreatePostImg = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 16px;

  @media (max-width: 635px) {
    display: none;
  }
`;

const Form = styled.form`
  font-family: "Lato", sans-serif;
  display: flex;
  flex-direction: column;
  font-weight: 300;
  margin-top: 16px;

  p {
    color: #707070;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (max-width: 635px) {
    width: calc(100% - 30px);
    margin-top: 10px;

    p {
      text-align: center;
      font-size: 17px;
      margin-bottom: 7px;
      line-height: 20px;
    }
  }
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin-right: 18px;
`;

const Link = styled.input`
  background-color: #efefef;
  width: 503px;
  height: 30px;
  border-radius: 5px;
  margin-bottom: 5px;
  line-height: 18px;
  padding-left: 12px;

  &::placeholder {
    color: #949494;
    font-size: 15px;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (max-width: 635px) {
    width: 100%;
  }
`;

const Description = styled.textarea`
  border-radius: 5px;
  background-color: #efefef;
  height: 66px;
  width: 503px;
  line-height: 18px;
  margin-bottom: 5px;
  padding-top: 8px;
  padding-left: 12px;
  resize: none;
  outline: none;
  border: none;

  &::placeholder {
    color: #949494;
    font-size: 15px;
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (max-width: 635px) {
    width: 100%;
    height: 47px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Publish = styled.button`
  background-color: #1877f2;
  width: 112px;
  height: 31px;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    filter: brightness(108%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 635px) {
    height: 22px;
  }
`;

const TrendingContainer = styled.div`
  min-width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 86px;
  margin-left: 25px;

  @media (max-width: 950px) {
    display: none;
  }
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