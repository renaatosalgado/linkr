import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom'


const LinkPreviewContainer = styled(Link)`
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
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #cecece;
  margin-top: 24px;
  margin-bottom: 5px;
  word-break: break-word;

  @media (max-width: 635px) {
    margin-top: 7px;
    margin-bottom: 4px;
    font-size: 11px;
  }
`;

const LinkDescription = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  color: #9b9595;
  margin-bottom: 13px;
  word-break: break-word;

  @media (max-width: 635px) {
    font-size: 9px;
    margin-bottom: 4px;
  }
`;

const LinkAnchor = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  color: #cecece;
  word-break: break-word;

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

  @media (max-width: 635px) {
    width: 95px;
    height: 115px;
    border-radius: 0px 12px 13px 0px;
  }
`;

const LinkPreview = ({ link, linkTitle, linkDescription, linkImage }) => {
  const history = useHistory()
  const goToLink = () => window.open(link, '_blank')
  return (
    <LinkPreviewContainer onClick={goToLink}>
      <LeftContainer>
        <LinkTitle>{linkTitle}</LinkTitle>
        <LinkDescription>{linkDescription}</LinkDescription>
        <LinkAnchor>{link}</LinkAnchor>
      </LeftContainer>
      <LinkImg src={linkImage}></LinkImg>
    </LinkPreviewContainer>
  );
};

export default LinkPreview;
