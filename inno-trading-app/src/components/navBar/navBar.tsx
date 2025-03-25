import React, {ReactNode} from "react";
import { getSession } from '@auth0/nextjs-auth0';
import LoggedIn from "./loggedIn";
import LoggedOut from "./loggedOut";
import "./navbar.css"

type ChildrenProps = {
    children: ReactNode;
}

export default async function NavBar({children}: ChildrenProps)
{
    const session = await getSession();
    
    return (
        <div>
        <div className="navbar">
            <div style = {{display:"flex", justifyContent:"flex-start"}}>
                <span>InnoTrading</span>
            </div>
            <div>
            {session && session.user ? <h1>Welcome, {session.user.name}!</h1> : false}
            </div>
            {session && session.user ? LoggedIn() : LoggedOut()}
        </div>
        <hr className="solid"/>
            {children}
        </div>
        )
}