const initPromise = require("../motorway-takehome-api/app");
const request = require('supertest');
const { expect } = require('chai');
let app;

before(async () => {
  app = await initPromise;
});

describe('Vehicle API /api/vehicle/', () => {
  describe('/api/vehicle/:id ', () => {
    const stateToDate = [{
      vehicleId: 1,
      date: '2022-09-10T12:00:00',
      state: 'quoted'
    },
    {
      vehicleId: 2,
      date: '2022-09-10T14:59:02',
      state: 'quoted'
    },
    {
      vehicleId: 2,
      date: '2022-09-11T17:03:17',
      state: 'selling'
    },
    {
      vehicleId: 3,
      date: '2022-09-11T09:11:45',
      state: 'quoted'
    },
    {
      vehicleId: 3,
      date: '2022-09-11T23:22:38',
      state: 'selling'
    },
    {
      vehicleId: 3,
      date: '2022-09-12T12:51:41',
      state: 'sold'
    }
  ];

    for (const { date, state, vehicleId } of stateToDate) {
      it(`should returns proper state "${state}" of vehicle with id: "${vehicleId}" for date ${date}`, async () => {
        const response = await request(app).get(`/api/vehicles/${vehicleId}?stateAt=${date}`);
        expect(response.statusCode).to.be.equal(200);
        expect(response.body.state).to.be.equal(state);
      });
    }

    it('should get 404 if vehicle does not exists', async () => {
      const response = await request(app).get(`/api/vehicles/6?stateAt=2022-09-12T12:51:41`);
      expect(response.statusCode).to.be.equal(404);
    });

    it('should get validation error if vehicle id is not integer', async () => {
      const response = await request(app).get(`/api/vehicles/fff`);
      expect(response.statusCode).to.be.equal(400);
    });

    it('should get validation error if stateAt is missing', async () => {
      const response = await request(app).get(`/api/vehicles/3`);
      expect(response.statusCode).to.be.equal(400);
    });
  });
});