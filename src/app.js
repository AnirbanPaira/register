const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;
require("./db/conn");

const register = require("./models/register");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views"); //connects with the views/templates
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set(express.static(static_path));

// console.log(path.join(__dirname, "../templetes/partials"));
//to connect with index.html
app.set("view engine", "hbs");
app.set("views", template_path); //view ab change ho ke template_path ho gya hai
hbs.registerPartials(partials_path);

// console.log(path.join(__dirname, "../public"));

app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.send("login");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      }); // fetching data

      //pasward hash
      //middleware

      const registered = await registerEmployee.save();
      res.status(201).render("index"); //index wala field call karegga
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

const cretweToken = async()=>{
   jwt.sign
}

//login check
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    //jo v type tha use likhna hai type email hai toh email likha hai
    const password = req.body.password;
    console.log(`${email} and password is ${password}`);

    const useremail = await register.findOne({ email: email }); //check both mail same hai ya alag
    if (useremail.password === password) {
      res.status(201).send("index");
    } else {
      res.send("password are not matching");
    }
    // res.send(useremail.password);
    // console.log(useremail);
  } catch (error) {
    req.status(400).send(`invalid mail`);
  }
});
