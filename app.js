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
        const term = await inputRead('City: ');
        const places = await search.city(term);
        const id = await placeList(places);
        const selectedPlace = places.find( place => place.id === id);

        console.log('\nCity Information\n');
        console.log(`Name: ${selectedPlace.name}`);
        console.log(`Lat: ${selectedPlace.lat}`);
        console.log(`Lng: ${selectedPlace.lng}`);
        console.log(`Temperature:  `);
        console.log('Minimun: ');
        console.log('Maximu: ');
        break;

      default:
        break;
    }
    await pauseMenu();
  } while (opt !== 0);
};

main();
