const fs = require('fs');

const readFromFile = (fileName) => {
    fs.readFile(fileName, 'utf-8', () => {
      if (err) {console.error(err)}
      else {console.log('Data imported as requested.')}
    })
}

module.exports = readFromFile;