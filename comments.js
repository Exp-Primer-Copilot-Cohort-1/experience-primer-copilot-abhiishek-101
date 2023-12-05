// create a web server

// import express
const express = require('express');
// import path
const path = require('path');
// import fs
const fs = require('fs');
// import uuid
const { v4: uuidv4 } = require('uuid');

// create an instance of express
const app = express();

// set port
const PORT = process.env.PORT || 3000;

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware to serve static files
app.use(express.static('public'));

// html routes
// route to notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// api routes
// route to get notes
app.get('/api/notes', (req, res) => {
    // read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        // parse the data
        const notes = JSON.parse(data);
        // return the parsed data
        res.json(notes);
    });
});

// route to post notes
app.post('/api/notes', (req, res) => {
    // read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        // parse the data
        const notes = JSON.parse(data);
        // get the request body
        const newNote = req.body;
        // create a unique id
        newNote.id = uuidv4();
        // push the new note to the notes array
        notes.push(newNote);
        // write the notes array to db.json
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            // return the new note
            res.json(newNote);
        });
    });
});

// route to delete notes
app.delete('/api/notes/:id', (req, res) => {
    // read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        // parse the data
        const notes = JSON.parse(data);
        // filter the notes array to remove the note with the matching id