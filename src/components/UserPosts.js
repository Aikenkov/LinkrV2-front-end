import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function UserPosts(){
    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const promisse = axios.get(`http://localhost:4489/users/${id}`);
        promisse.then(p => setUserData([...p.data]));
    },[]);
    console.log('Renderizando',userData);
    return(
        <>
            <div>
                <img src={userData[0]?.picture}/>
                <h1>{userData[0]?.username}</h1>
            </div>
        </>
    )
}