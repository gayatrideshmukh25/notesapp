const express = require('express');
const hostRouter=express.Router();
const {getNotes,postNotes,addNotes, deleteNote,details,updateNote, getUpdateNote,noteSearch} = require('../controller/hostController')


hostRouter.get("/addNotes",addNotes);
hostRouter.post("/postNotes",postNotes);
hostRouter.post('/deleted/:NoteId',deleteNote)
hostRouter.get('/getUpdateNote/:id',getUpdateNote)
hostRouter.post("/updateNote",updateNote);
hostRouter.get("/noteSearch",noteSearch)

exports.hostRouter=hostRouter;