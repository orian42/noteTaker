const fs = require('fs');
const { stringify } = require('querystring');
const fsProm = require('fs').promises;

const readFromFile = (file) => {
    return fsProm.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Data received from file');
        }
    });
}

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

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

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };