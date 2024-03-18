'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('Projects', 'tariff_project', {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: Sequelize.literal("0") 
  });

  await queryInterface.sequelize.query(`
      UPDATE "Projects"
      SET "tariff_project" = CAST(tariff_project AS FLOAT)
    `);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('Projects', 'tariff_project', {
    type: Sequelize.STRING
  });
}
