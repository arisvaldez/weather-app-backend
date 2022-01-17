const axios = require('axios');

class Search {
  history = ['otawa', 'santiago', 'washintong'];
  languaje = 'es';
  limit = 5;
  base_url = '';

  get paramsMapBox() {
    return {
      access_token:
        'pk.eyJ1IjoiYXJpc3ZhbGRleiIsImEiOiJja3NlMGpsNDAwdnV1Mm9xa2Z4dmp3YXRuIn0.LuHeuk02dA_qHZ0D3lZY-g',
      language: 'es',
      limit: 5,
    };
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
      console.log(response.data);
      return [];
    } catch (ex) {
      console.log(ex);
      return [];
    }
  }
}

module.exports = Search;
