import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels 
      ADD COLUMN rating DECIMAL(2,1) DEFAULT 0.0,
      ADD COLUMN rating_count INTEGER DEFAULT 0
      `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels 
      DROP COLUMN rating,
      DROP COLUMN rating_count
      `);
  },
};
