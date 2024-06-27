//Dependencies for this file
const fs = require('fs');
const { stringify } = require('querystring');
const fsProm = require('fs').promises;

//function for reading data from a file
const readFromFile = (file) => {
    return fsProm.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Data received from file');
        }
    });
}

//function to write data to a file
const writeToFile = (file, content) =>
    fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info('Data written successfully')
    );

//function to appropriately add a new note data prior to writing it to the file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

//function to delete a specific note then update the file
const readAndDelete = (recID, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            const filteredData = parsedData.filter(note => note.id !== recID)
            writeToFile(file, filteredData);
        }
    });
};

module.exports = { readFromFile, readAndAppend, readAndDelete };