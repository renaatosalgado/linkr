import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { getComments, postComment, getUsersThatIFollow } from "../services/API";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function CommentsComponent({post, commentState, commentsList, setCommentsList }) {
    
    const [text, setText] = useState("");
    const [following, setFollowing] = useState([]);

    const {
        user
    } = useContext(UserContext);

    const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

    function listComments() {
        getComments(post.id, config).then((resp) => {
            setCommentsList(resp.data);
        })
        .catch((err) => console.log(err))
    }

    useEffect(listComments, [])

    useEffect(() => {
        getUsersThatIFollow(config).then((resp) => {
            setFollowing(resp.data)
        })
        .catch((err) => console.log(err))
    }, [])


    function SendComment(event) {
        event.preventDefault()
        const body = {
            text
        }
        postComment(post.id, body, config).then((resp) => {
            console.log(resp);
            setText("")
            listComments();
        })
        .catch((err) => {
            console.log(err)
        })
    }


     
    const idsFollowing = following.users ? following.users.map((e) => e.username) : "";    
    
    return (
        <>
            <CommentsBox commentState={commentState}>
                <BoxScroller>
                    {commentsList.comments ? commentsList.comments.map((comment) => (
                    <Comment key={comment.id}>
                        <Link to={`/user/${comment.user.id}`}>
                            <img src={comment.user.avatar} alt="foto do usuário"/>
                        </Link>
                        <div>
                            <h4>
                                <Link to={`/user/${comment.user.id}`}>
                                    {comment.user.username}
                                </Link>
                                <span>
                                    { comment.user.id === post.user.id ?
                                        " • post’s author" :
                                        idsFollowing.includes(comment.user.username) ? 
                                        " • following" 
                                        : "" }
                                </span>
                            </h4>
                            <p>{comment.text}</p>
                        </div>
                    </Comment>    
                    )) : ""} 
                </BoxScroller>    
                <BoxWriteComment onSubmit={SendComment}>
                    <img src={user.user.avatar} alt="foto do usuário" />
                    <input 
                        type="text" 
                        placeholder="write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <ButtonSendComment type="submit">
                        <IconSendComment/>
                    </ButtonSendComment>
                </BoxWriteComment>
            </CommentsBox>
        </>
    );
}




const CommentsBox = styled.div`
    display: ${({commentState}) => commentState ? "inherit" : "none"};
    width: 570px;
    margin: 0 auto;
    @media (max-width: 635px) {
        width: 85vw;
    }
`;

const BoxScroller = styled.div`
    max-height: 200px;   
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        background: #1E1E1E; 
    }    
    &:hover {
        ::-webkit-scrollbar-thumb {
            background: #575757; 
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #1877f2; 
        }
    }
    
    @media (max-width: 635px) {
        width: 85vw;
    }
`;

const Comment = styled.div`
    border-bottom: 1px solid #353535;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    line-height: 17px;
    padding: 15px 0 15px 0;
    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
    h4 {
        color: #F3F3F3;
        font-weight: bold;
        max-width: 510px;
        word-break: break-word;
        cursor: pointer;
    }
    span {
        color: #565656;

    }
    p {
        color: #ACACAC;
        max-width: 510px;
        word-break: break-word;


    }
    div {
        margin-left: 15px;
        @media (max-width: 635px) {
            width: 85vw;
        }
    }

    @media (max-width: 635px) {
        width: 85vw;
    }
`;

const BoxWriteComment = styled.form`
    height: 83px;
    width: 570px;
    position: relative;
    display: flex;
    align-items: center;
    input {
        width: 510px;
        padding: 0 40px 0 11px;
        height: 39px;
        background-color: #252525;
        border-radius: 8px;
        color: #ACACAC;
        @media (max-width: 635px) {
        width: 90%;
        }
    }
    input::placeholder {
        color: #575757;
        padding-left: 10px;
    }
    input:focus {
        outline: 0;
    }
    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 18px;
    }
    @media (max-width: 635px) {
        width: 85vw;
    }
`;

const ButtonSendComment = styled.button`
    background-color: Transparent;
    position: absolute;
    top: 32px;
    right: 15px;
`;

const IconSendComment = styled(IoPaperPlaneOutline)`
    color: #F3F3F3;
    width: 18px;
    height: 18px;
    &:hover {
    cursor: pointer;
    color: #1877f2;
  }   
`;