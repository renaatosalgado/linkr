import styled from "styled-components";
import Header from "../header/Header";
import picture from "../../assets/logo.png";

export default function Timeline() {
  return (
    <>
      <Header></Header>
      <TimelineContainer>
        <TimelineBox>
          <TimelineBody>
            <Title>timeline</Title>
            <CreatePost>
              <Img>
                <ProfilePic src={picture} alt="" />
              </Img>
              <Form>
                <p>O que você tem pra favoritar hoje?</p>
                <Link type="url" placeholder="http://"></Link>
                <Description
                  type="text"
                  placeholder="Muito irado esse link falando de
                  #javascript"
                ></Description>
                <Buttons>
                  <Publish>Publicar</Publish>
                </Buttons>
              </Form>
            </CreatePost>
            <Post></Post>
            <Post></Post>
            <Post></Post>
          </TimelineBody>
          <TrendingContainer>
            <TrendingTitle>trending</TrendingTitle>
            <Hashtags>
              <p># {"javascript"}</p>
              <p># {"react"}</p>
              <p># {"react-native"}</p>
              <p># {"material"}</p>
              <p># {"web-dev"}</p>
              <p># {"mobile"}</p>
              <p># {"css"}</p>
              <p># {"html"}</p>
              <p># {"node"}</p>
              <p># {"sql"}</p>
            </Hashtags>
          </TrendingContainer>
        </TimelineBox>
      </TimelineContainer>
    </>
  );
}

const TimelineContainer = styled.div`
  height: 100%;
  background-color: #333333;
  padding-top: 125px;
  display: flex;
  justify-content: center;
`;

const TimelineBox = styled.div`
  display: flex;
  padding-bottom: 30px;
`;

const Title = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  color: #ffffff;
  margin-bottom: 43px;
`;

const TimelineBody = styled.div`
  width: 611px;
  margin: 0 auto;
`;

const CreatePost = styled.div`
  width: 611px;
  height: 209px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Img = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 16px;
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
`;

const Description = styled.textarea`
  border-radius: 5px;
  background-color: #efefef;
  max-height: 66px;
  max-width: 503px;
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
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Publish = styled.button`
  background-color: #1877f2;
  width: 112px;
  height: 31px;
  color: #ffffff;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    filter: brightness(108%);
  }
`;

const Post = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 29px;
`;

const TrendingContainer = styled.div`
  min-width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 86px;
  margin-left: 25px;
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
  padding: 16px 16px 30px 16px;
`;
