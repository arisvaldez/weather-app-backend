const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

class Search {
  _history = [];
  _dbPath = './db/database.json';

  get paramsMapBox() {
    return {
      access_token: process.env.MABBOX_KEY,
      language: 'es',
      limit: 5,
    };
  }
  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  get history() {
    return _history;
  }

  constructor() {
    this.loadData();
  }

  async city(name) {
    try {
      const instace = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json`,
        params: this.paramsMapBox,
      });

      const response = await instace.get();

      return response.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (ex) {
      console.log(ex);
      return [];
    }
  }

  async getWeather(lat, lon) {
    try {
      const instace = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const response = await instace.get();
      const { weather, main } = response.data;

      return {
        description: weather[0].description,
        minimun: main.temp_min,
        maximun: main.temp_max,
        temperature: main.temp,
      };
    } catch (ex) {
      console.log(ex);
    }
  }

  addToHistory(place = '') {
    if (!this._history.includes(place.toLocaleLowerCase()))
      this._history.unshift(place.toLocaleLowerCase());

    this.persistData();
  }

  persistData() {
    const payload = {
      history: this._history,
    };
    fs.writeFileSync(this._dbPath, JSON.stringify(payload));
  }

  loadData() {
    if (!fs.existsSync(this._dbPath)) return;
    const rawData = fs.readFileSync(this._dbPath, { encoding: 'utf-8' });
    const parsedData = JSON.parse(rawData);
    this._history = parsedData.history;
  }

  displayHistory() {
    this._history.forEach((place, index) => {
      const idx = `${index + 1}`.green;
      console.log(`${idx}.- ${place}`);
    });
  }
}

module.exports = Search;
