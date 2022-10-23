import styled from "styled-components";
import NewPost from "./NewPost";
import Posts from "../Posts/Posts";
import { getTimeline } from "../Service/api";

export default function Timeline() {
    return (
        <Wrapper>
            <h1>timeline</h1>
            <NewPost />
            <Posts func={getTimeline} />
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
        margin-left: 17px;
        font-weight: 700;
        color: var(--heavy-text);
    }

    @media only screen and (max-width: 1023px) and (min-width: 768px) {
        width: 60vw;
    }

    @media only screen and (max-width: 767px) {
        width: 100vw;
        margin-right: 0;
        max-width: 100vw;
    }
`;
