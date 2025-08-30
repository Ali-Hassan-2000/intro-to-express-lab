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

  const minPrice = parseFloat(req.query['min-price']);
  const maxPrice = parseFloat(req.query['max-price']);
  const shoeType = req.query['type'];

  let shoes_items = shoes; // collect all items in one varible 

  if (!isNaN(minPrice)) {//check if the Query Parameters = min-price
    
    shoes_items = shoes_items.filter(shoe => shoe.price >= minPrice);

  }
  if (!isNaN(maxPrice)) {//check if the Query Parameters = max-price
   
    shoes_items = shoes_items.filter(shoe => shoe.price <= maxPrice);

  }
  if (shoeType) {//check if the Query Parameters = type
    
    shoes_items = shoes_items.filter(shoe => shoe.type === shoeType);
  
  }

  shoes_items_html = '';

  for (let item = 0; item < shoes_items.length; item++) {
    shoes_items_html += `<h2>shoe name: ${shoes_items[item].name}, shoe price: ${shoes_items[item].price}, shoe type: ${shoes_items[item].type}</h2>`;
  }

  res.send(shoes_items_html); 

});