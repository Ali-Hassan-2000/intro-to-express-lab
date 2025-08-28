const express = require('express');
const app = express();
/*------------------------------------------------------*/

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
})

// 1.Greeting route
app.get('/greet/:name', (req, res) => {
  res.send(`<h1>Hello ${req.params.name}!</h1>`);
});

// 2. Rolling the Dice
app.get('/roll/:num', (req, res) => {
    if (isNaN(req.params.num)){
        res.send(`<h1 style = "color: red;">“You must specify a number.”</h1>`);
    }
    else {//If a valid number is provided, respond with a random whole number between 0 and the given number. 
        const randomNum = Math.floor(Math.random() * (parseInt(req.params.num) + 1));
        res.send(`<h1>You rolled a ${randomNum}.</h1>`);
    }
});

// 3. I Want THAT One!

//Data array object
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
    if (req.params.index > collectibles.length - 1){
        res.send(`<h1 style = "color: red;">“This item is not yet in stock. Check back soon!”</h1>`);
    }
    else {
        res.send(`<h1>So, you want the ${collectibles[req.params.index].name}? For ${collectibles[req.params.index].price}
          , it can be yours!</h1>`);
    }
});

//4. Filter Shoes by Query Parameters

//Data array object
  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

// Using Query Parameters (?)
app.get('/shoes', (req, res) => {

  if (req.query['min-price']) {//check if the Query Parameters = min-price
    
    let shoes_items = ''; // collect all items in one varible 

    for (let item = 0; item < shoes.length; item++) {

      if (shoes[item].price >= req.query['min-price']) {//check if the price is >= Query Parameters price
      shoes_items += `<h2>shoe name: ${shoes[item].name}, shoe price: ${shoes[item].price}, shoe type: ${shoes[item].type}</h2>`; 
      }
    }

    res.send(shoes_items); // display all items

  }
  else if (req.query['max-price']) {//check if the Query Parameters = max-price
    
  let shoes_items = ''; 

    for (let item = 0; item < shoes.length; item++) {

      if (shoes[item].price <= req.query['max-price']) {//check if the price is <= Query Parameters price
      shoes_items += `<h2>shoe name: ${shoes[item].name}, shoe price: ${shoes[item].price}, shoe type: ${shoes[item].type}</h2>`; 
      }
    }

    res.send(shoes_items);

  }
  else if (req.query['type']) {//check if the Query Parameters = type
    
    let shoes_items = ''; 

    for (let item = 0; item < shoes.length; item++) {

      if (shoes[item].type === req.query['type']) {//check if the type is = Query Parameters type
      shoes_items += `<h2>shoe name: ${shoes[item].name}, shoe price: ${shoes[item].price}, shoe type: ${shoes[item].type}</h2>`; 
      }
    }

    res.send(shoes_items);
  
  }
  else{

    let shoes_items = '';
    
    for (let item = 0; item < shoes.length; item++) {
      shoes_items += `<h2>shoe name: ${shoes[item].name}, shoe price: ${shoes[item].price}, shoe type: ${shoes[item].type}</h2>`;
    }

    res.send(shoes_items); 
  }

});