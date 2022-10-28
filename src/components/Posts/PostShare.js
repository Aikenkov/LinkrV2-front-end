import { useContext, useEffect, useState } from "react";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import styled from "styled-components";
import { getSharesNumber, sharePost } from "../Service/api";
import UserContext from "../contexts/userContexts";

export default function PostShare({post_id,setIsOpenShare}){

    const [reposts, setReposts] = useState([]);
    const { reload, setReload } = useContext(UserContext);

    useEffect(() => {
        getSharesNumber(post_id).then(p => setReposts(p.data));
    },[reload]);
    return(
        <Wrapper>
            <ShareIcon onClick={() => {setIsOpenShare(true)}}/>
            <h4>{reposts?.shares}  re-posts</h4>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 19px;

    && h4 {
        font-size: 11px;
        margin-top: 5px;
        color: var(--heavy-text);
        padding: 0;
        white-space: nowrap;
    }
`;


const ShareIcon = styled(HiOutlineArrowsRightLeft)`
    font-size: 24px;
    color: var(--heavy-text);
    cursor: pointer;
    user-select: none;
    :hover {
        transition: all 0.1s ease-in;
        filter: brightness(1.4);
    }
    :active {
        transform: translateY(2px);
        transition: all 0.2s ease-in;
    }
`;
