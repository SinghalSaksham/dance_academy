const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DanceContact', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const ContactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Age: String,
    Gender: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// For serving static files
app.use('/static', express.static('static'))

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))
 
// Our pug demo endpoint
app.get("/", (req, res)=>{ 
    res.status(200).render('home');
});

app.get("/contact", (req, res)=>{ 
    res.status(200).render('contact');
});

app.post("/contact", (req, res)=>{ 
    // console.log(req.body);
    const obj = new Contact(req.body);
    obj.save().then(()=>{
        res.send("This item has been saved successfully")
    }).catch(()=>{
        res.status(400).send("There is some error in saving");
    })
});


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
