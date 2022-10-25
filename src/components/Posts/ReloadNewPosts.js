import Reload from "../../assets/reloadVector.svg";
import styled from "styled-components";

export default function ReloadNewPosts() {
  return (
    <ButtonNewPosts>
      <h2>12 new posts, load more!</h2>
      <img src={Reload} alt="reload" />
    </ButtonNewPosts>
  );
}

const ButtonNewPosts = styled.button`
  height: 61px;
  background-color: #1877f2;
  width: 100%;
  border-radius: 16px;
  border: none;
  margin-top: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;

  h2 {
    font-weight: 400;
    font-size: 16px;
    margin-right: 14px;
  }
`;
