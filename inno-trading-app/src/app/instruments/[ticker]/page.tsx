"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button, Typography, Card, CardContent, TextField, Box, InputAdornment } from '@mui/material';
import styles from './StockPage.module.css';

export default function StockPage() {
  const { ticker } = useParams() as { ticker: string };
  const [price, setPrice] = useState<number | null>(null);
  const [priceLimit, setPriceLimit] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(1);

  // Subskrypcja SSE
  useEffect(() => {
    if (!ticker) return;

    const sseUrl = `https://localhost:5012/gateway/market-data/price/${ticker}`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setPrice(data.price);
      } catch (err) {
        console.error('An error occured during parsing SSE:', err);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [ticker]);

  // Ustaw priceLimit domyślnie na pierwszą pobraną cenę
  useEffect(() => {
    if (price !== null && priceLimit === null) {
      setPriceLimit(price);
    }
  }, [price, priceLimit]);

  if (!ticker) {
    return <div>Incorrect ticker in URL</div>;
  }

  // Stałe dla spójności rozmiarów elementów
  const elementWidth = 150;
  const elementHeight = 56; // przybliżona wysokość TextField

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Wykres</h2>
      </div>
      <div className={styles.right}>
        <div className={styles.center}>
          <h1 className={styles.center}>{ticker}</h1>
          <Card sx={{ maxWidth: 350, marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div"/>
              <Typography variant="h4" component="div">
                {price !== null ? price.toFixed(2) : '...'}
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              id="outlined-amount"
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              InputProps={{
                inputProps: { min: 0 },
              }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={{ width: elementWidth }}
            />
            <TextField
              id="outlined-price-limit"
              label="Price limit"
              type="number"
              value={priceLimit !== null ? priceLimit : ''}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              InputProps={{
                inputProps: { min: 0 },
              }}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: <InputAdornment position="start">$ </InputAdornment>,
                },
              }}
              sx={{
                width: elementWidth,
                '& input[type=number]': {
                  MozAppearance: 'textfield', // Firefox
                  '&::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                  '&::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
            <Button
              size="large"
              variant="contained"
              color="success"
              sx={{ width: elementWidth, height: elementHeight }}
            >
              Buy
            </Button>
            <Button
              size="large"
              variant="contained"
              color="error"
              sx={{ width: elementWidth, height: elementHeight }}
            >
              Sell
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
