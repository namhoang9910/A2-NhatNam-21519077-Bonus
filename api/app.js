const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/contacts.routes")(app);
require("./routes/phones.routes")(app);
require("./routes/stats.routes")(app);
require("./routes/companies.routes")(app);
require("./routes/items.routes")(app);
require("./routes/customers.routes")(app);
require("./routes/orders.routes")(app);

// Update companies table when removing contact_id
app.patch('/api/companies', async (req, res) => {
  const contactId = req.query.id;
  try {
      await db.companies.update(
          { contact_id: null },  
          { where: { contact_id: contactId } }  
      );
      res.status(204).send();
  } catch (error) {
      console.error('Error updating companies:', error);
      res.status(500).json({ message: 'Could not update companies' });
  }
});

// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});