
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/NotesApp";

const { userRouter } = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const { authRouter } = require('./routes/authRouter');
const { mongoConnect } = require('./utils/dataUtil');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extenden:true}));
// app.use(cookieParser());
const store = new MongoDBStore({
    uri:mongoURL,
    collection:'sessions'
});
app.use((req,resp,next)=>{
    req.isLoggedIn =req.session ?  req.session.isLoggedIn : false;
    console.log("Session Object",req.session);
//    req.isLoggedIn = req.get("Cookie") ? req.get('Cookie').split('=')[1] === 'true' : false;
    next();
});
app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    store:store
}));

app.use(userRouter);
app.use(authRouter);
app.use('/host',(req,resp,next)=>{
    if(!req.session.isLoggedIn) {
      return resp.redirect("/login");
    }
    next();

})
app.use('/host',hostRouter);



app.use((req,resp) => {
resp.send("<h1>Page not found</h1>")
})
Port = 3000;
mongoConnect(() =>{
    app.listen(Port,() => {
     console.log(`http://localhost:${Port}`);
    });
    
});