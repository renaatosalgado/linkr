import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import Loader from "react-loader-spinner";
import { followUser, unfollowUser, getUsersThatIFollow } from "../services/API";
import UserContext from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FollowButton = ({ shouldDisplay }) => {
  const [isFollowing, setIsFollowing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    getUsersThatIFollow(config).then((res) => {
      let isInTheList = false;
      //eslint-disable-next-line
      res.data.users.map((thisUser) => {
        if (thisUser.id === Number(id)) isInTheList = true;
      });
      setIsFollowing(isInTheList);
      setIsLoading(false);
    });
    //eslint-disable-next-line
  }, []);

  const handleClick = () => {
    if (isLoading) return null;
    setIsLoading(true);

    if (isFollowing) {
      unfollowThisUser()
        .then(() => {
          setIsLoading(false);
          setIsFollowing(false);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "OOPS...",
            text: "Não foi possível executar essa ação, tente novamente mais tarde.",
          });
        });
    } else {
      followThisUser()
        .then(() => {
          setIsLoading(false);
          setIsFollowing(true);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "OOPS...",
            text: "Não foi possível executar essa ação, tente novamente mais tarde.",
          });
        });
    }
  };

  const followThisUser = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    return followUser(id, config);
  };

  const unfollowThisUser = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    return unfollowUser(id, config);
  };

  return (
    <FollowButtonContainer
      onClick={handleClick}
      display={shouldDisplay ? "flex" : "none"}
      background={isFollowing ? "#FFFFFF" : "#1877F2"}
      color={isFollowing ? "#1877F2" : "#FFFFFF"}
    >
      {isLoading ? (
        <Loader type="ThreeDots" color="#ffffff" height={35} width={35} />
      ) : isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </FollowButtonContainer>
  );
};

const FollowButtonContainer = styled.div`
  position: relative;
  left: -112px;
  bottom: -10.5px;
  background-color: ${({ background }) => background};
  border-radius: 5px;
  min-width: 112px;
  height: 31px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: ${({ color }) => color};
  display: ${({ display }) => display};
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(80%);
  }

  @media(max-width: 635px) {
    bottom: -50px;
  }
`;

export default FollowButton;
