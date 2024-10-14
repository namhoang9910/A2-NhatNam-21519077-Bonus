const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

// Create item
exports.create = (req, res) => {
    const item = {
        item_name: req.body.item_name,
        item_price: req.body.item_price,
    };

    Item.create(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the item."
            });
        });
};

// Get all items
exports.findAll = (req, res) => {
    Item.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });
};

// Get one item by id
exports.findOne = (req, res) => {
    const id = req.params.itemId;

    Item.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving item with id=" + id
            });
        });
};

// Update one item by id
exports.update = (req, res) => {
    const id = req.params.itemId;

    Item.update(req.body, {
        where: { item_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Item was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update item with id=${id}. Maybe item was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating item with id=" + id
        });
    });
};

// Delete one item by id
exports.delete = (req, res) => {
    const id = req.params.itemId;

    Item.destroy({
        where: { item_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Item was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete item with id=${id}. Maybe item was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete item with id=" + id
        });
    });
};
