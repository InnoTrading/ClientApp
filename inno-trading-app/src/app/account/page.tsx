import {Button} from "@mui/material";

export default function Account()
{
    return (
        <div>
            <text>Free balance: </text>
            <Button variant="outlined" href="/account/deposit">Deposit</Button>
            <Button variant="contained">Withdrawal</Button>
        </div>
    );
}