import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { getHashtagTrending } from "../services/API";
import Swal from "sweetalert2";

export default function Trending() {
  const { user } = useContext(UserContext);
  const [hashtags, setHashtags] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    getHashtagTrending(config)
      .then((res) => {
        setHashtags(res.data.hashtags);
      })
      .catch(() => {
        Error();
      });
    //eslint-disable-next-line
  }, []);

  function Error() {
    Swal.fire({
      icon: "error",
      title: "OOPS...",
      text: "Parece que ocorreu um erro no Trending 🤔, tenta de novo aí 🙂",
    });
  }

  return (
    <TrendingContainer>
      <TrendingTitle>trending</TrendingTitle>
      <Hashtags>
        {hashtags.map(({ name, id }) => {
          return (
            <Link key={id} to={`/hashtag/${name}`}>
              <p>{`#${name}`}</p>
            </Link>
          );
        })}
      </Hashtags>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  width: 100%;
  min-width: 240px;
  height: 340px;
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
  padding: 20px 16px;

  p:hover {
    color: #1877f2;
    cursor: pointer;
  }
`;
