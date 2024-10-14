const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Create order
exports.create = (req, res) => {
    const order = {
        order_date: req.body.order_date || new Date(),
        customer_id: req.body.customer_id,
        item_id: req.body.item_id,
    };

    Order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};

// Get all orders
exports.findAll = (req, res) => {
    Order.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// Get one order by id
exports.findOne = (req, res) => {
    const id = req.params.orderId;

    Order.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving order with id=" + id
            });
        });
};

// Update one order by id
exports.update = (req, res) => {
    const id = req.params.orderId;

    Order.update(req.body, {
        where: { order_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Order was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update order with id=${id}. Maybe order was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating order with id=" + id
        });
    });
};

// Delete one order by id
exports.delete = (req, res) => {
    const id = req.params.orderId;

    Order.destroy({
        where: { order_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Order was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete order with id=${id}. Maybe order was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete order with id=" + id
        });
    });
};
