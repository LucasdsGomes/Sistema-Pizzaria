const conn = require("../db/conn");
const { DataTypes } = require("sequelize");

const Sabores = conn.define("Sabores", {
  novoSabor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tamanhoPizza: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidadePedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  datainsercao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Sabores;
