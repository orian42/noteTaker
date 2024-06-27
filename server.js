//Dependencies for this file
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, readAndDelete } = require('./helpers/fsFunctions.js');

const PORT = 3001;

const app = express();

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware to serve up static assets from the public folder
app.use(express.static('public'))

//routes for html files
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//route to get all saved notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//route to save new notes
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a new note`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(), //This function generates a unique id for each note.
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

//route to delete notes
app.delete('/api/notes/:id', (req, res) => {
    if (req.body) {
        const recID = req.params.id;
        readAndDelete(recID, './db/db.json');
        res.json(`Note deleted successfully`);
    } else {
        res.error('Error in deleting note');
    }
})

//app listening on defined port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}.`)
);

