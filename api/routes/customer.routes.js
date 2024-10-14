module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    router.post("/customers", customers.create);

    router.get("/customers", customers.findAll);

    router.get("/customers/:customerId", customers.findOne);

    router.put("/customers/:customerId", customers.update);

    router.delete("/customers/:customerId", customers.delete);

    app.use('/api', router);
};
