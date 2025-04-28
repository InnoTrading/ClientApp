import {Button} from "@mui/material";

export default  function LoggedOut()
{
    return( 
    <div style = {{display:"flex", justifyContent:"flex-end", gap:"10px"}}>
        <Button variant="outlined" size="medium" href="/api/auth/login">Log in</Button> 
        <Button variant="contained" size="medium" color="primary" href="/api/auth/login?screen_hint=signup">Sign Up</Button>
    </div>
    );
}