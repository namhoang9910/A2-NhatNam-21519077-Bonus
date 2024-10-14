const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

// Create customer
exports.create = (req, res) => {
    const customer = {
        customer_name: req.body.customer_name,
        customer_email: req.body.customer_email,
    };

    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the customer."
            });
        });
};

// Get all customers
exports.findAll = (req, res) => {
    Customer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        });
};

// Get one customer by id
exports.findOne = (req, res) => {
    const id = req.params.customerId;

    Customer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving customer with id=" + id
            });
        });
};

// Update one customer by id
exports.update = (req, res) => {
    const id = req.params.customerId;

    Customer.update(req.body, {
        where: { customer_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Customer was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update customer with id=${id}. Maybe customer was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating customer with id=" + id
        });
    });
};

// Delete one customer by id
exports.delete = (req, res) => {
    const id = req.params.customerId;

    Customer.destroy({
        where: { customer_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Customer was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete customer with id=${id}. Maybe customer was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete customer with id=" + id
        });
    });
};
