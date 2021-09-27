import styled from "styled-components";
import getYouTubeID from "get-youtube-id";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Iframe from "react-iframe";

const LinkPreviewContainer = styled.div`
  height: 155px;
  border: 1px solid #4d4d4d;
  box-sizing: border-box;
  border-radius: 11px;
  position: relative;

  @media (max-width: 635px) {
    height: 115px;
  }
`;

const LinkTitle = styled.p`
  padding-bottom: 4px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #cecece;
  margin-top: 24px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  &:hover {
    cursor: pointer;
    color: #1877f2;
  }

  @media (max-width: 635px) {
    margin-top: 7px;
    margin-bottom: 4px;
    font-size: 11px;
  }
`;

const LinkDescription = styled.p`
  line-height: 1.5;
  padding-bottom: 2px;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  color: #9b9595;
  margin-bottom: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  &:hover {
    cursor: pointer;
    color: #1877f2;
  }

  @media (max-width: 635px) {
    font-size: 9px;
    margin-bottom: 4px;
  }
`;

const LinkAnchor = styled.p`
  line-height: 1.25;
  padding-bottom: 2px;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  color: #cecece;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  &:hover {
    cursor: pointer;
    color: #1877f2;
  }

  @media (max-width: 635px) {
    font-size: 9px;
  }
`;

const LeftContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 155px);
  padding-left: 19px;
  display: flex;
  flex-direction: column;

  @media (max-width: 635px) {
    padding-left: 15px;
    width: calc(100% - 115px);
  }
`;

const LinkImg = styled.img`
  position: absolute;
  width: 155px;
  height: 155px;
  right: 0;
  top: 0;
  border-radius: 0px 12px 13px 0px;
  cursor: pointer;

  @media (max-width: 635px) {
    width: 95px;
    height: 115px;
    border-radius: 0px 12px 13px 0px;
  }
`;

const YoutubeContainer = styled.div`
  background-color: #171717;

  p {
    color: #b7b7b7;
    font-size: 17px;
    line-height: 20.4px;
    font-family: "Lato", sans-serif;
    margin-top: 6px;
    word-break: break-word;
    &:hover {
      cursor: pointer;
      color: #1877f2;
    }
  }

  @media (max-width: 635px) {
    p {
      font-size: 12px;
    }
  }
`;

const YoutubePlayer = styled.iframe`
  width: 100%;
  height: 281px;
  margin-top: 5px;

  @media (max-width: 635px) {
    width: 100%;
    height: 161px;
    margin-top: 2px;
  }
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const ContainerButtonGoToPage = styled.div`
  background: #1877f2;
  border-radius: 5px;
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 3px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
`;

const ButtonGoToPage = ({ link }) => {
  return (
    <ContainerButtonGoToPage onClick={() => window.open(link, "_blank")}>
      Open in new tab
    </ContainerButtonGoToPage>
  );
};

const ModalFullScreen = styled.div`
  z-index: 98;
  position: fixed;
  ${({ display }) => (display ? "" : "display: none;")}
  top: 0;
  left: 0;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background-color: rgba(255, 255, 255, 0.5);
`;

const InnerModal = styled.div`
  z-index: 99;
  position: absolute;
  padding: 40px 16px 20px 16px;

  top: 60px;
  left: 237px;
  right: 237px;
  bottom: 60px;
  opacity: 1;
  background-color: #333333;
  border-radius: 20px;
  box-sizing: border-box;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const ModalContainer = ({ link, display, setDisplay }) => {
  const { height, width } = useWindowDimensions();

  const modalStyles = {
    zIndex: 98,
    position: "fixed",
    top: "0",
    left: "0",
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };

  const innerModalStyles = {
    zIndex: 99,
    position: "absolute",

    padding: "40px 16px 20px 16px",

    top: `${60}px`,
    left: `${237}px`,
    right: `${237}px`,
    bottom: `${60}px`,
    opacity: 1,
    backgroundColor: "#333333",
    borderRadius: "20px",
    boxSizing: "border-box",
  };

  return (
    <ModalFullScreen width={width} height={height} display={display}>
      <InnerModal>
        <ButtonGoToPage link={link} />
        <CloseIconWrapper>
          <IoClose
            style={{
              color: "white",
              width: "25px",
              height: "25px",
            }}
            onClick={() => setDisplay(false)}
          />
        </CloseIconWrapper>
        <Iframe
          url={link}
          display="flex"
          position="relative"
          width={`${width - 2 * 237 - 16 - 16}px`}
          height={`${height - 2 * 60 - 40 - 20}px`}
        />
      </InnerModal>
    </ModalFullScreen>
  );
};

const LinkPreview = ({ link, linkTitle, linkDescription, linkImage }) => {
  const [youtubeId, setYoutubeId] = useState("");
  const [display, setDisplay] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (link.includes("youtube.com")) {
      setYoutubeId(getYouTubeID(`${link}`));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (width <= 635) {
      setDisplay(false);
    }
  }, [width]);

  const handleClick = () => {
    if (width <= 635) {
      window.open(link, "_blank");
    } else {
      setDisplay(true);
    }
  };

  return link.includes("youtube.com") ? (
    <YoutubeContainer>
      <YoutubePlayer
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={linkTitle}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></YoutubePlayer>
      <p>{link}</p>
    </YoutubeContainer>
  ) : (
    <>
    <LinkPreviewContainer onClick={handleClick}>
      <LeftContainer>
        <LinkTitle>{linkTitle}</LinkTitle>
        <LinkDescription>{linkDescription}</LinkDescription>
        <LinkAnchor>{link}</LinkAnchor>
      </LeftContainer>
      <LinkImg src={linkImage}></LinkImg>
    </LinkPreviewContainer>
    <ModalContainer link={display ? link : ''} display={display} setDisplay={setDisplay} />
    </>
  );
};

export default LinkPreview;
