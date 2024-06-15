import express from 'express';
import connectDB from './DB/connectDB.js';
import dotenv from 'dotenv';
import ejsMate from 'ejs-mate'
import bodyParser from 'body-parser';
import session from 'express-session'
import LocalStrategy from 'passport-local'
import passport from 'passport'
import { User } from './models/User.js';
import passportLocalMongoose from 'passport-local-mongoose';


const app = express();
dotenv.config({
    path: "./.env" 
})

const port = 3000|| process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));

app.use(express.urlencoded({extended:true}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        maxAge: 7 * 24 * 60 * 60 * 1000 * 1
    }
}))


app.engine('ejs',ejsMate)


app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`server is listening at ${port}`);
    })
})
.catch((error)=>{
    console.error(error);
})

export default app;