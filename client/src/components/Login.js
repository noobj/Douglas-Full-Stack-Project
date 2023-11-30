import React, { useState } from "react";
import '../css/login.css';
import users from '../mock_data/users.json';

const Login = ({ setUserInfo }) =>
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onClick = () =>
    {
        const foundUser = users.find((value) =>
        {
            return value.username === username && value.passowrd === password;
        });

        if (foundUser) {
            setUserInfo(foundUser);
        }
        else alert("Wrong password")
    }


    return (<div>
        <div>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={username}
                placeholder="Enter your username here"
                onChange={e => setUsername(e.target.value)}
            />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                type="button"
                onClick={onClick}
                value={"Log in"} />
        </div>
    </div>
    )
}

export default Login