const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Location extends Model {};

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "event",
                key: "id"
            }
        },
        streetAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: true,   
        freezeTableName: true,
        underscored: true,
        modelName: "location"
    }
);

module.exports = Location;