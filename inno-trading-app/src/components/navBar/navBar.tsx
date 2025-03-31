import React, {ReactNode} from "react";
import { getSession } from '@auth0/nextjs-auth0';
import {InputAdornment, TextField} from '@mui/material';
import { IoIosSearch } from "react-icons/io";
import LoggedIn from "./loggedIn";
import LoggedOut from "./loggedOut";
import "./navbar.css"

type ChildrenProps = {
    children: ReactNode;
}

export default async function NavBar({children}: ChildrenProps)
{
    const session = await getSession();
    console.log(session);
    return (
        <div>
        <div className="navbar">
            <div style = {{display:"flex", justifyContent:"flex-start"}}>
                <span>InnoTrading</span>
            </div>
            <TextField
                id="input-with-icon-textfield"
                label="Search stocks"
                slotProps={{
                input: {
                    startAdornment: (
                    <InputAdornment position="start">
                        <IoIosSearch/>
                    </InputAdornment>
                    ),
                },
                }}
                variant="standard"
            />
            <div>
            {session && session.user ? <h1>Welcome, {session.user.name}! </h1> : false}
            </div>
            {session && session.user ? LoggedIn() : LoggedOut()}
        </div>
        <hr className="solid"/>
            {children}
        </div>
        )
}