import express from 'express'
const router=express.Router()
import passport from 'passport'
import {User} from '../models/User.js'

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})


router.post('/register',async (req,res)=>{
    let {username,email,password}=req.body
    const user=new User({username,email})
    await User.register(user,password)
    res.redirect('/login')
})

router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/products');
});

router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports=router