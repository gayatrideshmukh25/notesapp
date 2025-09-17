const {getDB} = require("../utils/dataUtil");
const mongodb = require("mongodb");

class User {
 constructor(fullname,email,password){
   this.fullname = fullname;
    this.email = email;
    this.password = password;
 }
  save() {
   const db= getDB();
   return db.collection('users').insertOne(this);
  }
  static findByEmail(email){
   const db = getDB();
   return db.collection('users').findOne({email : email});
  }
} 
module.exports = User;