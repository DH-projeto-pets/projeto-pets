
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'especies',
    [
      {
        nome: 'Gato',
      },
      {
        nome: 'Cachorro',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('especies', null, {}),
};
