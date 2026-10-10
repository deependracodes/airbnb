import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

// declare is ts keyword used to declare a variable without initializing it. It is used in this case to declare the properties of the Hotel model without providing initial values. This is useful when working with Sequelize models, as the values will be populated from the database when instances of the model are created.




class Hotel extends Model<
  InferAttributes<Hotel>,
  InferCreationAttributes<Hotel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare location: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
  declare rating?: number;
  declare ratingCount?: number;
}

// init tells Sequelize how to map the model to the database table. It defines the table name, the columns, their data types, and any constraints or default values. This is necessary for Sequelize to know how to interact with the database when performing CRUD operations on the Hotel model.

Hotel.init(
  {
    id: {
      type: 'INTEGER',
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: 'STRING',
      allowNull: false,
    },
    address: {
      type: 'STRING',
      allowNull: false,
    },
    location: {
      type: 'STRING',
      allowNull: false,
    },
    createdAt: {
      type: 'DATE',
      defaultValue: new Date(),
    },
    updatedAt: {
      type: 'DATE',
      defaultValue: new Date(),
    },
    deletedAt: {
      type: 'DATE',
      defaultValue: null,
    },
    rating: {
      type: 'FLOAT',
      defaultValue: null,
    },
    ratingCount: {
      type: 'INTEGER',
      defaultValue: null,
    },
  },
  {
    tableName: 'hotels',
    sequelize: sequelize,
    underscored: true, // createdAt --> created_at
    timestamps: true, // createdAt, updatedAt
  }
);

export default Hotel;


