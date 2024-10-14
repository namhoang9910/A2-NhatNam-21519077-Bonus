module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        order_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW, 
        },
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "customers", 
                key: "customer_id"
            },
            onDelete: "CASCADE", 
        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "items", 
                key: "item_id"
            },
            onDelete: "CASCADE", 
        }
    });

    return Order;
};
