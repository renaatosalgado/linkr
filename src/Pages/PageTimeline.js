import styled from "styled-components";
import Header from "../components/Header";
import { postCreatePost, getPostsList } from "../services/API";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import Trending from "../components/Trending";
import Posts from "../components/Posts";
import Swal from "sweetalert2";

export default function PageTimeline() {
  const [loading, setLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
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
        setIsLoadingPosts(false)
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "OOPS...",
          text: "Houve uma falha ao obter os posts, por favor atualize a página",
        })});
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