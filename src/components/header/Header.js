import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <p>Linkr</p>
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

  p {
    font-family: "Passion One", cursive;
    font-weight: bold;
    font-size: 49px;
  }
`;
