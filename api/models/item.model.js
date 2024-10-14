module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        item_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        item_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        item_price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }
    });
  
    return Item;
};
