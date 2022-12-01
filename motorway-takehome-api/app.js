const express = require('express');

const db = require("./models");

const app = express();

require("./routes/vehicle.routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})