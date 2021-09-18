import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { getPostsLiked } from "../services/API";
import { IoIosHeart } from "react-icons/io";
import { Icons } from "../styled-components/Reset";
import { EditIcon } from "../styled-components/Reset";
import { DeleteIcon } from "../styled-components/Reset";
import { FaTrash } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import LinkPreview from "../components/LinkPreview";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import Trending from "../components/Trending";


export default function PageMyLikes() {
    const {
        user
    } = useContext(UserContext);

    const [postsLikedList, setPostsLikedList] = useState([]);
    const [liked, setLiked] = useState(false)

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`,
        }
    };

    useEffect(() => {
        getPostsLiked(config)
            .then((res) => {
                setPostsLikedList(res.data.posts);
            })
            .catch(() => {
                console.log("erro!");
            });
    }, [])

    return (
        <>
            <Header></Header>
            <TimelineContainer>
                <TimelineBox>
                    <TimelineBody>
                        <Title>My likes</Title>
                        {postsLikedList.map((post, index) => (
                            <PostContainer>
                                <Icons hide={post.user.id === user.user.id ? false : true}>
                                    <EditIcon>
                                        <RiPencilFill />
                                    </EditIcon>
                                    <DeleteIcon>
                                        <FaTrash />
                                    </DeleteIcon>
                                </Icons>
                                <LeftContainer>
                                    <Link to={`/user/${post.user.id}`}>
                                        <PerfilPicture src={post.user.avatar} />
                                    </Link>
                                    <LikeIcon >
                                        {liked === false ? <IoIosHeartEmpty size="20px" color="#FFF" /> : <IoIosHeart size="20px" color="#AC0000" />}
                                    </LikeIcon>
                                    <HowManyLikes> {post.likes.length === 1 ?
                                        `${post.likes.length} like` :
                                        `${post.likes.length} likes`}
                                    </HowManyLikes>
                                </LeftContainer>
                                <RightContainer>
                                    <Link to={`/user/${post.user.id}`}>
                                        <UserName>{post.user.username}</UserName>
                                    </Link>
                                    <PostDescription>
                                        {post.text}
                                    </PostDescription>
                                    <LinkPreview
                                        link={post.link}
                                        linkTitle={post.linkTitle}
                                        linkDescription={post.linkDescription}
                                        linkImage={post.linkImage}
                                    />
                                </RightContainer>
                            </PostContainer>
                        ))}
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

const PostContainer = styled.div`
  position: relative;
  width: 611px;
  padding-bottom: 20px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 29px;
  display: flex;
`
const LeftContainer = styled.div`
    top: 17px;
    padding: 17px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
`


const PerfilPicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-bottom: 19px;
`
const LikeIcon = styled.div`

`

const HowManyLikes = styled.p`
    margin-top: 5px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    color: #FFFFFF;
`
const RightContainer = styled.div`
    padding-top: 19px;
    padding-right: 21px;
    width: calc(100% - 86px);
    display: flex;
    flex-direction: column;
    
`

const UserName = styled.p`
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    color: #FFFFFF;
    padding-bottom: 7px;
`

const PostDescription = styled.p`
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    color: #B7B7B7;
    padding-bottom: 7px;
`