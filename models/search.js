require('dotenv').config();
const axios = require('axios');

class Search {
  _history = ['otawa', 'santiago', 'washintong'];

  get paramsMapBox() {
    return {
      access_token: process.env.MABBOX_KEY,
      language: 'es',
      limit: 5,
    };
  }

  get history() {
    return _history;
  }

  constructor() {
    //TODO: leerdb
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
}

module.exports = Search;
