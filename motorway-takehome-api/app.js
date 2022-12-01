const express = require('express');
const helmet = require("helmet");

const { globalErrorHandler } = require('./handlers');

const app = express();

app.use(helmet());

require("./routes/vehicle.routes")(app);

const port = process.env.PORT || 3000;

app.use(globalErrorHandler);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})