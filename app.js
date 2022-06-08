const { readAnswersByUserInConsole, inquirerMenu, pauseConsoleFunction, listPlaces } = require("./helpers/inquirer");
const Searches = require("./models/searches");
require('dotenv').config();

async function main () {
    
    let opt = '';
    const searches = new Searches();

    do {

        opt = await inquirerMenu();

        switch ( opt ) {
            case '1':
                /** Ciudad ingresada por el usuairo */
                inputCity       = await readAnswersByUserInConsole('Ingresa una ciudad para conocer su clima: ');
                /** Búsqueda de ciudades que correspondan */
                const places    = await searches.city( inputCity );
                /** Menú de lugares */
                const placeId   = await listPlaces( places );
                if (placeId === '0') continue;
                /** Lugar seleccionado */
                const placeSelected = places.find( place => place.id === placeId );
                /** Save in JSON File selected option */
                searches.addHistoryOfUser( placeSelected.name );
                /** Consultar clima */
                const weatherOfPlace = await searches.weatherByPlaceCoords( placeSelected.lat, placeSelected.lng );
                /** Mostrando resultados */
                showInformationPlace( placeSelected, weatherOfPlace );
                break;
            case '2':
                searches.historyCapitalizated.forEach( (place, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx}. ${place.toString().green}`);
                });
                break;
            case '0':
                break;
            default:
                break;
        }

        if ( opt !== '0' ) await pauseConsoleFunction();

    } while (opt !== '0');

}

main();


/** Mostrar información del clima */
function showInformationPlace( place = {}, weather = {} ) {
    console.log('\n');
    console.log(`${'Ciudad:'.cyan} ${place.name.toString().green}`);
    console.log(`${'Latitud:'.cyan} ${place.lat.toString().green}`);
    console.log(`${'Longitud:'.cyan} ${place.lng.toString().green}`);
    console.log(`${'Estado actual:'.cyan} ${weather.desc.toString().green} `);
    console.log(`${'Temperatura:'.cyan} ${weather.temp.toString().green} `);
    console.log(`${'Temp mínima:'.cyan} ${weather.min.toString().green}`);
    console.log(`${'Temp máxima:'.cyan} ${weather.max.toString().green}`);
}