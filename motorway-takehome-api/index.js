const initPromise = require('./app');
const config = require('./config/config')

initPromise.then((app) => {
  app.listen(config.PORT, () => {
    console.log(`listening on port ${config.PORT}`);
  })
});
