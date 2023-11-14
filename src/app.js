const express=require('express');
const path=require('path');// location or path
const app =express();
const hbs = require('hbs');// engine template



require("./db/conn");// data base connection
const Register=require("./models/register");

const port=process.env.PORT || 8000 // automatically generate port number 8000 as a option

//======== This code is used to fetch data from frontend======

//our express js is using json file (postman)
app.use(express.json());
// link to frontend
app.use(express.urlencoded({extended:false}));

//============================================

// public static path
const static_path=path.join(__dirname,"../public");


// for engine templates
const template_path=path.join(__dirname,"../templates/views");

const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.static(static_path));
// telling view engin hbs extension
app.set('view engine',"hbs");

// now my views folder name is changed
app.set('views',template_path);
//setting partials 
hbs.registerPartials(partials_path);

//Routing 
app.get('/', (req,res)=> {
    res.render("index");
})

app.get('/register', (req,res)=> {
    res.render('register');
})

// create a new user in the database
app.post('/register', async(req,res)=> {
    try {
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password==cpassword)
        {
            const registerUser=new Register({
                name: req.body.name,
                email: req.body.email,
                password: password,
                confirmpassword:cpassword,
            });
            const registered=await registerUser.save();
            res.status(200).render("index");
        }
        else
        {
            res.send("Password are not matching!");
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get('/weather', (req,res)=> {
    res.send('weather page');
})

app.get('*', (req,res)=> {
    res.send('404 Page not found');
})

// in which port your project is running at port number
app.listen(port,()=>{
    console.log(`server is running on port at ${port}`);
})