const inquirer = require('inquirer');
require('colors');

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'Select any option: ',
    choices: [
      {
        value: 1,
        name: `${'1'.green}. Find city`,
      },
      {
        value: 2,
        name: `${'2'.green}. History searched city`,
      },
      {
        value: 0,
        name: `${'0'.green}. Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('================================'.green);
  console.log('\tSelect an option'.white);
  console.log('================================\n'.green);

  const { option } = await inquirer.prompt(menuOptions);

  return option;
};

const pauseMenu = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`,
    },
  ];

  console.log('\n');
  await inquirer.prompt(question);
};

const inputRead = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please type a value';
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

const placeList = async (places = []) => {
  const choices = places.map((place, index) => {
    const idx = `${index + 1}`.green;

    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + 'Cancel',
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select place: ',
      choices: choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

const showListChecklist = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completedAt ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selections',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pauseMenu,
  inputRead,
  placeList,
  confirm,
  showListChecklist,
};
