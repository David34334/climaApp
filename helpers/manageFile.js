const fs = require('fs');

const JSON_FILES_PATH = './json/data.json';
const TXT_FILES_PATH = './out/data.txt';

const saveDataInJSONFile = ( data ) => {
    fs.writeFileSync( JSON_FILES_PATH, JSON.stringify( data ) );
    saveDataInTXTFile( data );
}

const saveDataInTXTFile = ( data ) => {
    let info = '';
    data.history.map( data => {
        info += `${data} \n`;
    });
    fs.writeFileSync( TXT_FILES_PATH, info );
}

const readDataInJsonFile = () => {
    let data = '';
    if (fs.existsSync( JSON_FILES_PATH )) {
        data = fs.readFileSync( JSON_FILES_PATH, {encoding: 'utf-8'} );
    }
    return JSON.parse(data);
}


module.exports = { saveDataInJSONFile, readDataInJsonFile }