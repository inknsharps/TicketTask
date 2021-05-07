const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model {};

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "location",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: true,   
        freezeTableName: true,
        underscored: true,
        modelName: "event"
    }
);

module.exports = Event;