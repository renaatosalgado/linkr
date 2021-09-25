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
  let ref = useRef();

  const history = useHistory();

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

  const searchUser = () => {
    getSearchUser();
  };

  return (
    <HeaderContainer ref={ref}>
      <Link to="/timeline">
        <p>linkr</p>
      </Link>

      <SearchContainer>
        <SearchInput placeholder="Search for people and friends"></SearchInput>
        <SearchIcon>
          <AiOutlineSearch size="25px" />
        </SearchIcon>
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
  margin: 0 auto;
`;

const SearchInput = styled.input`
  background-color: #ffffff;
  min-width: 563px;
  height: 45px;
  border-radius: 8px;
`;

const SearchIcon = styled.div`
  color: #c6c6c6;
  position: absolute;
  top: 11px;
  right: 15px;

  &:hover {
    cursor: pointer;
    color: #1877f2;
  }
`;
