const {
  inquirerMenu,
  pauseMenu,
  inputRead,
  placeList,
} = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async () => {
  let opt;
  const search = new Search();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        await getWeatherByCity();
        break;
      case 2:
        search.displayHistory();
        break;
      default:
        break;
    }
    await pauseMenu();
  } while (opt !== 0);

  async function getWeatherByCity() {
    const term = await inputRead('City: ');
    const places = await search.city(term);
    const id = await placeList(places);

    if (id === '0') {
      return;
    }
    const selectedPlace = places.find((place) => place.id === id);

    search.addToHistory(selectedPlace.name);

    const weather = await search.getWeather(
      selectedPlace.lat,
      selectedPlace.lng
    );

    console.log('\nCity Information\n');
    console.log(`Name: ${selectedPlace.name}`);
    console.log(`Lat: ${selectedPlace.lat}`);
    console.log(`Lng: ${selectedPlace.lng}`);
    console.log(`Description: ${weather.description}`);
    console.log(`Temperature: ${weather.temperature} `);
    console.log(`Minimun: ${weather.minimun} `);
    console.log(`Maximun: ${weather.maximun} `);
  }
};

main();
