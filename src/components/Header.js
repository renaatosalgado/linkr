import React from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { getSearchUser } from "../services/API";
import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";

export default function Header() {
  const [quickAccess, setQuickAccess] = useState(false);
  const { user } = useContext(UserContext);
  const [searchName, setSearchName] = useState("");
  const [foundUser, setFoundUser] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  let ref = useRef();

  const history = useHistory();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  function logout() {
    localStorage.removeItem("LinkrUserData");
    history.push("/");
  }

  useEffect(() => {
    function OutsideClick(e) {
      if (quickAccess && ref.current && !ref.current.contains(e.target)) {
        setQuickAccess(false);
      }
    }
    document.addEventListener("mousedown", OutsideClick);
    return () => {
      document.removeEventListener("mousedown", OutsideClick);
    };
  }, [quickAccess]);

  useEffect(() => {
    getSearchUser(searchName, config).then((res) => {
      setIsSearching(true);
      setFoundUser(res.data.users);
    });
    if(searchName.length < 3)
    return setIsSearching(false);
    //eslint-disable-next-line
  }, [searchName]);

  

  return (
    <HeaderContainer ref={ref}>
      <Link to="/timeline">
        <p>linkr</p>
      </Link>

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
                <SingleUserAvatar>
                  <img src={user.avatar} alt="profile" />
                </SingleUserAvatar>
              </Link>
              <Link to={`/user/${user.id}`}>
                <p>
                  {user.username}{" "}
                  {user.isFollowingLoggedUser ? <span> • following</span> : ""}
                </p>
              </Link>
            </SingleUser>
          ))}
        </FoundUsers>
      </SearchContainer>

      <img
        onClick={() => setQuickAccess(!quickAccess)}
        src={user.user.avatar}
        alt="foto de perfil"
      />
      <ChevronIcon
        transfrom={quickAccess ? "rotate(180deg)" : "rotate(0deg)"}
        onClick={() => setQuickAccess(!quickAccess)}
        size="25px"
      />
      <DivQuickAccess ref={ref} display={quickAccess ? "inherit" : "none"}>
        <Link to="/my-posts">My posts</Link>
        <Link to="/my-likes">My likes</Link>
        <h3 onClick={logout}>Logout</h3>
      </DivQuickAccess>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 72px;
  background-color: #151515;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 28px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  a {
    font-family: "Passion One", cursive;
    font-weight: bold;
    font-size: 49px;
  }

  img {
    width: 53px;
    height: 53px;
    position: absolute;
    top: 10px;
    right: 17px;
    border-radius: 50%;
  }

  img:hover {
    cursor: pointer;
  }

  p:hover {
    color: #1877f2;
    cursor: pointer;
  }

  @media (max-width: 635px) {
    p {
      font-size: 45px;
    }
    padding-left: 17px;
  }
`;

const ChevronIcon = styled(FaChevronDown)`
  position: absolute;
  right: 86.31px;
  top: 32.38px;
  transform: ${({ transfrom }) => transfrom};

  &:hover {
    color: #1877f2;
    cursor: pointer;
  }
`;

const DivQuickAccess = styled.div`
  width: 135px;
  height: 109px;
  background-color: #171717;
  border-bottom-left-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 72px;
  right: 0;
  display: ${({ display }) => display};

  h3,
  a {
    font-size: 17px;
    color: #ffffff;
    font-weight: bold;
    margin-top: 12px;
    font-family: "Lato", sans-serif;
  }

  h3:hover,
  a:hover {
    cursor: pointer;
    color: #1877f2;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 400px;
  height: 45px;
  margin-left: calc((100vw - 400px) / 3);
  font-family: "Lato";
  font-size: 19px;
  line-height: 22.8px;

  @media(max-width: 635px) {
    font-size: 17px;
    line-height: 20.4px;
    width: calc((100vw - 330px) / 2)
  }
`;

const SearchInput = styled.input`
  background-color: #ffffff;
  width: 400px;
  height: 45px;
  border-radius: 8px;
  padding-left: 17px;
  z-index: 3;

  &::placeholder {
    font-size: 19px;
    line-height: 22.8px;
    color: #c6c6c6;
  }

  &:focus {
    outline: none;
  }

  @media(max-width: 635px) {
    margin-top: 82px;
    width: calc(100vw - 30px);

    &::placeholder{
      font-size: 17px;
      line-height: 20.4px;
    }
  }
`;

const SearchIcon = styled.div`
  color: #c6c6c6;
  position: absolute;
  top: 11px;
  right: 15px;
`;

const FoundUsers = styled.div`
  width: 400px;
  background-color: #e7e7e7;
  border-radius: 8px;
  position: absolute;
  top: 45px;
  right: 0;
  z-index: 1;
  display: ${(props) => (props.isSearching ? "inherit" : "none")};

  @media(max-width: 635px) {
    width: 350px;
    top: 127px;
  }
`;

const SingleUser = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  color: #515151;

  p {
    font-size: 19px;
    font-family: "Lato";
    margin-left: 30px;
    word-break: break-word;
  }

  span {
    color: #c5c5c5;
    font-size: 19px;
    font-family: "Lato";
  }

  @media(max-width: 635px) {
    p {
      font-size: 17px;
    }

    span {
      font-size: 17px;
    }
  }
`;

const SingleUserAvatar = styled.div`
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
`;
