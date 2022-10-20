import styled from "styled-components";
import picture from "../Timeline/image 4.png";

export default function Timeline() {

  return (
    <>
      <Wrapper>
        <Post>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIkGpmypTxbmM5WrEA4LDpEfvfcQvgoP1bg&usqp=CAU"
            }
            alt="perfil"
          />

          <span>
            <span>Juvenal Juvêncio</span>

            <p>
              Muito maneiro esse tutorial de Material UI com React, deem uma
              olhada!
            </p>

            <MetadataImg />
          </span>
        </Post>
      </Wrapper>
    </>
  );
}

function MetadataImg() {
  return (
    <MetadataImage
      href="https://medium.com/@pshrmn/a-simple-react-router"
      target="_blank"
    >
      <Metadata>
        <h6>Como aplicar o Material UI em um projeto React</h6>
        <p>
          Hey! I have moved this tutorial to my personal blog. Same content, new
          location. Sorry about making you click through to another page.
        </p>

        <h5>https://medium.com/@pshrmn/a-simple-react-router</h5>
      </Metadata>
      <img src={picture} />
    </MetadataImage>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: Lato;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    margin-right: 18px;
  }

  span {
    font-size: 19px;
  }

  p {
    font-size: 17px;
    color: #b7b7b7;
    margin-top: 7px;
  }
`;

const Post = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  padding: 19px;
`;

const Metadata = styled.div`
  width: 350px;
  height: 155px;
  border-top: solid 1px #4d4d4d;
  border-left: solid 1px #4d4d4d;
  border-right: 0px;
  border-bottom: solid 1px #4d4d4d;
  border-radius: 11px 0px 0px 11px;
  margin-top: 16px;
  padding: 20px 19px;
  line-height: 19px;

  h6 {
    font-size: 16px;
    color: #cecece;
  }

  p {
    font-size: 11px;
    color: #9b9595;
    line-height: 13px;
  }

  h5 {
    font-size: 11px;
    color: #cecece;
    margin-top: 10px;
  }
`;

const MetadataImage = styled.a`
  display: flex;

  img {
    width: 153px;
    height: 155px;
    border: none;
    border-radius: 0px 11px 11px 0px;
    margin-top: 16px;
  }
`;
