import styled from "styled-components";
import Timeline from "./Timeline";
import Trending from "./Trending";

export default function Home() {
    return (
        <Wrapper>
            <Timeline />
            <Trending />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    h1 {
        color: black;
    }
`;
