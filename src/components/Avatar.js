import { Link } from "react-router-dom";
import styled from "styled-components";

const PerfilPicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin-bottom: 19px;
  @media (max-width: 635px) {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 19px;
  }
`;

const Avatar = ({ src, userId }) => {
  return (
    <Link to={`/user/${userId}`}>
      <PerfilPicture src={src} />
    </Link>
  );
};

export default Avatar;
