import styled from "styled-components";

export default function Trending() {
    return (
        <Wrapper>
            <h1>Trending</h1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 20vw;
    max-width: 301px;
    height: 500px;
    margin-top: 232px;

    background-color: var(--heavy-background);

    h1 {
        color: white;
    }
`;
