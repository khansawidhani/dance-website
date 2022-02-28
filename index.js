const express = require('express');
const path = require('path');
const app = express(); 
const PORT = 3000; 

// EXPRESS RELATED CONFIGURATION
app.use("/static", express.static("static")); // set static folder
app.use(express.urlencoded({extended:true})); // encode html form


// PUG RELATED SETTINGS
app.set('view engine', 'pug'); // set the template engine as pug
app.set("views", path.join(__dirname, "views")); // set the views directory

app.get('/', (req, res) => {
    res.status(200).render("index");
});

app.listen(PORT, ()=>{
    console.log('App is running at port 3000');
})