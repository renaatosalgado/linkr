import styled from 'styled-components'

import LinkPreview from './LinkPreview';
import { FaTrash, FaRegHeart } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";


const PostContainer = styled.div`
    position: relative;
  width: 611px;
  height: 276px;
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

const RightContainer = styled.div`
    padding-top: 19px;
    padding-right: 21px;
    width: calc(100% - 86px);
    display: flex;
    flex-direction: column;
    
`

const PerfilPicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-bottom: 19px;
`

const Likes = styled.div`

`

// TODO: Colocar Icons na styled components
const Icons = styled.div`
  position: absolute;
  display: flex;
  top: 23px;
  right: 22px;
  display: ${(props) => (props.hide ? "inherit" : "none")};
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

const NewPost = ({ post, hide }) => {
    return (
        <PostContainer>
            <Icons hide={hide}>
                <EditIcon>
                    <RiPencilFill />
                </EditIcon>
                <DeleteIcon>
                    <FaTrash />
                </DeleteIcon>
            </Icons>
            <LeftContainer>
                <PerfilPicture src={post.user.avatar}/>
                <LikeIcon>
                    <FaRegHeart />
                </LikeIcon>
                <HowManyLikes>{post.likes.length} likes</HowManyLikes>
            </LeftContainer>
            <RightContainer>
                <UserName>{post.user.username}</UserName>
                <PostDescription>
                    {post.text}
                </PostDescription>
                <LinkPreview />
            </RightContainer>
        </PostContainer>
    )
}

export default NewPost