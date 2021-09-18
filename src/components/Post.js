import styled from "styled-components";
import LinkPreview from "./LinkPreview";
import { FaTrash } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { deleteDeletePost, getPostsList } from "../services/API";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const PostContainer = styled.div`
  position: relative;
  width: 610px;
  padding-bottom: 20px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 29px;
  display: flex;
  @media (max-width: 635px) {
    width: 100%;
    border-radius: 0;
    margin-top: 16px;
  }
`;

const LeftContainer = styled.div`
  padding: 17px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 635px) {
    padding: 9px 15px;
  }
`;

const RightContainer = styled.div`
  padding-top: 19px;
  padding-right: 21px;
  width: calc(100% - 86px);
  display: flex;
  flex-direction: column;

  @media (max-width: 635px) {
    padding-top: 10px;
    padding-right: 18px;
    width: 306px;
  }
`;

// TODO: Colocar Icons na styled components
const Icons = styled.div`
  position: absolute;
  display: flex;
  top: 23px;
  right: 22px;
  display: ${(props) => (props.hide ? "none" : "inherit")};
`;

const EditIcon = styled.div`
  width: 14px;
  height: 14px;
  color: #ffffff;
  margin-right: 15px;

  &:hover {
    cursor: pointer;
    color: green;
  }
`;

const DeleteIcon = styled.div`
  width: 16px;
  height: 16px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
    color: crimson;
  }
`;

const UserName = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  color: #ffffff;
  padding-bottom: 7px;

  @media (max-width: 635px) {
    font-size: 17px;
  }
`;

const PostDescription = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  color: #b7b7b7;
  padding-bottom: 7px;
  word-break: break-word;

  @media (max-width: 635px) {
    font-size: 15px;
  }
`;

const LikeIcon = styled.div`
  color: #ffffff;

  @media (max-width: 635px) {
    width: 15px;
    height: 17px;
  }
`;

const HowManyLikes = styled.p`
  margin-top: 5px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  color: #ffffff;

  @media (max-width: 635px) {
    font-size: 9px;
  }
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  display: ${(props) => (props.reallyDeleteHabit ? "inherit" : "none")};
`;

const DeleteScreen = styled.div`
  position: relative;
  top: calc((100vh - 262px) / 2);
  left: calc((100vw - 597px) / 2);
  width: 597px;
  height: 262px;
  border-radius: 50px;
  background-color: #333333;
  font-family: "Lato", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
    font-weight: bold;
    font-size: 34px;
    color: #ffffff;
    margin-bottom: 40px;
  }
`;

const OverlayButtons = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const CancelBtn = styled.button`
  background-color: #ffffff;
  color: #1877f2;
  line-height: 22px;
  width: 134px;
  height: 37px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 27px;

  &:hover {
    cursor: pointer;
    border: 5px solid #1877f2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmBtn = styled.button`
  background-color: #1877f2;
  color: #ffffff;
  line-height: 22px;
  width: 134px;
  height: 37px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    border: 5px solid crimson;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Post = ({ post, setPostsList }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [liked] = useState(false);

  const [reallyDeleteHabit, setReallyDeleteHabit] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  function deletePost(postId) {
    setLoading(true);

    deleteDeletePost(postId, config)
      .then(() => {
        setLoading(false);
        getPostsList(config).then((res) => setPostsList(res.data.posts));
        setReallyDeleteHabit(false);
      })
      .catch(() => {
        setLoading(false);
        setTimeout(() => {
          alert(
            "Não foi possível excluir seu post! Por favor, repita o procedimento."
          );
        }, 500)
        setReallyDeleteHabit(false);
      });
  }

  return (
    <>
      <Overlay reallyDeleteHabit={reallyDeleteHabit}>
        <DeleteScreen>
          <p>
            Tem certeza que deseja <br /> excluir essa publicação?
          </p>
          <OverlayButtons>
            <CancelBtn
              disabled={loading ? true : false}
              onClick={() => setReallyDeleteHabit(false)}
            >
              Não, voltar
            </CancelBtn>
            <ConfirmBtn
              disabled={loading ? true : false}
              onClick={() => deletePost(post.id)}
            >
              {loading ? "Excluindo..." : "Sim, excluir"}
            </ConfirmBtn>
          </OverlayButtons>
        </DeleteScreen>
      </Overlay>
      <PostContainer>
        <Icons hide={post.user.id === user.user.id ? false : true}>
          <EditIcon>
            <RiPencilFill />
          </EditIcon>
          <DeleteIcon onClick={() => setReallyDeleteHabit(true)}>
            <FaTrash />
          </DeleteIcon>
        </Icons>
        <LeftContainer>
          <Avatar src={post.user.avatar} userId={post.user.id}/>
          <LikeIcon >
            {liked === false ? <IoIosHeartEmpty size="20px" color="#FFF" /> : <IoIosHeart size="20px" color="#AC0000" />}
          </LikeIcon>
          <HowManyLikes data-tip data-for='likes'>{post.likes.length === 1 ?
            `${post.likes.length} like` :
            `${post.likes.length} likes`}
          </HowManyLikes>
        </LeftContainer>
        <RightContainer>
          <Link to={`/user/${post.user.id}`}>
            <UserName>{post.user.username}</UserName>
          </Link>
          <PostDescription>{post.text}</PostDescription>
          <LinkPreview
            link={post.link}
            linkTitle={post.linkTitle}
            linkDescription={post.linkDescription}
            linkImage={post.linkImage}
          />
        </RightContainer>
      </PostContainer>
    </>
  );
};

export default Post;
