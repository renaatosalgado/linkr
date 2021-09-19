import styled from "styled-components";
import Header from "../components/Header";
import Trending from "../components/Trending";
import { useParams } from "react-router";
import { getHashtagPost } from "../services/API";
import Swal from "sweetalert2";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import Post from "../components/Post"
import NoPostFound from "../styled-components/NoPostsFound"
import Loader from 'react-loader-spinner'

export default function PageHashtag() {
    const { hashtag } = useParams();
    const { user } = useContext(UserContext);
    const [hashtagPost, setHashtagPost] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  
    useEffect( () => {
      getHashtagPost(hashtag, config)
      .then( (res) => {setHashtagPost(res.data.posts)
        setIsLoadingPosts(false)
        console.log(res)})
      .catch( () => { Error() });
      //eslint-disable-next-line
    }, [hashtag]);
  
    function Error() {
      Swal.fire({
        icon: "error",
        title: "OOPS...",
        text: "Parece que ocorreu um erro 🤔, tenta de novo aí 🙂",
      });
    }

    const CenteredLoader = () => {
        return (
            <CenteredContainer>
                <Loader type="ThreeDots" color="#151515" height={70} width={70}/>
            </CenteredContainer>
        )
    }  
    const HashtagPost = () => { 
        return (
            isLoadingPosts ? <CenteredLoader /> : 
                hashtagPost.length === 0 ? <NoPostFound>Nenhum post encontrado</NoPostFound> :
                    hashtagPost.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                        />
                    ))
        );
    }

    return (
        <>
          <Header/>
          <TimelineContainer>
            <TimelineBox>
              <TimelineBody>
                <Title>{`# ${hashtag}`}</Title>
                <HashtagPost />
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
  margin-bottom: 50px;

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

const CenteredContainer = styled.div`
    min-width: 610px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 635px) {
        min-width: 100%;
    }
`