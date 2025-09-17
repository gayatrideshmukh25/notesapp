const User = require('../Model/user');
const {validationResult,check} = require('express-validator');

exports.getLogin = (req,resp,next) =>{
    resp.render('auth/login',{isLoggedIn:false,oldInput :{email:'',password:''}});
}
exports.postLogin =async (req,resp,next) =>
{
    const {email,password} = req.body;
    const user = await User.findByEmail(email);
    if(!user){
        return resp.status(422).render('auth/login',{
            isLoggedIn:false,
            errors :[{msg:'Invalid Email or Password'}],
            oldInput:{email : email, password : password}
        });
    }
   if(!(password === user.password)){
        return resp.status(422).render('auth/login',{
            isLoggedIn:false,
            errors :[{msg:'Invalid Email or Password'}],
            oldInput:{email:email,password:password}
        });
   }

   req.session.isLoggedIn = true;
   req.session.user = user;
   console.log("isLoggedIn value in postLogin",req.session.isLoggedIn);
   await req.session.save(() => {
    console.log('USER',user);
    console.log("user Saved");
        resp.redirect('/');
    })


    // const isLoggedIn = req.cookies.isLoggedIn;
    // console.log(isLoggedIn);
   
    //  resp.cookie('isLoggedIn',true);
    // resp.redirect('/');

}
exports.logout = (req,resp,next) => {   
    req.session.destroy(() => {
        resp.redirect('/');
    })
    // resp.clearCookie('isLoggedIn');
    //   resp.redirect('/');
 
   
}
exports.getSignUp = (req,resp,next) => {
        resp.render('auth/signup',{
        errors : [] ,
        isLoggedIn : false,
        oldInput :{fullname:'',email:'',password:'',confirmpassword:''},
        user:''
    });
}


exports.postSignUp =[
    check('fullname')
    .trim()
    .isLength({min:3})
    .withMessage('Name must be at least 3 characters long'),

    check('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[W]/)
    .withMessage('Password must contain a special character')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter'),

    check('confirmpassword')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),

    (req,resp,next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
            console.log(errors.array());
            return resp.status(422).render('auth/signup',{
            isLoggedIn:false,
            errors : errors.array(),
            oldInput:{
                fullname:req.body.fullname,
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            }
            
        });
    }
   const {fullname,email,password} = req.body;
    const user = new User(fullname,email,password); 
    user.save();
    resp.redirect('/login')
}]
// }] (req,resp,next) => {
//     const {fullname,email,password} = req.body;
//     const user = new User(fullname,email,password);
//     user.save();
//     resp.redirect('/login');    
// }