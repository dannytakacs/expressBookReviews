const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  books_list = JSON.stringify(books,null,4);
  res.send(books_list)
  return res.status(300).json({message: "Error"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn],null,4))
  return res.status(300).json({message: "ISBN not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  var obj = JSON.stringify(books,null,4);
  var out = JSON.parse(obj);
  var keys = Object.keys(out);
  const author = req.params.author;
  for (var i = 0; i < keys.length; i++) {
    if(JSON.stringify(out[keys[i]].author,null,4) === author){
        res.send(JSON.stringify(out[keys[i]],null,4));
    }
  }
  
  return res.status(300).json({message: "Author not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  var obj = JSON.stringify(books,null,4);
  var out = JSON.parse(obj);
  var keys = Object.keys(out);
  const title = req.params.title;
  for (var i = 0; i < keys.length; i++) {
    if(JSON.stringify(out[keys[i]].title,null,4) === title){
        res.send(JSON.stringify(out[keys[i]],null,4));
    }
  }
  return res.status(300).json({message: "Title not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send("The review"+(' ') + "for Book" +(' ')+ JSON.stringify(books[isbn],null,4)+ " is"+ (' ')+ JSON.stringify(books[isbn].reviews,null,4))
  return res.status(300).json({message: "Review not found"});
});

module.exports.general = public_users;
