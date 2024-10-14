module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        customer_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        customer_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                isEmail: true, 
            }
        }
    });
  
    return Customer;
};
