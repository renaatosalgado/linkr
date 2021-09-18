import styled from "styled-components";
import Post from "./Post";
import NoPostFound from "../styled-components/NoPostsFound";
import Loader from "react-loader-spinner";

const CenteredContainer = styled.div`
  min-width: 610px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 635px) {
    min-width: 100%;
  }
`;

const CenteredLoader = () => {
  return (
    <CenteredContainer>
      <Loader type="ThreeDots" color="#ffffff" height={100} width={100} />
    </CenteredContainer>
  );
};
const Posts = ({ postsList, isLoadingPosts, setPostsList }) => {
  return isLoadingPosts ? (
    <CenteredLoader />
  ) : postsList.length === 0 ? (
    <NoPostFound>Nenhum post encontrado</NoPostFound>
  ) : (
    postsList.map((post, index) => (
      <Post
        key={index}
        post={post}
        setPostsList={setPostsList}
      />
    ))
  );
};

export default Posts;
