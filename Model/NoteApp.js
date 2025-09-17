

const path = require('path');
const fs = require('fs')
const {getDB} =require('../utils/dataUtil')
const rootDir = require('../utils/pathUtils');
const { ObjectId } = require('mongodb');
const { get } = require('http');
const e = require('express');
const filePath =  path.join(rootDir, 'data' , 'note.json' );
class Note
{
    constructor(title,content,_id){
    this.title = title
    this.content=content
      if(_id){
      this._id = new ObjectId(_id)
    }
    else{
      this._id = null
    }

   
   }

    save(){
      const db = getDB();
      if(this._id){
        return db.collection('notes').updateOne({_id : this._id},{$set : {title : this.title, content : this.content}})
        .then(result => { 
          console.log(result);
        })
      }
        else {
     return db.collection('notes').insertOne({title:this.title,content:this.content}).then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
    });
  }
   };
      static fetchAll(callback){
      const db = getDB();
      db.collection('notes').find().toArray().then(notes => {
       callback(notes);
      })}

       static deleteById(NoteId){
      const db = getDB();
      db.collection('notes').deleteOne({_id : new ObjectId(NoteId)})
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err); 
      });
        }

     static findById(noteId,callback){
      const db = getDB();
      db.collection('notes').findOne({_id : new ObjectId(noteId)})
      .then(note => {
         callback(note);
      })
    }

    static findByTitle(title){
      const db = getDB();
      console.log("have to find",title)
      return db.collection('notes').findOne({title : title});
      
    }

}
module.exports = { Note }; 
   //     let updateNotes
   //   Note.fetchAll((notes) => {
   //    if(this.id){
   //      updateNotes = notes.map(note => {
   //          if(note.id === this.id){
   //             return this;
   //          }
   //          else{
   //             return note;
   //          }
   //       })
   //    }
   //    else{
     
   //      this.id = Math.random().toString();
   //      updateNotes=[...notes,this]
   //    }
   //    fs.writeFile(filePath,JSON.stringify(updateNotes),(err)=>{
   //      if(err){
   //      console.log("errorrrr",err)
   //      }
   //   })
   //  })


  

   //   fs.readFile(filePath,(err,data)=>{
   //   if(!err){
   //      callback(JSON.parse(data));
   //   }
   //   })
    


   //   Note.fetchAll(notes => {
   //      notes = notes.filter(note => note.id !== NoteId)
   //      fs.writeFile(filePath,JSON.stringify(notes),err => {
   //          if(!err){
   //              console.log("here are error",err);
   //          }
   //      })
   //   })
  
      // db.collection('notes').find({_id : new ObjectId(noteId)}).next().then(note => {
      //   callback(note);
      // }).catch(err => {
      //   console.log(err);
      // });
//        this.fetchAll(notes =>{
//        const noteFound =notes.find(note => note.id === noteId);
//      callback(noteFound);
//   })
