import {Button} from "@mui/material";

export default async function LoggedIn()
{
    return(
    <div style = {{display:"flex", justifyContent:"flex-end", gap:"10px"}}>
        
        <Button variant="outlined" size="medium" color="primary" href="/account">Account</Button>
        <Button variant="contained" size="medium" color="primary" href="/api/auth/logout">Log out</Button>
    </div>
    );
}