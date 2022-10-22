import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getTrending } from "../Service/api";

export default function Trending() {
    const [trending, setTrending] = useState([]);
    useEffect(() => {
        const trendingPromisse = getTrending();
        trendingPromisse.then(p => setTrending(p.data));
    },[]);
    const navigate = useNavigate();
    console.log(trending);

    return (
        <Wrapper>
            <h2>Trending</h2>
            <HorizontalBorder/>
            <TrendingTags>
                {trending.map((t,i) => <p key={i} onClick={() => {navigate(`/hashtag/${t?.tag}`)}}># {t?.tag}</p>)}
            </TrendingTags>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 20vw;
    max-width: 301px;
    height: 500px;
    //margin-top: 232px;
    margin-top: 210px;
    border-radius: 16px;
    background-color: var(--heavy-background);
    display: flex;
    flex-direction: column;

    h2 {
        font-family: "Oswald";
        color: white;
        font-weight: 700;
        font-size: 27px;
        margin-left: 18px;
        margin-top: 10px;
    }
`;

const HorizontalBorder = styled.div`
    width: 100%;
    height: 1px;
    background-color: #484848;
    margin-top: 12px;
`

const TrendingTags = styled.div`
        margin-top: 22px;
        margin-left: 16px;
        p{
            color: white;
            font-weight: 700;
            font-size: 19px;
            margin-top: 5px;
            cursor: pointer;
        }
`
