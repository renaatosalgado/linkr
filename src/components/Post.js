import styled from "styled-components";
import LinkPreview from "./LinkPreview";
import { FaTrash } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { BiRepost } from "react-icons/bi";
import UserContext from "../contexts/UserContext";
import { useContext, useRef, useState } from "react";
import {
  deleteDeletePost,
  putEditPost,
  postLikeDislike,
  postRepost,
} from "../services/API";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const PostContainer = styled.div`
  position: relative;
  width: 610px;
  padding-bottom: ${(props) => (props.isReposted ? "0" : "16px")};
  background-color: #171717;
  border-radius: 16px;
  margin-top: ${(props) => (props.isReposted ? "0" : "38px")};
  display: flex;

  @media (max-width: 635px) {
    width: 100%;
    border-radius: 0;
    //margin-top: 16px;
  }
`;

const LeftContainer = styled.div`
  padding: 17px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .__react_component_tooltip.show {
    font-size: 13px;
    color: #505050;
    font-family: "Lato", sans-serif;
    opacity: 0.9;
    background-color: white;
    max-width: 300px;
    padding: 6px;
    overflow-wrap: break-word;

    @media (max-width: 635px) {
      max-width: 60px;
      text-align: center;
    }
  }

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

  @media (max-width: 635px) {
    top: 10px;
    right: 10px;
  }
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
  max-width: 455px;
  word-break: break-word;

  @media (max-width: 635px) {
    font-size: 17px;
    max-width: 57vw;
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

  &:hover {
    cursor: pointer;
  }

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

const DeleteOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  display: ${(props) => (props.reallyDeletePost ? "inherit" : "none")};
`;

const RepostOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  display: ${(props) => (props.reallyRepost ? "inherit" : "none")};
`;

const OverlayScreen = styled.div`
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

  @media (max-width: 635px) {
    width: 100%;
    left: 0;
    border-radius: 0;
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
    filter: brightness(90%);
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
    filter: brightness(90%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EditingInput = styled.input`
  width: 100%;
  border-radius: 7px;
  font-size: 17px;
  color: #4c4c4c;
  line-height: 17px;
  margin-bottom: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 9px;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.75;
    background-color: #ffffff;
    cursor: not-allowed;
  }
`;

const RepostIcon = styled.div`
  color: #ffffff;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  font-family: "Lato";
  line-height: 13px;
  text-align: center;

  &:hover {
    cursor: pointer;
    color: #1877f2;
  }

  @media (max-width: 635px) {
    font-size: 9px;
    line-height: 11px;
  }
`;

const RepostContainer = styled.div`
  width: 610px;
  height: 53px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #1e1e1e;
  position: relative;
  top: 53px;
  display: ${(props) => (props.isReposted ? "inherit" : "none")};

  @media (max-width: 635px) {
    width: 100%;
  }
`;

const RepostHeader = styled.div`
  color: #ffffff;
  font-family: "Lato";
  font-size: 11px;
  line-height: 13.2px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding-top: 8px;

  p {
    margin-left: 6px;
    word-break: break-all;
    font-weight: bold;
  }

  @media (max-width: 635px) {
    padding-top: 8px;
  }
`;

const TextWithClickableHashTags = ({ renderHashtag, text }) => {
  let splittedText = text.split("#");
  splittedText = splittedText.map((string, index) => {
    return index > 0 ? `#${string}` : string;
  });

  const mapHashTagToLink = (string, index) => {
    if (string === "" || index === 0) return <>{string}</>;
    const firstSpaceIndex = string.indexOf(" ");
    if (firstSpaceIndex >= 0) {
      let hastagText = string.slice(0, firstSpaceIndex);
      return (
        <>
          <Link key={index} to={`/hashtag/${hastagText.slice(1)}`}>
            {hastagText.toLowerCase()}
          </Link>
          {string.slice(firstSpaceIndex)}
        </>
      );
    } else {
      return (
        <Link key={index} to={`/hashtag/${string.slice(1)}`}>
          {string}
        </Link>
      );
    }
  };

  return (
    <PostDescription>{splittedText.map(mapHashTagToLink)}</PostDescription>
  );
};

const Post = ({ post, postRender, id }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(post.text);
  const [newText, setNewtext] = useState(post.text);
  const { user } = useContext(UserContext);
  const [reallyDeletePost, setReallyDeletePost] = useState(false);
  const [reallyRepost, setReallyRepost] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const inputRef = useRef();

  function analyseKeys(event) {
    if (event.keyCode === 27) {
      editPost();
    } else if (event.keyCode === 13) {
      setLoading(true);
      const body = {
        text: newText,
      };
      putEditPost(post.id, body, config)
        .then((res) => {
          setText(res.data.post.text);
          setEditing(false);
          setLoading(false);
        })
        .catch(() => {
          alert(
            "It was not possible to save your changes. Please, repeat the procedure."
          );
          setEditing(true);
          setLoading(false);
        });
    }
  }

  function editPost() {
    if (editing) {
      setEditing(false);
      setNewtext(text);
    } else {
      setEditing(true);
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }

  function deletePost(postId) {
    setLoading(true);

    deleteDeletePost(postId, config)
      .then(() => {
        setLoading(false);
        setReallyDeletePost(false);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        setTimeout(() => {
          alert(
            "It was not possible to delete you post! Please, repeat the procedure."
          );
        }, 500);
        setReallyDeletePost(false);
      });
  }

  const [likesState, setLikesState] = useState(
    post.likes.map((like) => {
      return {
        userId: like.userId,
        username: like["user.username"],
      };
    })
  );

  const isLiked =
    false !== likesState.map((like) => like.userId).includes(user.user.id);

  function like() {
    if (id === 1) {
      postLikeDislike("dislike", post.id, config)
        .then((resp) => {
          setLikesState(resp.data.post.likes);
          postRender();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (isLiked) {
      postLikeDislike("dislike", post.id, config)
        .then((resp) => {
          setLikesState(resp.data.post.likes);
          postRender();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      postLikeDislike("like", post.id, config)
        .then((resp) => {
          setLikesState(resp.data.post.likes);
          postRender();
        })
        .catch((err) => {
          console.log("erro!");
        });
    }
  }

  function createTooltip() {
    let tooltip = "";
    const likesIdsList = likesState.map((like) => like.userId);
    const isLikedOnServer = likesIdsList.includes(user.user.id);
    if (isLikedOnServer) {
      const indexOfUser = likesIdsList.indexOf(user.user.id);
      const OtherUsers = likesState
        .map((like, i) => (i === indexOfUser ? null : like.username))
        .filter((username) => !!username);
      tooltip += `Você`;
      if (likesState.length === 2) {
        tooltip += ` e ${OtherUsers[0]}`;
      }
      if (likesState.length > 2) {
        tooltip += `, ${likesState[1].username}`;
      }
    } else {
      if (likesState.length > 0) {
        tooltip += ` ${likesState[0].username}`;
      }
      if (likesState.length === 2) {
        tooltip += ` e ${likesState[1].username}`;
      }
      if (likesState.length > 2) {
        tooltip += `, ${likesState[1].username}`;
      }
    }
    if (likesState.length === 3) {
      tooltip += ` e outra pessoa`;
    }
    if (likesState.length > 3) {
      tooltip += ` e outras ${likesState.length - 2} pessoas`;
    }
    return tooltip;
  }

  function sharePost(postId) {
    postRepost(postId, config).then((res) => {
      console.log(res.data.post.repostedBy.username);
      window.location.reload();
    });
  }

  return (
    <>
      <DeleteOverlay reallyDeletePost={reallyDeletePost}>
        <OverlayScreen>
          <p>
            Are you sure about <br /> deleting this post?
          </p>
          <OverlayButtons>
            <CancelBtn
              disabled={loading ? true : false}
              onClick={() => {
                setReallyDeletePost(false);
              }}
            >
              No, cancel
            </CancelBtn>
            <ConfirmBtn
              disabled={loading ? true : false}
              onClick={() => {
                deletePost(post.id);
                setReallyDeletePost(false);
              }}
            >
              {loading ? "Deleting..." : "Yes, delete!"}
            </ConfirmBtn>
          </OverlayButtons>
        </OverlayScreen>
      </DeleteOverlay>
      <RepostOverlay reallyRepost={reallyRepost}>
        <OverlayScreen>
          <p>
            Do you want to re-post <br /> this link?
          </p>
          <OverlayButtons>
            <CancelBtn
              disabled={loading ? true : false}
              onClick={() => setReallyRepost(false)}
            >
              No, cancel
            </CancelBtn>
            <ConfirmBtn
              disabled={loading ? true : false}
              onClick={() => {
                sharePost(post.id);
                setReallyRepost(false);
              }}
            >
              {loading ? "Sharing..." : "Yes, share!"}
            </ConfirmBtn>
          </OverlayButtons>
        </OverlayScreen>
      </RepostOverlay>

      <RepostContainer isReposted={post.repostedBy ? true : false}>
        <RepostHeader>
          <BiRepost size="25px" />
          <p>{`Re-posted by ${
            post.repostedBy
              ? post.repostedBy.username === user.user.username
                ? "you"
                : post.repostedBy.username
              : ""
          }`}</p>
        </RepostHeader>
      </RepostContainer>

      <PostContainer>
        <Icons hide={post.user.id === user.user.id ? false : true}>
          <EditIcon onClick={editPost}>
            <RiPencilFill />
          </EditIcon>
          <DeleteIcon onClick={() => setReallyDeletePost(true)}>
            <FaTrash />
          </DeleteIcon>
        </Icons>

        <LeftContainer>
          <Avatar src={post.user.avatar} userId={post.user.id} />
          <LikeIcon onClick={like}>
            {id === 1 ? (
              <IoIosHeart size="20px" color="#AC0000" />
            ) : isLiked ? (
              <IoIosHeart size="20px" color="#AC0000" />
            ) : (
              <IoIosHeartEmpty size="20px" color="#FFF" />
            )}
          </LikeIcon>
          <HowManyLikes data-tip={createTooltip()}>
            {post.likes.length === 0
              ? ""
              : post.likes.length === 1
              ? `${post.likes.length} like`
              : `${post.likes.length} likes`}
          </HowManyLikes>
          <ReactTooltip
            place="bottom"
            type="light"
            effect="float"
          ></ReactTooltip>
          <RepostIcon onClick={() => setReallyRepost(true)}>
            <BiRepost size="25px" />
            {post.repostCount === 0
              ? "re-post"
              : post.repostCount === 1
              ? `${post.repostCount} re-post`
              : `${post.repostCount} re-posts`}
          </RepostIcon>
        </LeftContainer>
        <RightContainer>
          <Link to={`/user/${post.user.id}`}>
            <UserName>{post.user.username}</UserName>
          </Link>
          {editing ? (
            <EditingInput
              ref={inputRef}
              disabled={loading ? true : false}
              onKeyDown={analyseKeys}
              type="text"
              value={newText}
              onChange={(e) => setNewtext(e.target.value)}
            ></EditingInput>
          ) : (
            <TextWithClickableHashTags text={post.text} key={post.id} />
          )}
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
