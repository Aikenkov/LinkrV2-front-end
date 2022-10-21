import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";

export default function PrivateRoute({ children }) {
    const localStorageUser = JSON.parse(localStorage.getItem("userLinkr"));
    const [loggedUser, setLoggedUser] = useState(localStorageUser);
    const navigate = useNavigate();
    if (loggedUser) {
        return (
            <>
                <Header />
                {children}
            </>
        );
    } else {
        return <Navigate to='/' replace />;
    }
}
