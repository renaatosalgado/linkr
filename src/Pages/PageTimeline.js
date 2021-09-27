import styled from "styled-components";
import Header from "../components/Header";
import {
  postCreatePost,
  getPostsFromUsersThatIFollow,
  getUsersThatIFollow,
  getSearchUser,
  getPostsList
} from "../services/API";
import React, { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../contexts/UserContext";
import Trending from "../components/Trending";
import Posts from "../components/Posts";
import Swal from "sweetalert2";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";

import YouDontFollowAnyone from "../styled-components/YouDontFollowAnyone";
import { DebounceInput } from "react-debounce-input";

export default function PageTimeline() {
  const [loading, setLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [postsList, setPostsList] = useState([]);
  const [locationState, setLocationState] = useState(false);
  const [coordinates, setCoordinates] = useState("");
  const [isFollowingSomeone, setIsFollowingSomeone] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [foundUser, setFoundUser] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [scrollRadio, setScrollRadio] = useState (null);
  const scrollObserve = useRef();

  const { user } = useContext(UserContext);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    getUsersThatIFollow(config).then((res) => {
      setIsFollowingSomeone(res.data.users.length > 0);
    });
    getPostsFromUsersThatIFollow(config)
      .then((res) => {
        const postsToShow = [...res.data.posts];
        setPostsList(postsToShow);
        setIsLoadingPosts(false);
        //console.log('listando', res.data.posts)
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "OOPS...",
          text: "Houve uma falha ao obter os posts, por favor atualize a página",
        });
      });
    //eslint-disable-next-line
  }, []);

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
    const lastItem = postsList[postsList.length - 1];
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
      getPostsList(config, lastId() )
      .then((res) => {
        const newHashtagPost = [...postsList]
        newHashtagPost.push(...res.data.posts)
        setPostsList(newHashtagPost);
        console.log(newHashtagPost)
        setIsLoadingPosts(false);
        console.log(res);
      });
    }  
    
  },[scrollRadio]);

  function activeLocation() {
    if ("geolocation" in navigator) {
      setLocationState(!locationState);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setCoordinates(!locationState ? position.coords : "");
        },
        function (error) {
          setLocationState(locationState);
        }
      );
    } else {
      alert("Não foi possível encontrar a localização");
      setLocationState(false);
    }
  }

  function publishPost(event) {
    event.preventDefault();
    setLoading(true);

    const body = {
      text,
      link,
      geolocation: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    };

    postCreatePost(body, config)
      .then((res) => {
        setLoading(false);
        setText("");
        setLink("");
        setLocationState(!locationState);
        window.location.reload();
      })
      .catch(() => {
        alert(
          "There was an error while posting your link. Repeat the procedure."
        );
        setLoading(false);
      });
  }

  useEffect(() => {
    getSearchUser(searchName, config).then((res) => {
      setIsSearching(true);
      setFoundUser(res.data.users);
    });
    if (searchName.length < 3) return setIsSearching(false);
    //eslint-disable-next-line
  }, [searchName]);

  return (
    <>
      <Header />
      <SearchContainer>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
          element={SearchInput}
          placeholder="Search for people and friends"
          required
        />
        <SearchIcon>
          <AiOutlineSearch size="25px" />
        </SearchIcon>
        <FoundUsers isSearching={isSearching}>
          {foundUser.map((user) => (
            <SingleUser>
              <Link to={`/user/${user.id}`}>
                <SingleUserAvatar
                  onClick={() => {
                    setIsSearching(false);
                    setSearchName("");
                  }}
                >
                  <img src={user.avatar} alt="profile" />
                </SingleUserAvatar>
              </Link>
              <Link to={`/user/${user.id}`}>
                <p
                  onClick={() => {
                    setIsSearching(false);
                    setSearchName("");
                  }}
                >
                  {user.username}{" "}
                  {user.isFollowingLoggedUser ? <span> • following</span> : ""}
                </p>
              </Link>
            </SingleUser>
          ))}
        </FoundUsers>
      </SearchContainer>
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <Title>timeline</Title>
            <CreatePost>
              <CreatePostImg>
                <ProfilePic src={user.user.avatar} alt="" />
              </CreatePostImg>
              <Form onSubmit={publishPost}>
                <p>What do you have to share today?</p>
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
                  placeholder="Very cool this link talking about #javascript"
                ></Description>
                <Buttons>
                  <LocationButton
                    locationState={locationState}
                    onClick={activeLocation}
                  >
                    <LocationICon />
                    {locationState
                      ? "Localização ativada"
                      : "Localização desativada"}
                  </LocationButton>
                  <Publish type={"submit"} disabled={loading ? true : false}>
                    {loading ? "Publishing..." : "Publish"}
                  </Publish>
                </Buttons>
              </Form>
            </CreatePost>
            {isFollowingSomeone ? (
              <Posts
                postsList={postsList}
                isLoadingPosts={isLoadingPosts}
                setPostsList={setPostsList}
                coordinates={coordinates}
              />
            ) : (
              <YouDontFollowAnyone>
                {"Você não segue ninguém ainda, procure por perfis na busca"}
              </YouDontFollowAnyone>
            )}
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
    padding-top: 20px;
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
  justify-content: space-between;
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
    filter: brightness(90%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 635px) {
    height: 22px;
  }
`;

const LocationButton = styled.div`
  background-color: #ffffff;
  color: ${({ locationState }) => (locationState ? "#238700" : "#949494")};
  font-family: "Lato", sans-serif;
  font-size: 13px;
  width: 160px;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const LocationICon = styled(IoLocationOutline)`
  width: 18px;
  height: 18px;
`;

const SearchContainer = styled.div`
  display: none;

  @media (max-width: 635px) {
    width: calc((100% - 30px));
    margin: 0 auto;
    padding-top: 80px;
    display: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
`;

const SearchInput = styled.input`
  @media (max-width: 635px) {
    width: 100%;
    height: 45px;
    margin: 0 auto;
    border-radius: 8px;
    padding-left: 16px;
    font-family: "Lato";
    position: relative;

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-family: "Lato";
      font-size: 17px;
      color: #c6c6c6;
    }
  }
`;

const SearchIcon = styled.div`
  top: 8px;
  right: 8px;
  color: red;
  position: absolute;
  color: #c6c6c6;
`;

const FoundUsers = styled.div`
  @media (max-width: 635px) {
    display: ${(props) => (props.isSearching ? "inherit" : "none")};
    background-color: #e7e7e7;
    border-radius: 8px;
    height: 45px;
    position: absolute;
  }
`;

const SingleUser = styled.div`
  p {
    font-family: "Lato";
    font-size: 17px;
    word-break: break-word;
  }

  span {
    font-family: "Lato";
    font-size: 17px;
    word-break: break-word;
  }

  @media (max-width: 635px) {
    width: 100%;
    display: flex;
    align-items: center;
    color: #515151;
  }
`;

const SingleUserAvatar = styled.div`
  @media (max-width: 635px) {
    width: 39px;
    height: 39px;
    margin-bottom: 5px;

    img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
      top: calc((45px - 39px) / 2);
      left: 17px;
    }
  }
`;
