import React from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function Header() {
  const [quickAccess, setQuickAccess] = useState(false)
  const {
    user,
    setUser
  } = useContext(UserContext)

  const history = useHistory();

  function showQuickAccess() {
    if (quickAccess) {
      setQuickAccess(false)
    } else {
      setQuickAccess(true)
    }
  }

  function logout() {
    localStorage.removeItem('LinkrUserData');
    history.push("/");
  }
  
  return (
    <HeaderContainer>
      <p>linkr</p>
      <img onClick={showQuickAccess} src={user.user.avatar} alt="foto de perfil" />
      <ChevronIcon quickAccess={quickAccess} onClick={showQuickAccess} size="25px" />
      <DivQuickAccess quickAccess={quickAccess}>
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
  position: relative;

  p {
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

  @media(max-width: 635px){
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
  transform: ${({quickAccess}) => quickAccess ? "rotate(180deg)" : "rotate(0deg)"};
`;

const DivQuickAccess= styled.div`
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
     opacity: ${({quickAccess}) => quickAccess ? 1 : 0};

     h3, a {
     font-size: 17px;
     color: #FFFFFF;
     font-weight: bold;
     margin-top: 12px;
     font-family: 'Lato', sans-serif;
   }
`;
