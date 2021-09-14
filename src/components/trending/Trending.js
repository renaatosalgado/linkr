import React from "react";
import styled from "styled-components";

export default function Trending() {
  return (
    <TrendingContainer>
      <Title>trending</Title>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  min-width: 301px;
  background-color: #151515;
  border-radius: 16px;
  height: 100%;
  margin-top: 86px;
`;

const Title = styled.div`
  font-family: "Oswald", sans-serif;
  color: #ffffff;
  font-weight: bold;
  font-size: 27px;
`;
