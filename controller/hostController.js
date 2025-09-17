
const path = require('path');
const rootDir = require('../utils/pathUtils');
const {Note} = require('../Model/NoteApp');
exports.addNotes = (req,resp,next) => {
    resp.render('host/addNote',{editing:false,isLoggedIn:req.isLoggedIn});
 
}
exports.postNotes = (req,resp,next) => {
    const {title,content} = req.body
    const note = new Note(title,content)
    note.save()
    resp.redirect('/');
}

exports.deleteNote =(req,resp,next) => {
    const NoteId = req.params.NoteId;
    console.log(NoteId);
    Note.deleteById(NoteId );
   resp.redirect('/getNotes');
 
   
}


exports.getUpdateNote =(req,resp,next)=>{
    const NoteId =req.params.id;
    const editing = req.query.editing === 'true';

    Note.findById(NoteId,(note)=> {
    if(!note)
        {
      console.log('Home Not Found')
      return resp.redirect('/');
      }
      console.log("note is hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee",note)
    resp.render('host/addNote',{note:note,editing :editing,isLoggedIn:req.isLoggedIn});
   })
};
exports.updateNote = (req,resp,next)=>{
    // const _id = req.body._id
    const {_id,title,content} = req.body;
    console.log(_id);
    const note = new Note(title,content,_id)
    
//    note.id = id
    note.save()
    console.log("updating")
     resp.redirect('/home');
}
exports.noteSearch = (req,resp,next) => {
    const query = req.query.q ? req.query.toLowerCase() : ' ';
    console.log("////////////////####################",req.body)
    const {title} = req.body ;
    const note = Note.fetchAll(notes => {
        const filterNotes = notes.filter( note => 
            note.title.toLowerCase().includes(query)
        );
    resp.render('store/getNotes',{notes :filterNotes,isLoggedIn : req.isLoggedIn});
    })
    // console.log("found : ",title);
    // const sNote = Note.findByTitle({title});
    // resp.redirect('/getNotes');


}