const axios = require('axios');

class Search {
  history = ['otawa', 'santiago', 'washintong'];

  constructor() {
    //TODO: leerdb
  }

  async city(name) {
   const response = await axios.get('https://reqres.in/api/users/2');
   console.log(response.data
    )

    return [];
  }
}

module.exports = Search;
