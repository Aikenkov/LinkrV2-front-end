import styled from "styled-components";

export default function Header() {
    const image = localStorage.getItem("image");

    return (
        <Wrapper>
            <h1>linkr</h1>
            <img src={image} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
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
