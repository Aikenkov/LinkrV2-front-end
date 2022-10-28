import { React } from "react";
import styled from "styled-components";

export default function LinkPreview({ metadataUrl }) {
  const { title, description, link, image } = metadataUrl;

  return (
    <MetadataImage href={link} target="_blank">
      <Metadata>
        <h6>{title}</h6>
        <h3>{description}</h3>

        <h5>{link}</h5>
      </Metadata>

      <img src={image} alt="preview" />
    </MetadataImage>
  );
}

const MetadataImage = styled.a`
  display: flex;
  img {
    width: 30.5%;
    height: 155px;
    border: none;
    border-radius: 0px 11px 11px 0px;
    margin-top: 10px;
    object-fit: cover;
  }
`;

const Metadata = styled.div`
  width: 70%;
  height: 155px;
  border-top: solid 1px #4d4d4d;
  border-left: solid 1px #4d4d4d;
  border-right: 0px;
  border-bottom: solid 1px #4d4d4d;
  border-radius: 11px 0px 0px 11px;
  margin-top: 10px;
  padding: 20px 19px;
  line-height: 19px;

  h3 {
    font-size: 11px;
    color: #b7b7b7;
    line-height: 13px;
    margin-top: 8px;
    height: fit-content;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
    max-height: 65px;
  }

  h6 {
    font-size: 16px;
    color: #cecece;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
  }
  
  h5 {
    font-size: 11px;
    color: #cecece;
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
  }
`;
