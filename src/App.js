import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Products from './components/Products';
import './App.css';

function App() {

  const productList = [
    { id: 1, name: "Shoe", imageUrl: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', price: 1200 },
    { id: 2, name: "School Bag", imageUrl: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=929&q=80', price: 800 },
    { id: 2, name: "Watch", imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', price: 1000 }
  ];

  const [prods, setProds] = useState(productList);
  const [currency, setCurrency] = useState("INR");

  const exhangeCurrency = async (val) => {
    let targetCrrency;
    let currentCurrency;
    if (val === "INR") {
      targetCrrency = "INR"
      currentCurrency= "USD"
    } else if (val === "USD") {
      targetCrrency = "USD"
      currentCurrency= "INR"
    }

    const response = await fetch(`https://v6.exchangerate-api.com/v6/568322f9de32715882fd23f2/pair/${currentCurrency}/${targetCrrency}`);
    const data = await response.json();
    const rate = data.conversion_rate;
    const updatedProdList = prods.map((v) => {
      let currPrice = v.price;
      let convertedPrice;
      convertedPrice = currPrice * rate;

      v.price = convertedPrice;
      
      return { ...v, price: convertedPrice }
    })
    setProds(updatedProdList);
  }

  const handleChange = (event) => {
    let value = event.target.value;
    setCurrency(value);
    exhangeCurrency(value);
  }

  return (
    <Container maxWidth="xl" className='wrapper'>
      <Grid container direction="row" justifyContent="flex-end" style={{ marginBottom: "20px" }}>
        <Grid item xs={8} lg={3} style={{ textAlign: "right" }}>
          <FormControl variant="outlined" style={{ width: "200px" }}>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="selectCurrency"
              label="Currency"
              value={currency}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {
          prods ? (
            prods.map((v) => {
              return (
                <Grid item xs={12} lg={4} key={v.name}>
                  <Products name={v.name} imageUrl={v.imageUrl} price={v.price} currency={currency} />
                </Grid>
              )
            })
          ) : console.log(prods)
        }

      </Grid>
    </Container >
  );
}

export default App;
