const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

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
            noteID: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding tip');
    }
});

//app listening on defined port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}.`)
);

