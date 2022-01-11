const { inquirerMenu, pauseMenu, inputRead } = require('./helpers/inquirer');
const Search = require('./models/search');
const main = async () => {
  let opt;
  const search = new Search();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const place = await inputRead('City: ');
        search.city(place);
        console.log('\nCity Information\n');
        console.log('Name: ');
        console.log('Lat: ');
        console.log('Lng: ');
        console.log('Temperature: ');
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
