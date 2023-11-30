import React from "react";
import Login from "../components/Login";
import Stopwatch from "../components/Stopwatch";

const Home = ({ userInfo, setUserInfo }) =>
{
    if (userInfo !== null) {
        return (
            <>
                <h1>Hold Your Breath!</h1>
                <Stopwatch />
            </>
        )
    } else {
        return <Login setUserInfo={setUserInfo} />
    }
}

export default Home