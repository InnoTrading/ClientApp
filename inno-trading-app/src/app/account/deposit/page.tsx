"use client";
import { useState } from "react";
import {Button, FormControl, InputLabel, OutlinedInput, InputAdornment} from "@mui/material";
import { depositMoney } from "@/api/accountApi";



export default  function Deposit()
{   const [amount, setAmount] = useState<string>('0');
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
      };
    
      const handleDeposit = async () =>{
        console.log('Amount:', amount);
        await depositMoney(amount);
    }

    return (
        <div>
          <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            onChange={handleChange}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
            <Button onClick={handleDeposit}>Deposit</Button>
        </div>
    );
}