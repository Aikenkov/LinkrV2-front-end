import styled from "styled-components";

export default function Header() {
    return (
        <Wrapper>
            <h1>linkr</h1>
            <img src='https://i.pinimg.com/736x/f8/f3/01/f8f301698392ee89abd583fe98c83a54.jpg' />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: var(--heavy-background);
    width: 100vw;
    height: 72px;
    padding: 10px 0;

    img {
        width: 53px;
        height: 53px;
        border-radius: 50%;
        margin-right: 17px;
    }

    h1 {
        margin-left: 28px;
        font-family: "Passion One", cursive;
        color: var(--heavy-text);
        font-size: 49px;
        font-weight: 700;
    }
`;
