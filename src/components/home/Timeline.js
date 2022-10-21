import styled from "styled-components";
import NewPost from "./NewPost";
import Posts from "../Posts/Posts";

export default function Timeline() {
    return (
        <Wrapper>
            <h1>timeline</h1>
            <NewPost />
            <Posts />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 40vw;
    max-width: 611px;
    margin-right: 25px;
    margin-top: 125px;

    && h1 {
        font-family: "Oswald", sans-serif;
        font-size: 43px;
        font-weight: 700;
        color: var(--heavy-text);
    }
`;
