const express = require('express');
let products = require('./products'); //json, products is the array form last time
const app = express();
app.use(express.json());

//add scalable
app.post("/", (req, res) => {
    const add = req.body;
    products = [...products, ...add];
    res.status(200).json(products);
  });

//put modify element
app.put('./products/:id', (res, req) =>{
    const id = +req.params.id;

    //uses more stack memory but safer
    const p = products.map((e) => { 
        if(e.id === id) return {...e, ...body };
        else return e;
    });
   
    if(!p) return res.status(400).json( { "message" : "Product not found" } );
    products = p; //send to heap alloc 
    res.status(200).json(products); //may seem redunctant, but dont want to leave optmization to the interpreter VM
});

//get for verification
app.get('/products/', (req, res) => {res.status(200).json(products);});

//delete
app.delete('/products/:id', (req, res) =>
{
    const id = +req.params.id;
    const p = products.find((x) => x.id === id);
    if(!p)return res.status(400).json( { "message" : "Product not found" } );
    products.filter((p) => p !== id);
});

app.listen(42069, () => {
    console.log('RUNNING');
});
