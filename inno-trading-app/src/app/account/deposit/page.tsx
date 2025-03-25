import {Button, FormControl, InputLabel, OutlinedInput, InputAdornment} from "@mui/material";

function depositAction(){
    
}

export default function Deposit()
{
    return (
        <div>
          <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
            <Button>Deposit</Button>
        </div>
    );
}