import React, {ReactNode} from "react";
import { getSession } from '@auth0/nextjs-auth0';
import StockSearch from './stockSearch';
import LoggedIn from "./loggedIn";
import LoggedOut from "./loggedOut";
import "./navbar.css"


export default async function NavBar()
{
    const session = await getSession();
    console.log(session);
    return (
        <div>
        <div className="navbar">
            <div style = {{display:"flex", justifyContent:"flex-start"}}>
                <span>InnoTrading</span>
            </div>
            <StockSearch />
            <div>
            {session && session.user ? <h1>Welcome, {session.user.name}! </h1> : false}
            </div>
            {session && session.user ? LoggedIn() : LoggedOut()}
        </div>
        <hr className="solid"/>
        </div>
        )
}