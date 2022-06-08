const Axios = require('axios');
const { saveDataInJSONFile, readDataInJsonFile } = require('../helpers/manageFile');

class Searches {

    constructor() {
        this.history = [];
        this.readDataInFile();
    }

    get historyCapitalizated() {
        return this.history.map( place => {
            let words = place.split(' ');
            words = words.map( w => w[0].toUpperCase() + w.substring(1));
            return words.join(' ');
        });
    }

    get paramsMapBox() {
        return {
            'language'      : 'es',
            'limit'         : 5,
            'access_token'  : process.env.APIMAP_KEY
        }
    }

    get paramsWeather() {
        return {
            'appid' : process.env.WEATHER_KEY,
            'lang'  : 'es',
            'units' : 'metric'
        }
    }

    async city( place = '' ) {
        try {
            /** HTTP Request */
            const instance = Axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params : this.paramsMapBox
            });

            const resp = await instance.get();
            
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));

        } catch (error) {
            console.log(error);
        }
    }

    async weatherByPlaceCoords( lat, lon ) {
        try {
            /** HTTP Request */
            const instance = Axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsWeather
            });

            /** Response of HTTP Request */
            const weather = await instance.get();

            return {
                desc    : weather.data.weather[0].description,
                min     : weather.data.main.temp_min,
                max     : weather.data.main.temp_max,
                temp    : weather.data.main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    addHistoryOfUser( place = '' ) {
        if ( this.history.includes( place.toLocaleLowerCase()) ) return;
        this.history = this.history.splice(0, 5);
        this.history.unshift( place.toLocaleLowerCase() );
        /** Save in JSON File */
        const payload = {
            history: this.history
        }
        saveDataInJSONFile( payload );
    }

    saveDataInFile( data ) {
        saveDataInJSONFile( data );
    }

    readDataInFile() {
        const data = readDataInJsonFile();
        data.history.map( data => {
            this.history.push( data );
        });
    }

}

module.exports = Searches;