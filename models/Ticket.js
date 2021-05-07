const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ticket extends Model {};

Ticket.init(
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: true,   
        freezeTableName: true,
        underscored: true,
        modelName: "ticket"
    }
);

module.exports = Ticket;