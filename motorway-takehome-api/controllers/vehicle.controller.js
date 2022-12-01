const { param, query } = require('express-validator');

const { getCache, setCache } = require('../services/redisCache');
const { expressValidationError } = require('../handlers');
const db = require("../models");
const { Vehicle, StateLog } = db;
const { Op } = db.Sequelize;



const cacheKey = (id, stateAt) => `vehicle#${id}#${stateAt}`;
exports.findOne = [
  param('id').exists().toInt().isInt({ min: 1 }),
  query('stateAt').isISO8601({ strict: false, strictSeparator: false }).toDate(),
  expressValidationError,
  
  async (req, res, next) => {
    const { id } = req.params;
    const { stateAt } = req.query;
    let results;
    try {
      const cacheResults = await getCache(cacheKey(id, stateAt));
      if (cacheResults) {
        results = JSON.parse(cacheResults);
        res.json(results);
      } else {
        next();
      }
    } catch (error) {
      console.error('failed to read cache', error);
    }
  },

  async (req, res) => {
    const { id } = req.params;
    const { stateAt } = req.query;
    try {
      const vehicle = await Vehicle.findByPk(id, {
        include: [
          {
            attributes: ["state"],
            model: StateLog,
            as: 'stateLog',
            separate: true,
            where: { timestamp: { [Op.lte]: stateAt, } },
            offset: 0,
            limit: 1,
            order: [
              ['timestamp', 'DESC']
            ],
          }
        ],
      });

      if (!vehicle || !vehicle.stateLog[0]) {
        return res.status(404).send({
          message: 'Vehicle not found'
        });
      }
      const data = Vehicle.build({
        ...vehicle.toJSON(),
        state: vehicle.stateLog[0].state
      }).toJSON();
      await setCache(cacheKey(id, stateAt), JSON.stringify(data))

      res.json(data);

    } catch (e) {
      console.error(e)
      res.status(500).send({
        message: "Error retrieving vehicle"
      });
    }
  }];