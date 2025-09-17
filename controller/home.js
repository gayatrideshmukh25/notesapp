
const path = require('path');
const rootDir = require('../utils/pathUtils');
const {Note} = require('../Model/NoteApp')

// exports.index = (req,resp,next) => {  
//     resp.render('store/index');
// }
exports.home = (req,resp,next) => {
    console.log(req.url,req.method);
    console.log("isLoggedIn value in home",req.session.isLoggedIn);
    resp.render('store/home',{isLoggedIn : req.session.isLoggedIn});

}
exports.getNotes = (req,resp,next) => {
    Note.fetchAll((notes) => {
        // console.log(notes)
            resp.render('store/notes',{notes:notes,isLoggedIn:req.session.isLoggedIn});

    })
   
}
